const { Message, MessageEmbed, Client } = require("discord.js");
const statsmodel = require('../../models/stats');

module.exports = {
    name: "businfo",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const busnumber = args[0];
        const yanick = client.users.cache.get('165339399922515968');
        const daneric = client.users.cache.get('244060616686305283');
        const frank = client.users.cache.get('207557174660956160');

        if (!busnumber) { // If no bus number is specified
            return message.channel.send(`${message.author}, you need to specify a bus number.`);
        }

        let statscount = await statsmodel.findOne(
            {
              id: busnumber,
            });
        
        const embed = new MessageEmbed()
        .setColor('#6FADE3')
        .setTitle(`Stats for bus ${busnumber}`)
        
        if(args[0].startsWith('5')){
            embed.setDescription(`These stats are collected by ${yanick.tag}.`)
        } else {
            embed.setDescription(`These stats are collected by ${daneric.tag} & ${frank.tag}`)
        }
        embed.addField(`Bus ${busnumber} Curbs Hit`, `${statscount.curb}`, true)
        embed.addField(`Bus ${busnumber} Delay`, `${statscount.delay} minutes`, true)
        embed.addField(`Bus ${busnumber} Stops skipped`, `${statscount.skips}`, true)
        message.channel.send({content: null, embeds: [embed] });
    },
};
