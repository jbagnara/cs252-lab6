import enum
from . import tetromino

class CellState(enum.Enum):
    EMPTY = 0
    FULL = 1
    PLACED = 2

class Tetris():
    def __init__(self):
        self.width = 10
        self.height = 20

        self.field = [[0 for y in range(self.height)] for x in range(self.width)]
        self.curr_piece = tetromino.Piece() #get random tetromino
        self.draw_piece()

    def move_piece_left(self):
        self.undraw_piece()
        self.curr_piece.x -= 1
        self.draw_piece()

    def move_piece_right(self):
        self.undraw_piece()
        self.curr_piece.x += 1
        self.draw_piece()

    def move_piece_down(self):
        self.undraw_piece()
        self.curr_piece.y += 1
        self.draw_piece()

    def draw_piece(self):
        piece = self.curr_piece.tetromino[self.curr_piece.orientation]

        for x, i in zip(range(self.curr_piece.x, len(piece)), range(len(piece))):
            for y, j in zip(range(self.curr_piece.y, len(piece)), range(len(piece))):
                self.field[x][y] = piece[i][j]

    def undraw_piece(self):
        piece = self.curr_piece.tetromino[self.curr_piece.orientation]

        for x in range(self.curr_piece.x, len(piece)):
            for y in range(self.curr_piece.y, len(piece)):
                self.field[x][y] = CellState.EMPTY