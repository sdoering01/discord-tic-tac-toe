const Game = require('../game/game');

module.exports = {
    name: 'restart',
    description: 'Restarts the current game.',
    guildOnly: true,
    cooldown: 15,
    execute(message, args) {
        message.client.game = new Game(3, 3);
        message.channel.send(
            'Game has been restarted\n' + message.client.game.getFieldString()
        );
    }
};
