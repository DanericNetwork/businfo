const { Message, MessageEmbed, Client } = require("discord.js");
const statsmodel = require('../../models/stats');

module.exports = {
    name: "update",
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

        const curbs = parseInt(args[0]);
        const delay = parseInt(args[1]);
        const skips = parseInt(args[2]);

        if(isNaN(curbs)) return message.channel.send("Please enter a valid number of curbs.");
        if(isNaN(delay)) return message.channel.send("Please enter a valid delay.");
        if(isNaN(skips)) return message.channel.send("Please enter a valid number of skips.");

        const newcurb = statscount.curb + curbs;
        const newdelay = statscount.delay + delay;
        const newskips = statscount.skips + skips;
        await statsmodel.findOneAndUpdate(
            {
                id: 'all',
            },
            {
              curb: newcurb,
              delay: newdelay,
              skips: newskips,
            },
            {
              upsert: true,
            }
          )
          statscount.save();
        const embed = new MessageEmbed()
        .setColor('4FFF33')
        .setTitle('Stats Updated')
        .addField('New Total Curbs Hit', `${newcurb}`, true)
        .addField("New Total Delay", `${newdelay} minutes`, true)
        .addField("New Total Skips", `${newskips}`, true)
        message.channel.send({content: null, embeds: [embed] });
    },
};
