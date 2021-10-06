const { Message, MessageEmbed, Client } = require("discord.js");
const statsmodel = require('../../models/stats');
const db = require('mongoose');

module.exports = {
    name: "busses",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        var statscount = await statsmodel.findOne(
            {
              id: 'all',
            });
        const shit = await statsmodel.distinct("id")
        const embed = new MessageEmbed()
        .setColor('#328732')
        .setTitle('All Busses')
        .setDescription(`${shit.map(x => `\`${x}\``).join(', ')}`)
        message.channel.send({content: null, embeds: [embed] });
    },
};

