var field = new Field("canvas_grid", "canvas", 10, 20);
var field_next = new Field("canvas_grid_next", "canvas_next", 4, 4);
var score_element = document.getElementById("score");
var players_element = document.getElementById("num_players");

var socket = new WebSocket("ws://" + window.location.host +
                            "/ws/tetris/" + roomName + "/");

var game_over = 0;
var num_players = 0;

socket.onmessage = function(event) {
    //console.log('got data from server');

    //get data from server
    var data = JSON.parse(event.data);
    var board = data['field'];
    var next_piece = data['next_piece'];
    var score = data['score'];
    game_over = data['game_over'];
    num_players = data['num_players'];

    if (game_over == 1) {
        socket.close();
    }

    field.drawField(board);
    field_next.clearField();
    field_next.drawField(next_piece);
    score_element.innerHTML = score;
    players_element.innerHTML = num_players;

    
    //only for debugging
    // var bool_board = data['bool_field'];
    // field.drawBoolField(bool_board);
};

socket.onclose = function(event) {
    if (game_over == 1) {
        //console.log('game_over');
        document.location.href = '/game_over/';
    }
    else {
        console.error("socket closed unexpectedly");
    }
    
};

//send updates to server
function CONTROL (event) {
    //console.log('sending data to server');

    if (event.keyCode >= 37 && event.keyCode <= 40) { //if arrow key
        socket.send(JSON.stringify({
            'move': event.keyCode
        }));
    }
}

document.addEventListener("keyup",CONTROL);
