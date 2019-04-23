from . piece import CellState, Piece

class Tetris():
    def __init__(self):
        self.width = 10
        self.height = 20

        self.field = [[CellState.EMPTY for y in range(self.height)]
                for x in range(self.width)]

        self.num_players = 0
        self.score = 0
        
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

    def is_row_full(self, row):
        for x in range(self.width):
            if self.field[x][row] == CellState.EMPTY:
                return True

        return False

    def clear_rows(self):
        #check for full rows
        num_full_rows = 0
        for y in range(self.height-1, 0, -1):
            if self.is_row_full(y):
                num_full_rows += 1

        #update score
        if num_full_rows == 1: #single
            self.score += 40
        elif num_full_rows == 2: #double
            self.score += 100
        elif num_full_rows == 3: #triple
            self.score += 300
        elif num_full_rows >= 4: #tetris
            self.score += 1200

        #update field
        for y in range(self.height-num_full_rows, self.height):
            for x in range(self.width):
                self.field[x][y] = CellState.EMPTY

        return num_full_rows

    def move_rows_down(self, num_full_rows):
        #move rows down
        for y in range(self.height-1, 0, -1):
            for x in range(self.width):
                self.field[x][y] = self.field[x][y+num_full_rows]
            
        #add new rows at top
        for y in range(num_full_rows):
            for x in range(self.width):
                self.field[x][y] = CellState.EMPTY