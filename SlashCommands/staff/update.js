const { Client, CommandInteraction } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders")
const config = require('../../config.json');
const statsmodel = require('../../models/stats');

module.exports = {
    ...new SlashCommandBuilder()
        .setName("update")
        .setDescription("Get stats about the RRReis busses that we've been in.")

        .addIntegerOption(option =>
          option.setName('busnum')
            .setDescription('The number of the bus or train')
            .setRequired(true))
        .addIntegerOption(option =>
          option.setName('curbs')
            .setDescription('The amount of curbs the bus hit')
            .setRequired(true))
        .addIntegerOption(option =>
          option.setName('delay')
            .setDescription('The amount of delay the bus had')
            .setRequired(true))
        .addIntegerOption(option =>
          option.setName('skips')
            .setDescription('The amount of stops the bus skipped')
            .setRequired(true)),

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
    const curbs = interaction.options.getInteger('curbs');
    const delay = interaction.options.getInteger('delay');
    const skips = interaction.options.getInteger('skips');
    let totalstats = await statsmodel.findOne(
        {
          id: 'all',
        });

    let busstats = await statsmodel.findOne(
        {
          id: busnumber,
        });

        // total new bus stats
        const newcurb = totalstats.curb + curbs;
        const newdelay = totalstats.delay + delay;
        const newskips = totalstats.skips + skips;


        // new bus stats
        const newbuscurb = busstats.curb + curbs;
        const newbusdelay = busstats.delay + delay;
        const newbusskips = busstats.skips + skips;

        // update total stats
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
        // update bus stats
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

    const embed = new MessageEmbed()
    .setColor('#6FADE3')
    .setTitle(`Stats Updated for ${busnumber}`)
    .addField(`Bus ${busnumber} Curbs Hit`, `${newbuscurb}`, true)
    .addField(`Bus ${busnumber} Delay`, `${newbusdelay} minutes`, true)
    .addField(`Bus ${busnumber} Skips`, `${newbusskips}`, true)

        interaction.followUp({content: null, embeds: [embed] });
            
    },
};
