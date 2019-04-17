from channels.generic.websocket import WebsocketConsumer
import json

class TetrisConsumer(WebsocketConsumer):
    x = 0
    y = 0

    def connect(self):
        self.accept()

    def disconnect(self, close_code):
        pass
    
    #get updates from client
    def receive(self, text_data):
        print('getting and sending data to client')
        data = json.loads(text_data)
        self.x = data['x']
        self.y = data['y']

        self.send(text_data=json.dumps({
            'x': self.x,
            'y': self.y
        }))