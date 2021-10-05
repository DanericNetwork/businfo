const { Message, MessageEmbed, Client } = require("discord.js");

module.exports = {
    name: "info",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
        .setColor('4FFF33')
        .setTitle('Information')
        .setDescription('This bot is maintained by: Daneric#1617 & Frankie#4073')

        message.channel.send({content: null, embeds: [embed] });
    },
};
