const PIECES = [
    [z,"red"],
    [s,"green"],
    [t,"yellow"],
    [o,"blue"],
    [l,"purple"],
    [i,"cyan"],
    [j,"orange"]
];

function Field(canvas_grid, canvas, game_width, game_height) {
    this.game_width = game_width;
    this.game_height = game_height;

    this.canvas_grid = document.getElementById(canvas_grid);
    this.height = this.canvas_grid.offsetHeight;
    this.width = this.canvas_grid.offsetWidth;
    this.cellSize = this.width / this.game_width; //assumes width and height have correct porportions

    this.canvas_grid = this.canvas_grid.getContext("2d");
    this.init();

    this.canvas = document.getElementById(canvas).getContext("2d");
    this.canvas.fillStyle = "white";
    this.canvas.fillRect(0, 0, this.width, this.height);
}

/*
    Creates the field grid and border
    Called with field object is created
*/
Field.prototype.init = function() {
    this.canvas_grid.lineWidth = 1;

    //draw grid vertical
    for (var x = this.cellSize; x < this.width; x += this.cellSize) {
        this.canvas_grid.beginPath();
        this.canvas_grid.strokeStyle = "#CCCCCC"; //light grey
        this.canvas_grid.moveTo(x, 0);
        this.canvas_grid.lineTo(x, this.height);            
        this.canvas_grid.stroke();
    }

    //draw grid horizontal
    for (var y = this.cellSize; y < this.height; y += this.cellSize) {
        this.canvas_grid.beginPath();
        this.canvas_grid.strokeStyle = "#CCCCCC"; //light grey
        this.canvas_grid.moveTo(0, y);
        this.canvas_grid.lineTo(this.width, y);            
        this.canvas_grid.stroke();
    }

    this.canvas_grid.lineWidth = 5;

    //draw border (strokeRect didn't work as well)
    this.canvas_grid.beginPath();
    this.canvas_grid.strokeStyle = "#000000"; //black
    this.canvas_grid.moveTo(0, 0);
    this.canvas_grid.lineTo(this.width, 0);
    this.canvas_grid.lineTo(this.width, this.height);
    this.canvas_grid.lineTo(0, this.height);
    this.canvas_grid.lineTo(0, 0);        
    this.canvas_grid.stroke();
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

Field.prototype.drawField = function(board) {
    for( x = 0; x < board.length; x++) {
        for(y = 0; y < board[x].length; y++) {
            this.drawBlock(x, y, board[x][y]);
        }
    }
}

Field.prototype.clearField = function(board) {
    for( x = 0; x < this.game_width; x++) {
        for(y = 0; y < this.game_height; y++) {
            this.drawBlock(x, y, "white");
        }
    }
}

//only for debugging
Field.prototype.drawBoolBlock = function(x, y, color) {
    this.canvas.fillStyle = color;
    this.canvas.fillRect(x*this.cellSize, y*this.cellSize, this.cellSize/2, this.cellSize/2);
}

//only for debugging
Field.prototype.drawBoolField = function(bool_board) {
    console.log("bool field");

    for( x = 0; x < game_width; x++) {
        for(y = 0; y < game_height; y++) {
            if (bool_board[x][y] == 1)
                this.drawBoolBlock(x, y, "black");
            else
                this.drawBoolBlock(x, y, "grey");
        }
    }
}

