const { Message, MessageEmbed, Client } = require("discord.js");
const statsmodel = require('../../models/stats');

module.exports = {
    name: "stats",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        var statscount = await statsmodel.findOne(
            {
              id: 'me',
            });
        const embed = new MessageEmbed()
        .setColor('4FFF33')
        .setTitle('Stats')
        .addField('Stoeprandjes', `\`${statscount.stoeprand}\``, false)
        message.channel.send({content: null, embeds: [embed] });
    },
};
