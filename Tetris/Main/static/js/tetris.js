var field = new Field();

var socket = new WebSocket("ws://" + window.location.host +
                            "/ws/tetris" + roomName + "/");

socket.onmessage = function(event) {
    var data = JSON.parse(event.data);
    //get x and y
    //draw block
};

socket.onclose = function(event) {
    console.error("socket closed unexpectedly");
};

xInput = document.getElementById("xInput").value;
yInput = document.getElementById("xInput").value;

document.getElementById("xInput").onchange = function(event) {

}
