const { Client, CommandInteraction } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const statsmodel = require('../../models/stats');

module.exports = {
    name: "buslist",
    description: "The list of all the busses",
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        let statscount = await statsmodel.findOne(
            {
              id: 'all',
            });
        const shit = await statsmodel.find()
        const transport = shit.map(x => `\`${x.id} - ${x.type}\``).join('\n');
        const embed = new MessageEmbed()
        .setColor('#6FADE3')
        .setTitle('All Busses/Trains')
        .setDescription(`${transport}`)
        await interaction.followUp({ embeds: [embed] });
            
    },
};
