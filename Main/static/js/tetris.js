var field = new Field();
var socket = new WebSocket("ws://" + window.location.host +
                            "/ws/tetris/" + roomName + "/");

socket.onmessage = function(event) {
    console.log('got data from server');

    //get data from server
    var data = JSON.parse(event.data);
    var board = data['field'];

    field.drawField(board);
    
    //only for debugging
    var bool_board = data['bool_field'];
    field.drawBoolField(bool_board);
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
