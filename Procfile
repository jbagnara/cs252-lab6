web: gunicorn Tetris.wsgi --log-file -
web: daphne -b 127.0.0.1 -p 6379 Tetris.asgi:application
