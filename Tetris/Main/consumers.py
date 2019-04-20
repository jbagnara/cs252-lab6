from channels.generic.websocket import AsyncWebsocketConsumer
import json
from . import tetris

class Moves():
    LEFT = 37
    ROTATE = 38
    RIGHT = 39
    DOWN = 40

class TetrisConsumer(AsyncWebsocketConsumer):
    tetris = tetris.Tetris()

    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'tetris_{self.room_name}'

        #join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
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
        if (move == Moves.LEFT):
            self.tetris.move_piece_left()
        elif (move == Moves.ROTATE):
            self.tetris.rotate_piece()
        elif (move == Moves.RIGHT):
            self.tetris.move_piece_right()
        elif (move == Moves.DOWN):
            self.tetris.move_piece_down()

        #send message to each client
        await self.send(text_data=json.dumps({
            'field': self.tetris.field
        }))