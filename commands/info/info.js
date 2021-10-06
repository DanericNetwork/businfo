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
        .setColor('#328732')
        .setTitle('Information')
        .setDescription('This bot is maintained by: Daneric#1617 & Frankie#4073\n\nThese stats are collected since 10/5/2021 and are from the busses that we\'ve been in!')
        .setFooter('Bus Bot', client.user.avatarURL());

        message.channel.send({content: null, embeds: [embed] });
    },
};
