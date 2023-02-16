export default class Board {
    constructor() {
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
        for(var i = 0; i < brd[r][c].length; i++) {
            if(brd[r][c][i] == 'A') {
                brd[r][c].splice(i,1);
            }
        }
    }

    movePosition(move) {
        let i = this.position[0];
        let j = this.position[1];
        deleteA(i, j);
        this.brd[move[0]][move[1]].push('A');
        this.pos = move;
    }
}

