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
        var statscount = await statsmodel.findOne(
            {
              id: 'me',
            });
        const embed = new MessageEmbed()
        .setColor('4FFF33')
        .setTitle('Stats')
        .addField('Total Curbs Hit', `${statscount.curb}`, true)
        .addField("Total Delay", `${statscount.delay} minutes`, true)
        .addField("Total Stops skipped", `${statscount.skips}`, true)
        message.channel.send({content: null, embeds: [embed] });
    },
};
