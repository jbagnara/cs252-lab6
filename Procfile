web: gunicorn Tetris.wsgi --log-file -
web: daphne Tetris.routing.application:channel_layer --port $PORT --bind 0.0.0.0 -v2
worker: python manage.py runworker -v2
