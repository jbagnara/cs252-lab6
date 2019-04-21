from . piece import CellState, Piece

class Tetris():
    def __init__(self):
        self.width = 10
        self.height = 20

        self.field = [[CellState.EMPTY for y in range(self.height)]
                      for x in range(self.width)]
        
        self.curr_piece = Piece()  # get random tetromino
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

    def rotate_piece(self):
        self.undraw_piece()
        self.curr_piece.orientation = (self.curr_piece.orientation + 1) % len(self.curr_piece.tetromino)
        self.draw_piece()

    def draw_piece(self):
        piece = self.curr_piece.tetromino[self.curr_piece.orientation]

        for x, i in zip(range(self.curr_piece.x, self.curr_piece.x + len(piece)), range(len(piece))):
            for y, j in zip(range(self.curr_piece.y, self.curr_piece.y + len(piece)), range(len(piece))):
                if x < self.width and x >= 0 and y < self.height and y >= 0:
                    self.field[x][y] = piece[i][j]

    def undraw_piece(self):
        piece = self.curr_piece.tetromino[self.curr_piece.orientation]

        for x in range(self.curr_piece.x, self.curr_piece.x + len(piece)):
            for y in range(self.curr_piece.y, self.curr_piece.y + len(piece)):
                if x < self.width and x >= 0 and y < self.height and y >= 0:
                    self.field[x][y] = CellState.EMPTY
