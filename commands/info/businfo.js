const { Message, MessageEmbed, Client } = require("discord.js");
const statsmodel = require('../../models/stats');

module.exports = {
    name: "businfo",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const busnumber = args[0];
        var statscount = await statsmodel.findOne(
            {
              id: busnumber,
            });
        const embed = new MessageEmbed()
        .setColor('#328732')
        .setTitle(`Stats for bus ${busnumber}`)
        .setDescription(`These are some stats that we've collected from the RRReis busses!\n*These stats are collected from 10/5/2021 and are from the busses that we've been in!*`)
        .addField('Total Curbs Hit', `${statscount.curb}`, true)
        .addField("Total Delay", `${statscount.delay} minutes`, true)
        .addField("Total Stops skipped", `${statscount.skips}`, true)
        message.channel.send({content: null, embeds: [embed] });
    },
};
