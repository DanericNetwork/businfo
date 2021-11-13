const { Client, CommandInteraction } = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    description: "returns websocket ping",
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const embed2 = new MessageEmbed()
        .setColor('#6FADE3')
        .setTitle('Ping?')
        await interaction.followUp({ embeds: [embed2] });

        const embed = new MessageEmbed()
        .setColor('#6FADE3')
        .setTitle(`Connection`)
        .addField('Discord', `\`${client.ws.ping}\` ms`, false);
    
        await interaction.editReply({content: null, embeds: [embed] });
            
    },
};
