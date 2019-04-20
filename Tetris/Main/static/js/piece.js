const z = [[[1,1,0],[0,1,1],[0,0,0]],
	[[0,1,0],[0,1,1],[0,1,0]],
	[[0,0,0],[1,1,0],[0,1,1]],
	[[0,1,0],[1,1,0],[1,0,0]]];

const s = [[[0,1,1],[1,1,0],[0,0,0]],
	[[0,1,0],[0,1,1],[0,0,1]],
	[[0,0,0],[0,1,1],[1,1,0]],
	[[1,0,0],[1,1,0],[0,1,0]]];

const j = [[[0,1,0],[0,1,0],[1,1,0]],
	[[1,0,0],[1,1,1],[0,0,0]],
	[[0,1,1],[0,1,0],[0,1,0]],
	[[0,0,0],[1,1,1],[0,0,1]]];

const t = [[[0,0,0],[1,1,1],[0,1,0]],
	[[0,1,0],[1,1,0],[0,1,0]],
	[[0,1,0],[1,1,1],[0,0,0]],
	[[0,1,0],[0,1,1],[0,1,0]]];

const l = [[[0,1,0],[0,1,0],[0,1,1]],
	[[0,0,0],[1,1,1],[1,0,0]],
	[[0,1,1],[0,0,1],[0,0,1]],
	[[0,0,0],[0,0,1],[1,1,1]]];

const i = [[[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]],
	[[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],
	[[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0]],
	[[0,0,0,0],[0,0,0,0],[1,1,1,1],[0,0,0,0]]];

const o = [[[0,0,0,0],[0,1,1,0],[0,1,1,0],[0,0,0,0]]];


function Piece(tetromino, color) {
	this.tetromino = tetromino;
	this.color = color;

    // change this number to change the orientation of the piece

    this.orientation = 0;
	// initial orientation of the piece
	this.activeTetromino = this.tetromino[this.orientation];

	// starting position
	this.x = 3;
	this.y = 3;
}

/*
 * Draws a piece onto the field given by the parameter 'field'
*/
Piece.prototype.draw = function() {
	for( r = 0; r < this.activeTetromino.length; r++){
        for(c = 0; c < this.activeTetromino.length; c++){
            // we draw only occupied squares
            if( this.activeTetromino[r][c]){
                // drawSquare(this.x + c,this.y + r, color);
				field.drawBlock(this.x + c, this.y + r, "orange");
            }
        }
	}
}

/*
 * Undraws a piece onto the field given by the parameter 'field'
*/
Piece.prototype.undraw = function() {
    for( r = 0; r < this.activeTetromino.length; r++){
        for(c = 0; c < this.activeTetromino.length; c++){
            // we draw only occupied squares
            if( this.activeTetromino[r][c]){
                // drawSquare(this.x + c,this.y + r, color);
				field.undrawBlock(this.x + c, this.y + r);
            }
        }
	}
}

/*
Piece.prototype.collided() = function() {
    for( r = 0; r < piece.length; r++){
        for(c = 0; c < piece.length; c++){
            //if(!piece[r][c]){
              //  continue;
            //}
        }
    }
}
*/

Piece.prototype.moveDown = function() {
    this.undraw();
    this.y++;
    this.draw();
}

Piece.prototype.moveLeft = function() {
    this.undraw();
    this.x--;
    this.draw();
}

Piece.prototype.moveRight = function() {
    this.undraw();
    this.x++;
    this.draw();
}

Piece.prototype.rotate = function() {
    piece.undraw();
    piece.orientation++;
    if (piece.orientation >= 4) {
        piece.orientation = piece.orientation % 4;
    }
    piece.activeTetromino = piece.tetromino[piece.orientation];
    piece.draw();
}

function genRandomPiece() {
    min = Math.ceil(0);
    max = Math.floor(6);
    
    rand_num = Math.floor(Math.random() * (max - min + 1)) + min;

    new_piece = new Piece(PIECES[rand_num][0]);
    
    return new_piece;
}