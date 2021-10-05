const { MessageEmbed } = require("discord.js");
const client = require("../index");
const config = require('../config.json');
const fs = require('fs');
const fetch = require('node-fetch').default;
const pm = require('pretty-ms');
const Discord = require('discord.js');

client.on("ready", async () => {
    console.log(`\x1b[31m[SERVER] \x1b[34m[DISCORD]\x1b[0m Connected as ${client.user.tag}.`);
});
