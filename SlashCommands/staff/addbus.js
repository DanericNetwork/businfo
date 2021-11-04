const { Client, CommandInteraction } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const config = require('../../config.json');
const statsmodel = require('../../models/stats');

module.exports = {
    name: "addbus2",
    description: "Get stats about the RRReis busses that we've been in.",
    options: [
        {
          type: 3,
          name: "busnumber",
          description: "busnummer",
          required: true
        },
        {
          type: 3,
          name: "BusTrain",
          description: "Bus or Train",
          choices: [
            {
              name: "bus",
              value: "bus"
            },
            {
              name: "train",
              value: "train"
            }
          ],
          required: true
        }
      ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
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

        const user = client.users.cache.get(interaction.member.id);

        const embed = new MessageEmbed()
            .setTitle(`Current bus stats!`)
            .setColor("#328732")
            .setDescription(`These are some stats that we've collected from the RRReis busses!\n*These stats are collected from 10/5/2021 and are from the busses that we've been in!*`)
            .addField("Total Curbs Hit", `${statscount.curb}`, true)
            .addField("Total Delay", `${statscount.delay} minutes`, true)
            .addField("Total Stops skipped", `${statscount.skips}`, true)
            .setFooter(`${user.username}`, user.avatarURL())

        interaction.followUp({content: null, embeds: [embed] });
            
    },
};
