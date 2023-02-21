// import Board module
import Board from './board.js';

var grid_size = 5;
var pit_size = grid_size-4;
var wumpus_size = 1;
var wumpus_pos = [];
var level = [1,1]
var gap = 5;
var cellWidth = 60;
var upper_layer;
var fog_layer;
var fog_board = generateFog(0);
var jump = false;

if (grid_size >= 7) {
    pit_size = grid_size;
}


if (grid_size >= 8) {
    jump = true;
    wumpus_size = Math.floor(grid_size / 2) - 3;
}

let board = new Board(grid_size);

board.generateBrd();

window.onload = function () {
    upper_layer = document.querySelector(".upper_layer");
    fog_layer = document.querySelector(".fog_layer");
    let btn_next = document.querySelector(".next-level")
    let btn_restart = document.querySelector(".restart")
    btn_next.onclick = function(){
        if(level[1] == 2) {
            level[0]++;
            level[1] = 1; 
            grid_size++;
            if(grid_size < 7) {
                pit_size = grid_size-2;
            }
            else {
                pit_size = grid_size-1;
            }        
        }
        else {
            level[1]++;
            pit_size++;
        }
        if(level[0] >= 5) {
            pit_size = level[0]*2;
            if (level[1] ==2) {
                pit_size += 2;
            } 
        }
        updateLvl();
        if (grid_size >= 8) {
            jump = true;
            wumpus_size = Math.floor(grid_size / 2) - 3;
        }
        board = new Board(grid_size);
        board.generateBrd();
        fog_board = generateFog(0);
        wumpus_pos = [];
        generateObj();
        drawPieces();
        drawfog();
        resizeBoard();
        drawBoard();
        let temp = document.querySelector('.next-box');
        temp.style.display = 'none';
    }
    btn_restart.onclick = function(){
        board = new Board(grid_size);
        board.generateBrd();
        fog_board = generateFog(0);
        wumpus_pos = [];
        generateObj();
        drawPieces();
        drawfog();
        resizeBoard();
        drawBoard();
        let temp = document.querySelector('.gameover-box');
        temp.style.display = 'none';
    }
    resizeBoard();
    drawBoard(); 
    drawPieces();
    drawfog();
    generateObj();
}

function updateLvl () {
    let lvlm = document.querySelector('.level-main');
    let lvls = document.querySelector('.level-sub');
    lvlm.textContent = level[0];
    lvls.textContent = level[1];
}


function generateFog(c) {
    let ans = []
    for(var i = 0; i < grid_size; i++) {
        let temp = [];
        for(var j = 0; j < grid_size; j++) {
            temp.push(c); 
        }
        ans.push(temp);
    }
    ans[grid_size-1][0] = 1;
    return ans;
}


function resizeBoard() {
    let b = document.querySelector(".board-box");
    let bb = document.querySelector(".board");
    bb.style.width=(grid_size+2)*65.9375 + 8 +"px";
    bb.style.height=(grid_size+2)*65.9375 + 8 + "px";
    // Select all div elements inside the parent div
    const divsToRemove = bb.querySelectorAll('div');

    // Loop through the selected div elements and remove them
    divsToRemove.forEach(div => {
    div.remove();
    });
}



