const { Client, Collection } = require("discord.js");
const mongoose = require("mongoose");
const config = require('./config.json');
const client = new Client({
    intents: 32767,
});
module.exports = client;

const DB_URI = config.mongodb;

mongoose
	.connect(DB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.catch((error) => console.error(error));

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");

// Initializing the project
require("./handler")(client);

client.login(client.config.token);
