const client = require("../index");

client.on("messageCreate", async (message) => {
    if (
        message.author.bot || // Ignore bots
        !message.guild || // Ignore DMs
        !message.content.toLowerCase().startsWith(client.config.prefix) // Ignore messages that don't start with the prefix
    )
        return;

    const [cmd, ...args] = message.content
        .slice(client.config.prefix.length)
        .trim()
        .split(" ");

    const command = client.commands.get(cmd.toLowerCase());

    if (!command) return;
    await command.run(client, message, args);
});
