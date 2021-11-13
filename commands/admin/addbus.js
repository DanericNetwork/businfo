const { Message, MessageEmbed, Client } = require("discord.js");
const statsmodel = require('../../models/stats');
const config = require('../../config.json');

module.exports = {
    name: "addbus",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
            // Checks if author is an admin
        if(!config.admins.includes(message.author.id)) return message.channel.send("You do not have permission to use this command!");

        const busnumber = parseInt(args[0]);
        const ovtype = args[1];

        if(isNaN(busnumber)) return message.channel.send("Please enter a valid busnumber."); // Checks if busnumber is a number
        if(!ovtype) return message.channel.send("Please enter a valid ovtype."); // Checks if ovtype is given
        if(!["train", "bus"].includes(ovtype)) return message.channel.send(`Please enter a valid type. Usage: \`${config.prefix}addbus <bus/train number> bus/train\``); // Checks if ovtype is a bus or train
        let statscount = await statsmodel.create(
              { 
                id: busnumber, 
                curb: 0,
                delay: 0,
                skips: 0,
                type: ovtype,
              });
        statscount.save();
        const embed = new MessageEmbed()
        .setColor('#6FADE3')
        .setTitle(`Bus/Train ${busnumber} added!`)
        message.channel.send({content: null, embeds: [embed] });
    },
};
