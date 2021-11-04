const { Client, CommandInteraction } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders")
const config = require('../../config.json');
const statsmodel = require('../../models/stats');

module.exports = {
    ...new SlashCommandBuilder()
        .setName("addbus")
        .setDescription("Get stats about the RRReis busses that we've been in.")

        .addIntegerOption(option =>
          option.setName('busnum')
            .setDescription('The number of the bus or train')
            .setRequired(true))
            
        .addStringOption(option =>
          option.setName('ovtype')
            .setDescription('Bus or Train')
            .setRequired(true)
            .addChoice('Bus', 'bus')
            .addChoice('Train', 'train')),

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
    // Checks if author is an admin
    if(!config.admins.includes(interaction.member.id)) returninteraction.followUp("You do not have permission to use this command!");

    const busnumber = interaction.options.getInteger('busnum');
    const ovtype = interaction.options.getString('ovtype');

    if(isNaN(busnumber)) return interaction.followUp("Please enter a valid busnumber."); // Checks if busnumber is a number
    if(!ovtype) return interaction.followUp("Please enter a valid ovtype."); // Checks if ovtype is given
    if(!["train", "bus"].includes(ovtype)) return interaction.followUp(`Please enter a valid type. Usage: \`${config.prefix}addbus <bus/train number> bus/train\``); // Checks if ovtype is a bus or train
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
        .setColor('#328732')
        .setTitle(`Bus/Train ${busnumber} added!`)

        interaction.followUp({content: null, embeds: [embed] });
            
    },
};
