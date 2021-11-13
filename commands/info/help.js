const { Message, MessageEmbed, Client } = require("discord.js");
const config = require('../../config.json');

module.exports = {
    name: "help",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const pr = config.prefix;
        const embed = new MessageEmbed()
        .setColor('#6FADE3')
        .setTitle('Information')
        .addField(`Info`, `\`${pr}businfo\`, \`${pr}busses\`, \`${pr}stats\``)
        .addField(`Admins`, `\`${pr}addbus\`, \`${pr}update\``)
        .setFooter('Bus Bot', client.user.avatarURL());

        message.channel.send({content: null, embeds: [embed] });
    },
};