//print out the eight by eight grid
function drawBoard() {
    for(var i = 0; i < grid_size+2; i++) {
        for(var j = 0; j < grid_size+2; j++) {
            let blk = document.createElement("div");
            if (i == 0 || j == 0 || i == grid_size+1 || j == grid_size+1)
             {
                blk.classList.add("block");
                if(i == 0) {
                    if(j == 0) {
                        blk.classList.add("brdr-corner");
                        blk.style.transform="rotate(0deg)";
                        blk.style.left = ((cellWidth + gap) * j + gap) + 30 +"px"; 
                        blk.style.top = ((cellWidth + gap) * i + gap) + 30 + "px";
                    }
                    else if(j == grid_size+1) {
                        blk.classList.add("brdr-corner");
                        blk.style.left = ((cellWidth + gap) * j + gap) -17 + "px"; 
                        blk.style.top = ((cellWidth + gap) * i + gap) + 30 + "px";
                    }
                    else {
                        blk.classList.add("brdr-side-verti");
                        blk.style.left = ((cellWidth + gap) * j + gap) +"px"; 
                        blk.style.top = ((cellWidth + gap) * i + gap) + 30 + "px";
                    }
                }
                else if(i == grid_size+1) {
                    if(j == 0) {
                        blk.classList.add("brdr-corner-down");
                        blk.style.left = ((cellWidth + gap) * j + gap) + 48 +"px"; 
                        blk.style.top = ((cellWidth + gap) * i + gap) + "px";
                    }
                    else if(j ==  grid_size+1) {
                        blk.classList.add("brdr-corner-down");
                        blk.style.left = ((cellWidth + gap) * j + gap) +1 +"px"; 
                        blk.style.top = ((cellWidth + gap) * i + gap)  + "px";
                    }
                    else {
                        blk.classList.add("brdr-side-verti");
                        blk.style.left = ((cellWidth + gap) * j + gap)  +"px"; 
                        blk.style.top = ((cellWidth + gap) * i + gap) + "px";
                    }
                }
                else if(j == 0 && i !=  grid_size+1 && i != 0) {
                    blk.classList.add("brdr-side-horix");
                    blk.style.left = ((cellWidth + gap) * j + gap) + 47 +"px"; 
                    blk.style.top = ((cellWidth + gap) * i + gap) + "px";
                }
                else if(j ==  grid_size+1 && i !=  grid_size+1 && i != 0) {
                    blk.classList.add("brdr-side-horix");
                    blk.style.left = ((cellWidth + gap) * j + gap) +"px"; 
                    blk.style.top = ((cellWidth + gap) * i + gap) + "px";
                }
            }
            else{
                blk.style.width = cellWidth+"px";
                blk.style.height = cellWidth+"px";
                blk.classList.add("block");
                blk.style.left = ((cellWidth + gap) * j + gap) +"px"; 
                blk.style.top = ((cellWidth + gap) * i + gap) + "px";
                if(i == 1) {
                    if(j == 1) {
                        blk.classList.add("block-corner");
                        blk.style.transform="rotate(0deg)";
                    }
                    else if(j == grid_size) {
                        blk.classList.add("block-corner");
                        blk.style.transform="rotate(90deg)";
                    }
                    else {
                        blk.classList.add("block-side");
                    }
                }
                else if(i == grid_size) {
                    if(j == 1) {
                        blk.classList.add("block-corner");
                        blk.style.transform="rotate(-90deg)";
                    }
                    else if(j ==  grid_size) {
                        blk.classList.add("block-corner");
                        blk.style.transform="rotate(180deg)";
                    }
                    else {
                        blk.classList.add("block-side");
                        blk.style.transform="rotate(180deg)";
                    }
                }
                else if(j == 1 && i !=  grid_size && i != 1) {
                    blk.classList.add("block-side");
                    blk.style.transform="rotate(-90deg)";
                }
                else if(j ==  grid_size && i !=  grid_size && i != 1) {
                    blk.classList.add("block-side");
                    blk.style.transform="rotate(90deg)";
                }
                else {
                    let num = Math.floor(Math.random() * 2);
                    if(num == 0) blk.classList.add("block-fill1")
                    else  blk.classList.add("block-fill2");
                }
            }
            document.querySelector(".board").appendChild(blk);
        }
    }
}



function drawPieces() {
    upper_layer.innerHTML = "";
    for(var i = 0; i < grid_size; i++) {
        for(var j = 0; j < grid_size; j++) {
            if (board.brd[i][j] !== []) {
                for(var k = 0; k < board.brd[i][j].length; k++) {
                    let piece = document.createElement("div");
                    if(board.brd[i][j][k] === 'A') {
                        piece.style.top = ((cellWidth + gap) * i + gap + 50)+"px";
                        piece.style.left = ((cellWidth + gap) * j + gap + 75)+"px";
                        piece.classList.add("player")
                        piece.style.width = cellWidth-20+"px";
                        piece.style.height = cellWidth+20+"px";
                        if(board.face === 'U') {
                            piece.classList.add("player-back")
                        }
                        if(board.face === 'D') {
                            piece.classList.add("player-front")
                        }
                        if(board.face === 'L') {
                            piece.classList.add("player-left")
                        }
                        if(board.face === 'R') {
                            piece.classList.add("player-right")
                        }
                    }
                    else {
                        piece.style.top = ((cellWidth + gap) * i + gap + 77)+"px";
                        piece.style.left = ((cellWidth + gap) * j + gap + 67)+"px";
                        piece.style.width = cellWidth+"px";
                        piece.style.height = cellWidth+"px";
                    }
                    if(board.brd[i][j][k] === 'P') piece.classList.add("pit");
                    if(board.brd[i][j][k] === 'B') piece.classList.add("breeze");
                    if(board.brd[i][j][k] === 'W') piece.classList.add("wumpus");
                    if(board.brd[i][j][k] === 'S') piece.classList.add("stench");
                    if(board.brd[i][j][k] === 'T') piece.classList.add("treasure");
                    if(board.brd[i][j][k] === 'G') piece.classList.add("glitter");
                    piece.classList.add("piece");
                    document.querySelector(".upper_layer").appendChild(piece);
                }
        }
        }
    }
}


function drawfog() {
    fog_layer.innerHTML = "";
    for(var i = 0; i < grid_size; i++) {
        for(var j = 0; j < grid_size; j++) {
            if (fog_board[i][j] === 0) {
                let fog = document.createElement("div");
                fog.style.width = cellWidth+"px";
                fog.style.height = cellWidth+"px";
                fog.style.left = ((cellWidth + gap) * j + gap + 67)+"px";
                fog.style.top = ((cellWidth + gap) * i + gap + 77)+"px";
                fog.classList.add("fog");
                document.querySelector(".fog_layer").appendChild(fog);
            }
        }
    }
}

