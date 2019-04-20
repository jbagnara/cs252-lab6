const PIECES = [
    [z,"red"],
    [s,"green"],
    [t,"yellow"],
    [o,"blue"],
    [l,"purple"],
    [i,"cyan"],
    [j,"orange"]
];

function Field() {
    this.canvas = document.getElementById("canvas2");
    this.height = this.canvas.offsetHeight;
    this.width = this.canvas.offsetWidth;
    this.cellSize = this.width / 10; //assumes width and height have correct porportions

    this.canvas = this.canvas.getContext("2d");
    this.init();

    this.canvas = document.getElementById("canvas1").getContext("2d");
    this.canvas.lineJoin = "miter";
    this.canvas.fillStyle = "white";
    this.canvas.fillRect(0, 0, this.width, this.height);
}

/*
    Creates the field grid and border
    Called with field object is created
*/
Field.prototype.init = function() {
    this.canvas.lineWidth = 1;

    //draw grid vertical
    for (var x = this.cellSize; x < this.width; x += this.cellSize) {
        this.canvas.beginPath();
        this.canvas.strokeStyle = "#CCCCCC"; //light grey
        this.canvas.moveTo(x, 0);
        this.canvas.lineTo(x, this.height);            
        this.canvas.stroke();
    }

    //draw grid horizontal
    for (var y = this.cellSize; y < this.height; y += this.cellSize) {
        this.canvas.beginPath();
        this.canvas.strokeStyle = "#CCCCCC"; //light grey
        this.canvas.moveTo(0, y);
        this.canvas.lineTo(this.width, y);            
        this.canvas.stroke();
    }

    this.canvas.lineWidth = 5;

    //draw border (strokeRect didn't work as well)
    this.canvas.beginPath();
    this.canvas.strokeStyle = "#000000"; //black
    this.canvas.moveTo(0, 0);
    this.canvas.lineTo(this.width, 0);
    this.canvas.lineTo(this.width, this.height);
    this.canvas.lineTo(0, this.height);
    this.canvas.lineTo(0, 0);        
    this.canvas.stroke();
}

/*
    Draws a block in a cell

    \param x
        will draw the block in the xth row (0 indexed)
    \param y
        will draw the block in the yth column (0 indexed)
    \param color
        the color of the block being drawn
*/
Field.prototype.drawBlock = function(x, y, color) {
    this.canvas.fillStyle = color;
    this.canvas.fillRect(x*this.cellSize, y*this.cellSize, this.cellSize, this.cellSize);
}

Field.prototype.undrawBlock = function(x, y) {
	this.canvas.fillStyle = "white";
	this.canvas.fillRect(x*this.cellSize, y*this.cellSize, this.cellSize, this.cellSize);	
}

Field.prototype.drawField = function() {

}

/*
 * 
*/
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
    piece.orientation = piece.orientation % piece.tetromino.length;
    piece.activeTetromino = piece.tetromino[piece.orientation];
    piece.draw();
}
    
function CONTROL(event){
    if(event.keyCode == 37){
        piece.moveLeft();
    }
    else if(event.keyCode == 38){
        // console.log("rotate here")
        piece.rotate();
    }
    else if(event.keyCode == 39){
        piece.moveRight();
    }
    else if(event.keyCode == 40){
        piece.moveDown();
    }
}

function genRandomPiece() {
    min = Math.ceil(0);
    max = Math.floor(6);
    
    rand_num = Math.floor(Math.random() * (max - min + 1)) + min;

    new_piece = new Piece(PIECES[rand_num][0]);
    
    return new_piece;
}

/* ------------------------RUN PROGRAM ------------------------------*/
var field = new Field();
// var piece = new Piece(PIECES[1][0]);
var piece = genRandomPiece();
piece.draw(field);


document.addEventListener("keydown",CONTROL);
