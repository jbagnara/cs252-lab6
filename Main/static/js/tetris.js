var field = new Field("canvas_grid", "canvas", 10, 20);
var field_next = new Field("canvas_grid_next", "canvas_next", 4, 4);

var socket = new WebSocket("ws://" + window.location.host +
                            "/ws/tetris/" + roomName + "/");

socket.onmessage = function(event) {
    console.log('got data from server');

    //get data from server
    var data = JSON.parse(event.data);
    var board = data['field'];
    var next_piece = data['next_piece'];

    field.drawField(board);
    field_next.clearField();
    field_next.drawField(next_piece);
    
    //only for debugging
    // var bool_board = data['bool_field'];
    // field.drawBoolField(bool_board);
};

socket.onclose = function(event) {
    console.error("socket closed unexpectedly");
};

//send updates to server
function CONTROL (event) {
    console.log('sending data to server');

    //TODO: only send keyboard input
    socket.send(JSON.stringify({
        'move': event.keyCode
    }));
}

document.addEventListener("keyup",CONTROL);
