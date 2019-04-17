function Field() {
    this.canvas = document.getElementById("canvas2");
    this.height = this.canvas.offsetHeight;
    this.width = this.canvas.offsetWidth;
    this.cellSize = this.width / 10; //assumes width and height have correct porportions

    this.canvas = this.canvas.getContext("2d");
    this.init();

    this.canvas = document.getElementById("canvas1").getContext("2d");
    this.canvas.lineJoin = "miter";
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

Field.prototype.drawField = function() {

}