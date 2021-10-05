const { Client, CommandInteraction } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const config = require('../../config.json');
const statsmodel = require('../../models/stats');

module.exports = {
    name: "stats",
    description: "Get stats about the RRReis busses that we've been in.",
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        var statscount = await statsmodel.findOne(
            {
              id: 'me',
            });
        const user = client.users.cache.get(interaction.member.id);

        const embed = new MessageEmbed()
            .setTitle(`Current bus stats!`)
            .setColor("#07a8f2")
            .setDescription(`These are some stats that we've collected from the RRReis busses!\n*These stats are collected from 10/5/2021 and are from the busses that we've been in!*`)
            .addField("Total Curbs Hit", `${statscount.stoeprand}`, true)
            .addField("Total Delay", `${statscount.vertraging} minutes`, true)
            .setFooter(`${user.username}`, user.avatarURL())

        interaction.followUp({content: null, embeds: [embed] });
            
    },
};
