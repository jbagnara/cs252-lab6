var field = new Field();
var socket = new WebSocket("ws://" + window.location.host +
                            "/ws/tetris/" + roomName + "/");

xInput = document.getElementById("xInput");
yInput = document.getElementById("yInput");

socket.onmessage = function(event) {
    console.log('got data from server');
    field.clearBlock(xInput.value, yInput.value);

    //get data from server (from the Tetris consumer receive function)
    var data = JSON.parse(event.data);
    xInput.value = data['x'];
    yInput.value = data['y'];

    field.drawBlock(xInput.value, yInput.value, "red");
};

socket.onclose = function(event) {
    console.error("socket closed unexpectedly");
};

//send updates to server (to the Tetris consumer receive function)
xInput.onchange = function(event) {
    console.log('sending data to server')
    socket.send(JSON.stringify({
        'x': xInput.value,
        'y': yInput.value
    }));
};
yInput.onchange = function(event) {
    console.log('sending data to server')
    socket.send(JSON.stringify({
        'x': xInput.value,
        'y': yInput.value
    }));
};
