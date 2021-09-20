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
              id: 'me',
            });

        const curbs = parseInt(args[0]);
        const delay = parseInt(args[1]);

        if(isNaN(curbs)) return message.channel.send("Please enter a valid number of curbs.");
        if(isNaN(delay)) return message.channel.send("Please enter a valid delay.");

        const newcurb = statscount.stoeprand + curbs;
        const newdelay = statscount.vertraging + delay;
        await statsmodel.findOneAndUpdate(
            {
                id: 'me',
            },
            {
              stoeprand: newcurb,
              vertraging: newdelay,
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
        message.channel.send({content: null, embeds: [embed] });
    },
};
