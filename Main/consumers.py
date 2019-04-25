from channels.generic.websocket import AsyncWebsocketConsumer
from . tetris import Tetris
import asyncio
import json

class Moves():
    LEFT = 37
    ROTATE = 38
    RIGHT = 39
    DOWN = 40

class TetrisConsumer(AsyncWebsocketConsumer):
    games = {} #available to all room groups

    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'tetris_' + self.room_name

        #create and get game
        if not self.room_name in self.games:
            self.games[self.room_name] = Tetris(self.room_name)
            self.loop_task = asyncio.create_task(self.game_loop())

        self.tetris = self.games[self.room_name] #available to all clients in a room group
        self.tetris.num_players += 1

        #join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

        #send init game state
        await self.send(text_data=json.dumps({
            'field': self.tetris.field,
            'score': self.tetris.score,
            'next_piece': self.tetris.next_piece.tetromino[0],
            'game_over': self.tetris.game_over,
            'num_players': self.tetris.num_players
            #'bool_field': self.tetris.bool_field
        }))

    async def game_loop(self):
        while True:
            self.tetris.move_piece_down()

            await self.channel_layer.group_send(
                self.room_group_name,
                {'type': 'update_game'}
            )

            try:
                await asyncio.sleep(1)
            except asyncio.CancelledError:
                raise
    
    async def receive(self, text_data):
        #get updates from a single client
        data = json.loads(text_data)
        move = data['move']

        #update game state 

        if (move == Moves.LEFT):
            self.tetris.move_piece_left()
        elif (move == Moves.ROTATE):
            self.tetris.rotate_piece()
        elif (move == Moves.RIGHT):
            self.tetris.move_piece_right()
        elif (move == Moves.DOWN):
            self.tetris.move_piece_down()

        #send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {'type': 'update_game'}
        )

    async def update_game(self, event):
        #send message to each client
        await self.send(text_data=json.dumps({
            'field': self.tetris.field,
            'score': self.tetris.score,
            'next_piece': self.tetris.next_piece.tetromino[0],
            'game_over': self.tetris.game_over,
            'num_players': self.tetris.num_players
            #'bool_field': self.tetris.bool_field #for debugging only
        }))

    async def disconnect(self, close_code):
        self.tetris.num_players -= 1

        #close game if needed
        if self.tetris.num_players <= 0:
            self.games.pop(self.room_name)
            if hasattr(self, 'loop_task'):
                self.loop_task.cancel()

        #leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
