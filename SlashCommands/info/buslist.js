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
        const busses = await statsmodel.find({ type: 'bus' })
        const bus = busses.map(x => `\`${x.id}\``).join(', ');

        const trains = await statsmodel.find({ type: 'train' });
        const train = trains.map(x => `\`${x.id}\``).join(', ');
        const embed = new MessageEmbed()
        .setColor('#6FADE3')
        .setTitle('All Busses/Trains')
        .addField(`Busses`, bus)
        .addField(`Trains`, train)
        await interaction.followUp({ embeds: [embed] });
            
    },
};
