// import Board module
class Board {
    constructor() {
        this.face = 'E';
        this.pos = [7,0];
        this.brd = [
            [[], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], []],
            [[], [], [], [], [], [], [], []],
            [['A'], [], [], [], [], [], [], []],
        ]
    }

    deleteA(r, c) {
        for(var i = 0; i < this.brd[r][c].length; i++) {
            if(this.brd[r][c][i] == 'A') {
                this.brd[r][c].splice(i,1);
            }
        }
    }

    movePosition(move) {
        let i = this.pos[0];
        let j = this.pos[1];
        this.deleteA(i, j);
        this.brd[move[0]][move[1]].push('A');
        this.pos = move;
    }

    checkStatus() {
        for (let i = 0; i < this.brd[this.pos[0]][this.pos[1]].length; i++) {
            if (this.brd[this.pos[0]][this.pos[1]][i] === 'P' || this.brd[this.pos[0]][this.pos[1]][i] === 'W') {
                console.log("You are Dead");
            }
            else if (this.brd[this.pos[0]][this.pos[1]][i] === 'T') {
                console.log("You found the glitter");
            }
        }
    }


    spawnPit(r, c) {
        this.brd[r][c].push('P');
        //check upper square
        if (r - 1 != -1) {
            this.brd[r-1][c].push('B');
        }
        //check for lower
        if (r + 1 != 8) {
            this.brd[r+1][c].push('B');
        }
        //check for left
        if (c - 1 != -1) {
            this.brd[r][c-1].push('B');
        }
        //check for right
        if (c + 1 != 8) {
            this.brd[r][c+1].push('B');
        }
    }

    spawnWumpus(r, c){
        this.brd[r][c].push('W');
            //check upper square
            if (r - 1 != -1) {
                this.brd[r-1][c].push('S');
            }
            //check for lower
            if (r + 1 != 8) {
                this.brd[r+1][c].push('S');
            }
            //check for left
            if (c - 1 != -1) {
                this.brd[r][c-1].push('S');
            }
            //check for right
            if (c + 1 != 8) {
                this.brd[r][c+1].push('S');
            }
    }

    spawnTreasure(r, c){
        this.brd[r][c].push('T');
            //check upper square
            if (r - 1 != -1) {
                this.brd[r-1][c].push('G');
            }
            //check for lower
            if (r + 1 != 8) {
                this.brd[r+1][c].push('G');
            }
            //check for left
            if (c - 1 != -1) {
                this.brd[r][c-1].push('G');
            }
            //check for right
            if (c + 1 != 8) {
                this.brd[r][c+1].push('G');
            }
    }
}




var gap = 5;
var cellWidth = 60;
var upper_layer;

let board = new Board;

window.onload = function () {
    upper_layer = document.querySelector(".upper_layer");
    drawBoard(); 
    drawPieces();
}


// document.addEventListener("keydown", function(event) {
//     if (event.code === "ArrowUp" && position[0] != 0) {
        
//     }
//   });

//print out the eight by eight grid
function drawBoard() {
    for(var i = 0; i < 8; i++) {
        for(var j = 0; j < 8; j++) {
            let blk = document.createElement("div");
            blk.style.width = cellWidth+"px";
            blk.style.height = cellWidth+"px";
            blk.classList.add("block");
            blk.style.left = ((cellWidth + gap) * j + gap)+"px";
            blk.style.top = ((cellWidth + gap) * i + gap)+"px";
            document.querySelector(".board").appendChild(blk);
        }
    }
}


function drawPieces() {
    upper_layer.innerHTML = "";
    for(var i = 0; i < 8; i++) {
        for(var j = 0; j < 8; j++) {
            if (board.brd[i][j] !== []) {
                for(var k = 0; k < board.brd[i][j].length; k++) {
                    let piece = document.createElement("div");
                    piece.style.width = cellWidth+"px";
                    piece.style.height = cellWidth+"px";
                    piece.style.left = ((cellWidth + gap) * j + gap + 2)+"px";
                    piece.style.top = ((cellWidth + gap) * i + gap + 12)+"px";
                    if(board.brd[i][j][k] === 'A') {
                        piece.style.backgroundColor = 'red';
                        piece.classList.add("arrow");
                    }
                    if(board.brd[i][j][k] === 'P') piece.style.backgroundColor="black";
                    if(board.brd[i][j][k] === 'B') piece.style.backgroundColor="blue";
                    if(board.brd[i][j][k] === 'W') piece.style.backgroundColor="yellow";
                    if(board.brd[i][j][k] === 'S') piece.style.backgroundColor="green";
                    if(board.brd[i][j][k] === 'T') piece.style.backgroundColor="brown";
                    if(board.brd[i][j][k] === 'G') piece.style.backgroundColor="white";
                    piece.classList.add("piece");
                    document.querySelector(".upper_layer").appendChild(piece);
                }
        }
        }
    }
}


document.addEventListener("keydown", function(event) {
    let player = document.querySelector('.arrow'); 
    if (event.key === "w") {
        board.face = 'U';
        player.style.transform = "rotate(90deg)";
    }
    if (event.key === "s") {
        board.face = 'D';
        player.style.transform = "rotate(270deg)"; 

    }
    if (event.key === "a") {
        board.face = 'L';
        player.style.transform = "rotate(0deg)"; 

    }
    if (event.key === "d") {
        board.face = 'R';
        player.style.transform = "rotate(0deg)"; 
    }

    if (event.keyCode === 32) {
        if (board.face === 'U') {
            board.movePosition([board.pos[0]-1, board.pos[1]]);
        }   
        if (board.face === 'D') {
            board.movePosition([board.pos[0]+1, board.pos[1]]);
        }   
        if (board.face === 'L') {
            board.movePosition([board.pos[0], board.pos[1]-1]);
        }   
        if (board.face === 'R') {
            board.movePosition([board.pos[0], board.pos[1]+1]);
        }
    }
    board.checkStatus();
    drawPieces();
});

board.spawnPit(3,3);
board.spawnPit(6,6);
board.spawnWumpus(3,0);
board.spawnTreasure(0,7);
