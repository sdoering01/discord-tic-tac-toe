const Game = require('../game/game');
const { prefix } = require('../config.json');

module.exports = {
    name: 'challenge',
    description:
        "Starts a game with the user you mention (@) in the message. The default value for `size` and `symbols to win` is 3.",
    aliases: ['c'],
    guildOnly: true,
    usage: '[<size>] [<symbols to win>] @<user>',
    cooldown: 10,
    execute(message, args) {
        const challenger = message.author;
        const opponent = message.mentions.users.first();
        if (!opponent) {
            return message.reply('you need to mention (@) a user you want to challenge.');
        }

        let size = 3;
        let symbolsToWin = 3;
        if (args.length >= 1) {
            if (isNaN(args[0])) {
                return message.reply(
                    'you need to only provide numbers for the size.'
                );
            }
            size = parseInt(args[0]);
            if (size < 3 || size > 9) {
                return message.reply('the size has to be between 3 and 9.');
            }
        }
        if (args.length >= 2) {
            if (isNaN(args[1])) {
                return message.reply(
                    'you need to only provide numbers for the symbols to win.'
                );
            }
            symbolsToWin = parseInt(args[1]);
            if (symbolsToWin < 3 || symbolsToWin > size) {
                return message.reply(
                    'symbols to win have to be between 3 and the size.'
                );
            }
        }

        const existingGame = Game.findGameByUsers(
            message.client,
            challenger,
            opponent
        );
        if (existingGame) {
            Game.deleteGame(message.client, existingGame);
            message.channel.send('Old game has been deleted!');
        }

        const newGame = new Game(size, symbolsToWin, challenger, opponent);
        message.client.games.push(newGame);
        message.channel.send(
            'Game has been started\n' + newGame.getFieldString()
        );
    }
};