function generateObj() {   
    let t = generateNum();
    let danger = [];
    danger.push(t);
    board.spawnPit(t[0], t[1]);
    for(let i = 1; i < pit_size; i++) {
        t = generateNum();
        for (let j = 0; j < danger.length; j++) {
            if(danger[j][0] === t[0] && danger[j][1] === t[1]) {
                t = generateNum();
                j--;
            }
        }
        danger.push(t);
        board.spawnPit(t[0], t[1]);
    }
    
    for(let i = 0; i < wumpus_size; i++) {
        t = generateNum();
        danger.push(t);
        board.spawnWumpus(t[0], t[1]);
        wumpus_pos.push(t);
    }
    
    t= generateNum();
    let size = danger.length
    let b = true
    while (b == true) {
        b = false;
        for(let i = 0; i < size; i++) {
            if (danger[i][0] === t[0] && danger[i][1] === t[1]) {
                t= generateNum();
                b = true;
                break;
            }
        }
    }
    
    board.spawnTreasure(t[0],t[1]);

}

function moveWumpus() {
    let nn = Math.floor(Math.random() * 4); 
    console.log(nn);
    if(nn != 0) {
            for (let i = 0; i < wumpus_pos.length; i++) {
            let wr = wumpus_pos[i][0];
            let wc = wumpus_pos[i][1];
            //delete wumpus
            board.deleteA(wr, wc, 'W');
            //delete breeze
            //check upper square
            let pos_moves = [];
            if (wr - 1 != -1) {
                board.deleteA(wr-1, wc, 'S');
                let temp = [];
                temp.push(wr-1);
                temp.push(wc);
                pos_moves.push(temp);
            }
            //check for lower
            if (wr + 1 != grid_size) {
                board.deleteA(wr+1, wc, 'S');
                let temp = [];
                temp.push(wr+1);
                temp.push(wc);
                pos_moves.push(temp);
            }
            //check for left
            if (wc - 1 != -1) {
                board.deleteA(wr, wc-1, 'S');
                let temp = [];
                temp.push(wr);
                temp.push(wc-1);
                pos_moves.push(temp);
            }
            //check for right
            if (wc + 1 != grid_size) {
                board.deleteA(wr, wc+1, 'S');
                let temp = [];
                temp.push(wr);
                temp.push(wc+1);
                pos_moves.push(temp);
            }
            //spawn the new wumpus
            let r = Math.floor(Math.random() * pos_moves.length);
            board.spawnWumpus(pos_moves[r][0], pos_moves[r][1]);
            wumpus_pos[i] = pos_moves[r];
        }
    }
    
}


document.addEventListener("keydown", function(event) {
    if(board.dead != true) {
            let player = document.querySelector('.arrow'); 
        if (event.key === "w") {
            board.face = 'U';
        }
        if (event.key === "s") {
            board.face = 'D';
        }
        if (event.key === "a") {
            board.face = 'L';
        }
        if (event.key === "d") {
            board.face = 'R';
        }

        if (event.keyCode === 32) {
            event.preventDefault();
            if (board.face === 'U') {
                if(board.pos[0] != 0) {
                    board.movePosition([board.pos[0]-1, board.pos[1]]);
                }
                
            }   
            if (board.face === 'D') {
                if(board.pos[0] !=  grid_size-1) {
                    board.movePosition([board.pos[0]+1, board.pos[1]]);
                }
            }   
            if (board.face === 'L') {
                if(board.pos[1] != 0) {
                    board.movePosition([board.pos[0], board.pos[1]-1]);
                }
            }   
            if (board.face === 'R') {
                if(board.pos[1] !=  grid_size-1) {
                    board.movePosition([board.pos[0], board.pos[1]+1]);
                }
            }
            //update the jumping effect too
            if(jump == true) {
                moveWumpus();
            }
            
        }

        if(event.key === 'z') {
            board.attack--;
            updateattacks();
        }
        fog_board[board.pos[0]][board.pos[1]] = 1;
        board.checkStatus();
        if(board.dead == true) {
            fog_board = generateFog(1);
        }
        drawfog();
        drawPieces();
    }
    
});

function generateNum() {
    let randn1 = Math.floor(Math.random() * grid_size);
    let randn2 = Math.floor(Math.random() * grid_size);
    while((randn1 == grid_size-1 && randn2 == 0) || (randn1 == grid_size-2 && randn2 == 0)
        || (randn1 == grid_size-1 && randn2 == 1) || (randn1 == grid_size-2 && randn2 == 1)) {
        randn1 = Math.floor(Math.random() * grid_size);
        randn2 = Math.floor(Math.random() * grid_size);
    }
    return [randn1, randn2];
}


const hoverDiv = document.querySelector('.how-to');
const expandDiv = document.querySelector('.how-des');
