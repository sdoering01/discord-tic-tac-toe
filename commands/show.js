const Game = require('../game/game');

module.exports = {
    name: 'show',
    description:
        "Shows current game with the mentioned (@) user. You don't have to mention a user if you have only one game running.",
    aliases: ['s'],
    guildOnly: true,
    usage: '[@<user>]',
    execute(message, args) {
        const gamesOfUser = Game.findGamesByUser(
            message.client,
            message.author
        );
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
                return message.reply(
                    `you have no game running with ${opponent.username}.`
                );
            }
        }

        message.channel.send(game.getFieldString());
    }
};
