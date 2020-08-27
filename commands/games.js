const Game = require('../game/game');

module.exports = {
    name: 'games',
    description: 'Displays your running games.',
    aliases: ['g'],
    guildOnly: true,
    execute(message, args) {
        const gamesOfUser = Game.findGamesByUser(message.client, message.author);
        if (gamesOfUser.length === 0) {
            return message.reply('you have no games running.');
        }

        let replyMessage = '```';
        replyMessage += `You have ${gamesOfUser.length} game(s) running\n\n`;
        replyMessage += gamesOfUser
            .map(
                (game) =>
                    `${game.players[0].username} vs ${game.players[1].username}`
            )
            .join('\n');
        replyMessage += '\n```';
        
        message.channel.send(replyMessage);
    }
};
