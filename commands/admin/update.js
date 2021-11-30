const { Message, MessageEmbed, Client } = require("discord.js");
const statsmodel = require('../../models/stats');
const config = require('../../config.json');

module.exports = {
    name: "update",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
      // Checks if author is an admin
  if(!config.admins.includes(message.author.id)) return message.channel.send("You do not have permission to use this command!");
        let statscount = await statsmodel.findOne(
            {
              id: 'all',
            });
            
// Arguments
        const busnumber = parseInt(args[0]);
        const curbs = parseInt(args[1]);
        const delay = parseInt(args[2]);
        const skips = parseInt(args[3]);
        
        let statscountbus = await statsmodel.findOne(
          {
            id: busnumber,
          });
        
        if (!busnumber) return message.channel.send(`Couldn't find ${busnumber} in the database.`);

// Checks

        if(isNaN(curbs)) return message.channel.send("Please enter a valid number of curbs."); // Checks if curbs is a number
        if(isNaN(delay)) return message.channel.send("Please enter a valid delay."); // Checks if delay is a number
        if(isNaN(skips)) return message.channel.send("Please enter a valid number of skips."); // Checks if skips is a number

        const newcurb = statscount.curb + curbs;
        const newdelay = statscount.delay + delay;
        const newskips = statscount.skips + skips;

        const newbuscurb = statscountbus.curb + curbs;
        const newbusdelay = statscountbus.delay + delay;
        const newbusskips = statscountbus.skips + skips;
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
        await statsmodel.findOneAndUpdate(
            {
                id: busnumber,
            },
            {
              curb: newbuscurb,
              delay: newbusdelay,
              skips: newbusskips,
            },
            {
              upsert: true,
            }
          )
          statscount.save();
        const embed = new MessageEmbed()
        .setColor('#6FADE3')
        .setTitle(`Stats Updated for ${busnumber}`)
        .addField('New Total Curbs Hit', `${newcurb}`, true)
        .addField("New Total Delay", `${newdelay} minutes`, true)
        .addField("New Total Skips", `${newskips}`, true)
        .addField(`Bus ${busnumber} Curbs Hit`, `${newbuscurb}`, true)
        .addField(`Bus ${busnumber} Delay`, `${newbusdelay} minutes`, true)
        .addField(`Bus ${busnumber} Skips`, `${newbusskips}`, true)
        message.channel.send({content: null, embeds: [embed] });
    },
};
