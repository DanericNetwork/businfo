const { Message, MessageEmbed, Client } = require("discord.js");
const statsmodel = require('../../models/stats');

module.exports = {
    name: "stats",
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
        const embed = new MessageEmbed()
        .setColor('#328732')
        .setTitle('Stats')
        .setDescription(`These are some stats that we've collected from the RRReis busses!\n*These stats are collected from 10/5/2021 and are from the busses that we've been in!*`)
        .addField('Total Curbs Hit', `${statscount.curb}`, true)
        .addField("Total Delay", `${statscount.delay} minutes`, true)
        .addField("Total Stops skipped", `${statscount.skips}`, true)
        message.channel.send({content: null, embeds: [embed] });
    },
};
