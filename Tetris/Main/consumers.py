from channels.generic.websocket import AsyncWebsocketConsumer
import json

class TetrisConsumer(AsyncWebsocketConsumer):
    x = 0
    y = 0

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
        x = data['x']
        y = data['y']

        #send message to group
        await self.channel_layer.group_send(
            self.room_group_name,
            {'type': 'update_pos', 'x': x, 'y': y}
        )

    async def update_pos(self, event):
        print('getting from group, sending data to a client')

        #get message from room group
        self.x = event['x']
        self.y = event['y']

        #send message to each client
        await self.send(text_data=json.dumps({
            'x': self.x,
            'y': self.y
        }))
