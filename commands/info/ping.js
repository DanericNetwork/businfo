const { Message, MessageEmbed, Client } = require("discord.js");

module.exports = {
    name: "ping",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const msg = await message.channel.send('Ping?');
        const embed = new MessageEmbed()
        .setColor('4FFF33')
        .setTitle('Connection')
        .addField('Discord', `\`${client.ws.ping}\` ms`, false)
    
        const ping = msg.createdTimestamp - message.createdTimestamp;
    
        embed.addField('Client', `\`${ping}\` ms`, false);
    
        await msg.edit({content: null, embeds: [embed] });
    },
};
