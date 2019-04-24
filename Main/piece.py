import random

class CellState():
    EMPTY = "white"
    I = "cyan" #cyan
    O = "yellow" #yellow
    T = "purple" #purple
    S = "green" #green
    Z = "red" #red
    J = "blue" #blue
    L = "orange" #orange

w = CellState.EMPTY

z = CellState.Z
Z = [[[z,z,w],[w,z,z],[w,w,w]],
	[[w,w,z],[w,z,z],[w,z,w]],
	[[w,w,w],[z,z,w],[w,z,z]],
	[[w,z,w],[z,z,w],[z,w,w]]]

s = CellState.S
S = [[[w,s,s],[s,s,w],[w,w,w]],
	[[w,s,w],[w,s,s],[w,w,s]],
	[[w,w,w],[w,s,s],[s,s,w]],
	[[s,w,w],[s,s,w],[w,s,w]]]

j = CellState.J
J = [[[w,j,w],[w,j,w],[j,j,w]],
	[[j,w,w],[j,j,j],[w,w,w]],
	[[w,j,j],[w,j,w],[w,j,w]],
	[[w,w,w],[j,j,j],[w,w,j]]]

t = CellState.T
T = [[[w,w,w],[t,t,t],[w,t,w]],
	[[w,t,w],[t,t,w],[w,t,w]],
	[[w,t,w],[t,t,t],[w,w,w]],
	[[w,t,w],[w,t,t],[w,t,w]]]

l = CellState.L
L = [[[w,l,w],[w,l,w],[w,l,l]],
	[[w,w,w],[l,l,l],[l,w,w]],
	[[w,l,l],[w,w,l],[w,w,l]],
	[[w,w,w],[w,w,l],[l,l,l]]]

i = CellState.I
I = [[[w,i,w,w],[w,i,w,w],[w,i,w,w],[w,i,w,w]],
	[[w,w,w,w],[i,i,i,i],[w,w,w,w],[w,w,w,w]],
	[[w,w,i,w],[w,w,i,w],[w,w,i,w],[w,w,i,w]],
	[[w,w,w,w],[w,w,w,w],[i,i,i,i],[w,w,w,w]]]

o = CellState.O
O = [[[w,w,w,w],[w,o,o,w],[w,o,o,w],[w,w,w,w]]]

PIECES = [Z, S, J, T, L, I, O]

class Piece():
    def __init__(self):
        self.tetromino = PIECES[random.randint(0, len(PIECES)-1)]
        self.orientation = 0

		#pos of top left block
        self.x = 3
        self.y = -1
