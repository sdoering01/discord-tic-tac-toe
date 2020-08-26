const Game = require('../game/game');

module.exports = {
    name: 'turn',
    description:
        'Makes a turn at the given position of the game with the user you mention (@). You don\'t have to mention a user if you have only one game running.',
    aliases: ['t'],
    guildOnly: true,
    usage: '<x index> <y index> [@<user>]',
    cooldown: 2,
    execute(message, args) {
        const gamesOfUser = Game.findGamesByUser(message.client, message.author);
        let game;
        const opponent = message.mentions.users.first();

        if (gamesOfUser.length === 0) {
            return message.reply('you have no games running.');
        } else if (gamesOfUser.length === 1 && !opponent) {
            game = gamesOfUser[0];
        } else {
            if (!opponent) {
                return message.reply(
                    'you have more than one game running. Mention (@) your opponent.'
                );
            }

            game = gamesOfUser.find((game) =>
                game.players.some((player) => player.id === opponent.id)
            );
            if (!game) {
                return message.reply(`you have no game running with ${opponent.username}.`);
            }
        }

        if (game.players[game.currentPlayer - 1].id !== message.author.id) {
            return message.reply("it's not your turn, be patient!");
        }

        if (args.length !== 2) {
            return message.reply('you need to provide only x and y index apart from the mention (@).');
        }
        if (isNaN(args[0]) || isNaN(args[1])) {
            return message.reply('you need to only provide numbers for x and y index.');
        }

        const x = parseInt(args[0]) - 1;
        const y = parseInt(args[1]) - 1;

        if (!game.running) {
            return message.reply('this game is over.');
        }

        if (!game.isInField(x, y)) {
            return message.reply('that position is not in the field.');
        }

        if (!game.makeTurn(x, y)) {
            return message.reply('that position is already occupied.');
        }

        message.channel.send(game.getFieldString());

        if (!game.running) {
            if (game.winner) {
                message.channel.send(`${game.winner} won the game!`);
            } else {
                message.channel.send("It's a draw.");
            }
            Game.deleteGame(message.client, game);
        }
    }
};
