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
        let statscount = await statsmodel.findOne(
            {
              id: 'all',
            });
        const shit = await statsmodel.find()
        const transport = shit.map(x => `\`${x.id} - ${x.type}\``).join('\n');
        const embed = new MessageEmbed()
        .setColor('#6FADE3')
        .setTitle('All Busses/Trains')
        .setDescription(`${transport}`)
        message.channel.send({content: null, embeds: [embed] });
    },
};

