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
        const yanick = client.users.cache.get('165339399922515968');
        var statscount = await statsmodel.findOne(
            {
              id: busnumber,
            });
        const embed = new MessageEmbed()
        .setColor('#328732')
        .setTitle(`Stats for bus ${busnumber}`)
        if(args[0] == "5737"){
            embed.setDescription(`These stats of bus 5737 are collected by ${yanick.tag}.`)
        } else {
        embed.setDescription(`These are some stats that we've collected from the RRReis busses!\n*These stats are collected from 10/5/2021 and are from the busses that we've been in!*`)
        }
        embed.addField('Total Curbs Hit', `${statscount.curb}`, true)
        embed.addField("Total Delay", `${statscount.delay} minutes`, true)
        embed.addField("Total Stops skipped", `${statscount.skips}`, true)
        message.channel.send({content: null, embeds: [embed] });
    },
};
