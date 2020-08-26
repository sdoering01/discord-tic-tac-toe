module.exports = class Game {
    constructor(size, symbolsToWin, challenger, opponent) {
        this.size = size;
        this.symbolsToWin = symbolsToWin;
        this.field = Array.from(Array(size), () => new Array(size).fill(0));
        this.currentPlayer = 1;
        this.running = true;
        this.winner = undefined;
        this.players = [challenger, opponent];
    }

    makeTurn(x, y) {
        if (this.field[x][y] !== 0) {
            return false;
        }

        this.field[x][y] = this.currentPlayer;
        this.refreshState(x, y);
        this.incrementPlayer();
        return true;
    }

    getFieldString() {
        let fieldString = '```\n  x';
        for (let x = 0; x < this.size; x++) {
            fieldString += ` ${x + 1}`;
        }
        fieldString += '\ny -';
        fieldString += '--'.repeat(this.size);

        for (let y = 0; y < this.size; y++) {
            fieldString += `\n${y + 1} |`;
            for (let x = 0; x < this.size; x++) {
                fieldString += ` ${Game.getPlayerSymbol(this.field[x][y])}`;
            }
        }
        fieldString += '\n```';
        if (this.running) {
            fieldString += `It's your turn, ${
                this.players[this.currentPlayer - 1].username
            }.`;
        }

        return fieldString;
    }

    incrementPlayer() {
        if (this.currentPlayer === 1) {
            this.currentPlayer = 2;
        } else {
            this.currentPlayer = 1;
        }
    }

    refreshState(lastX, lastY) {
        if (this.isWon(lastX, lastY)) {
            this.winner = this.players[this.currentPlayer - 1].username;
            this.running = false;
        } else if (this.isFieldFull()) {
            this.running = false;
        }
    }

    isWon(lastX, lastY) {
        // Go in 4 angles from last position: 0°, 45°, 90°, 135°.
        // For each angle go in one direction until the field is left or the current
        // point is not of the current player anymore. Then go back the other
        // direction and count how many symbols there are in a row.
        let x, y, xStep, yStep, symbolsInRow;
        for (let angle = 0.0; angle < 0.9 * Math.PI; angle += 0.25 * Math.PI) {
            x = lastX;
            y = lastY;
            xStep = Math.round(Math.cos(angle));
            yStep = Math.round(Math.sin(angle));

            while (
                this.isInField(x, y) &&
                this.field[x][y] === this.currentPlayer
            ) {
                x -= xStep;
                y -= yStep;
            }
            x += xStep;
            y += yStep;

            symbolsInRow = 0;
            while (
                this.isInField(x, y) &&
                this.field[x][y] === this.currentPlayer
            ) {
                symbolsInRow++;
                x += xStep;
                y += yStep;
            }

            if (symbolsInRow >= this.symbolsToWin) {
                return true;
            }
        }
        return false;
    }

    isFieldFull() {
        return this.field
            .map((column) => column.every((el) => el !== 0))
            .every((rowIsFull) => rowIsFull === true);
    }

    isInField(x, y) {
        return x >= 0 && x <= this.size - 1 && y >= 0 && y <= this.size - 1;
    }

    static getPlayerSymbol(player) {
        if (player === 1) {
            return 'X';
        } else if (player === 2) {
            return 'O';
        }
        return ' ';
    }

    static findGameByUsers(client, user1, user2) {
        return client.games.find(
            (game) =>
                (game.players[0].id === user1.id &&
                    game.players[1].id === user2.id) ||
                (game.players[0].id === user2.id &&
                    game.players[1].id === user1.id)
        );
    }

    static findGamesByUser(client, user) {
        return client.games.filter((game) =>
            game.players.some((player) => player.id === user.id)
        );
    }

    static deleteGame(client, gameToDelete) {
        client.games = client.games.filter((game) => game !== gameToDelete);
    }
};
