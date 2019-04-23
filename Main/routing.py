from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path('ws/tetris/<str:room_name>/', consumers.TetrisConsumer, name='TetrisConsumer')
]