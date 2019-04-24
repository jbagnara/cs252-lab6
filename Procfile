web: gunicorn Tetris.wsgi --log-file -
web: daphne Tetris.asgi:channel_layer --port 8000 --bind 127.0.0.1 -v2
