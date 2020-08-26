const Game = require('../game/game');

module.exports = {
    name: 'games',
    description: 'Displays your running games.',
    aliases: ['g'],
    guildOnly: true,
    execute(message, args) {
        const games = Game.findGamesByUser(message.client, message.author);
        if (games.length === 0) {
            return message.reply('you have no games running.');
        }

        let replyMessage = '```';
        replyMessage += `You have ${games.length} game(s) running\n\n`;
        replyMessage += games
            .map(
                (game) =>
                    `${game.players[0].username} vs ${game.players[1].username}`
            )
            .join('\n');
        replyMessage += '\n```';
        
        message.channel.send(replyMessage);
    }
};
