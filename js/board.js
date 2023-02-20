export default class Board {
    constructor(num) {
        this.size = num;
        this.attack = 2;
        this.face = 'E';
        this.pos = [num-1,0];
        this.brd = [];
        this.dead = false;
    }

    generateBrd() {
        for ( let i = 0; i < this.size; i++) {
            let temp = [];
            for (let j = 0; j < this.size; j++) {
                temp.push([]);
            }
            this.brd.push(temp);
        }
        this.brd[this.size-1][0].push('A');
    }


    deleteA(r, c, cc) {
        for(var i = 0; i < this.brd[r][c].length; i++) {
            if(this.brd[r][c][i] == cc) {
                this.brd[r][c].splice(i,1);
            }
        }
    }

    movePosition(move) {
        let i = this.pos[0];
        let j = this.pos[1];
        this.deleteA(i, j, 'A');
        this.brd[move[0]][move[1]].push('A');
        this.pos = move;
    }

    checkStatus() {
        for (let i = 0; i < this.brd[this.pos[0]][this.pos[1]].length; i++) {
            if (this.brd[this.pos[0]][this.pos[1]][i] === 'P' || this.brd[this.pos[0]][this.pos[1]][i] === 'W') {
                let temp = document.querySelector('.gameover-box');
                temp.style.display = 'flex';
                this.dead = true;
            }
            else if (this.brd[this.pos[0]][this.pos[1]][i] === 'T') {
                let temp = document.querySelector('.next-box');
                temp.style.display = 'flex';
                this.dead = true;
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
        if (r + 1 != this.size) {
            this.brd[r+1][c].push('B');
        }
        //check for left
        if (c - 1 != -1) {
            this.brd[r][c-1].push('B');
        }
        //check for right
        if (c + 1 != this.size) {
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
            if (r + 1 != this.size) {
                this.brd[r+1][c].push('S');
            }
            //check for left
            if (c - 1 != -1) {
                this.brd[r][c-1].push('S');
            }
            //check for right
            if (c + 1 != this.size) {
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
            if (r + 1 != this.size) {
                this.brd[r+1][c].push('G');
            }
            //check for left
            if (c - 1 != -1) {
                this.brd[r][c-1].push('G');
            }
            //check for right
            if (c + 1 != this.size) {
                this.brd[r][c+1].push('G');
            }
    }
}