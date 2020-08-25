module.exports = {
    name: 'show',
    description: 'Shows current game field',
    aliases: ['field'],
    guildOnly: true,
    execute(message, args) {
        message.channel.send(message.client.game.getFieldString());
    }
};
