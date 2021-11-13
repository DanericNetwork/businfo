const { Client, CommandInteraction } = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "info",
    description: "Information about busbot",
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const embed = new MessageEmbed()
        .setColor('#6FADE3')
        .setTitle('Information')
        .setDescription('This bot is maintained by: Daneric#1617 & Frankie#4073\n\nThese stats are collected since 10/5/2021 and are from the busses that we\'ve been in!')
        await interaction.followUp({ embeds: [embed] });
            
    },
};
