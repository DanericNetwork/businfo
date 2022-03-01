const { MessageActionRow, MessageButton } = require('discord.js');
const { Client, CommandInteraction } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders")
const config = require('../../config.json');
const statsmodel = require('../../models/stats');

module.exports = {
    ...new SlashCommandBuilder()
        .setName("updatemenu")
        .setDescription("Update stats about the bus by pressing buttons")
        .addIntegerOption(option =>
            option.setName('busnum')
              .setDescription('The number of the bus or train')
              .setRequired(true)),

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
    // Checks if author is an admin
    if(!config.admins.includes(interaction.member.id)) return interaction.followUp("You do not have permission to use this command!");

    const busnumber = interaction.options.getInteger('busnum');

    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('pluscurb')
                .setLabel(`+1 curb`)
                .setStyle('PRIMARY'),
        )
        .addComponents(
            new MessageButton()
                .setCustomId('plusdelay')
                .setLabel(`+1 delay`)
                .setStyle('PRIMARY'),
        )
        .addComponents(
            new MessageButton()
                .setCustomId('plusskip')
                .setLabel(`+1 skip`)
                .setStyle('PRIMARY'),
        )
    const row2 = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('mincurb')
                .setLabel(`-1 curb`)
                .setStyle('DANGER'),
        )
        .addComponents(
            new MessageButton()
                .setCustomId('mindelay')
                .setLabel(`-1 delay`)
                .setStyle('DANGER'),
        )
        .addComponents(
            new MessageButton()
                .setCustomId('minskip')
                .setLabel(`-1 skip`)
                .setStyle('DANGER'),
        )

    let totalstats = await statsmodel.findOne(
        {
          id: 'all',
        });

    let busstats = await statsmodel.findOne(
        {
          id: busnumber,
        });

        if (busstats) return interaction.followUp(`Couldn't find ${busnumber} in the database.`);

        // // total new bus stats
        // const newcurb = totalstats.curb + curbs;
        // const newdelay = totalstats.delay + delay;
        // const newskips = totalstats.skips + skips;


        // // new bus stats
        // const newbuscurb = busstats.curb + curbs;
        // const newbusdelay = busstats.delay + delay;
        // const newbusskips = busstats.skips + skips;

        // update total stats
        // await statsmodel.findOneAndUpdate(
        //     {
        //         id: 'all',
        //     },
        //     {
        //       curb: newcurb,
        //       delay: newdelay,
        //       skips: newskips,
        //     },
        //     {
        //       upsert: true,
        //     }
        //   )
        // // update bus stats
        // await statsmodel.findOneAndUpdate(
        //     {
        //         id: busnumber,
        //     },
        //     {
        //       curb: newbuscurb,
        //       delay: newbusdelay,
        //       skips: newbusskips,
        //     },
        //     {
        //       upsert: true,
        //     }
        //   )

    const embed = new MessageEmbed()
    .setColor('#6FADE3')
    .addField(`Curbs Hit`, `1`, true)
    .addField(`Delay`, `**2** minutes`, true)
    .addField(`Skips`, `3`, true)

        interaction.followUp({content: null, embeds: [embed], components: [row, row2]});
            
    },
};
