module.exports = {
    name: 'turn',
    description: 'Tries to place a symbol at the given position',
    aliases: ['t'],
    guildOnly: true,
    usage: '<x index> <y index>',
    cooldown: 2,
    execute(message, args) {
        if (args.length !== 2) {
            return message.reply('you need to provide a x and a y index.');
        }
        if (isNaN(args[0]) || isNaN(args[1])) {
            return message.reply('you need to only provide numbers.');
        }

        const game = message.client.game;
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
                message.channel.send('It\'s a draw.');
            }
        }
    }
};
