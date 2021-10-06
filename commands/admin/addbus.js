const { Message, MessageEmbed, Client } = require("discord.js");
const statsmodel = require('../../models/stats');

module.exports = {
    name: "addbus",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        const busnumber = parseInt(args[0]);

        if(isNaN(busnumber)) return message.channel.send("Please enter a valid busnumber.");
          var statscount = await statsmodel.create(
              { 
                  id: busnumber, 
                  curb: 0,
                  delay: 0,
                  skips: 0,
                });
          statscount.save();
        const embed = new MessageEmbed()
        .setColor('#328732')
        .setTitle(`Bus ${busnumber} added!`)
        message.channel.send({content: null, embeds: [embed] });
    },
};
