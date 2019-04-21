from channels.generic.websocket import AsyncWebsocketConsumer
import json
from . tetris import Tetris

class Moves():
    LEFT = 37
    ROTATE = 38
    RIGHT = 39
    DOWN = 40

class TetrisConsumer(AsyncWebsocketConsumer):
    games = {}

    #TODO: make each channel group have there own game
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'tetris_{self.room_name}'

        if not self.room_name in self.games:
            self.games[self.room_name] = Tetris()

        tetris = self.games[self.room_name]
        tetris.num_players += 1

        #join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

        #send init game state
        await self.send(text_data=json.dumps({
            'field': tetris.field
        }))

    async def disconnect(self, close_code):
        tetris = self.games[self.room_name]
        tetris.num_players -= 1

        if tetris.num_players <= 0:
            self.games.pop(self.room_name)

        #leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
    
    async def receive(self, text_data):
        print('getting from a client, sending data to group')

        #get updates from a single client
        data = json.loads(text_data)
        move = data['move']

        #send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {'type': 'move_piece', 'move': move}
        )

    async def move_piece(self, event):
        print('getting from group, sending data to a client')

        #get message from room group
        move = event['move']

        #update game state
        tetris = self.games[self.room_name] 

        if (move == Moves.LEFT):
            tetris.move_piece_left()
        elif (move == Moves.ROTATE):
            tetris.rotate_piece()
        elif (move == Moves.RIGHT):
            tetris.move_piece_right()
        elif (move == Moves.DOWN):
            tetris.move_piece_down()

        #send message to each client
        await self.send(text_data=json.dumps({
            'field': tetris.field
        }))
