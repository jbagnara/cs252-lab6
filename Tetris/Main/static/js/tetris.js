var field = new Field();
var socket = new WebSocket("ws://" + window.location.host +
                            "/ws/tetris/" + roomName + "/");

var xInput = document.getElementById("xInput");
var yInput = document.getElementById("yInput");
var x = xInput.value;
var y = yInput.value;
field.drawBlock(xInput.value, yInput.value, "red");

socket.onmessage = function(event) {
    console.log('got data from server');

    field.clearBlock(x, y);

    //get data from server
    var data = JSON.parse(event.data);
    xInput.value = data['x'];
    yInput.value = data['y'];
    x = data['x'];
    y = data['x'];

    field.drawBlock(xInput.value, yInput.value, "red");
};

socket.onclose = function(event) {
    console.error("socket closed unexpectedly");
};

//send updates to server
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
