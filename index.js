const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();
const webhookClient = new Discord.WebhookClient(config.webhookID, config.webhookToken);

const prefix = config.prefix;

client.once("ready", () => {
    console.log("Listo para la acción.");
});

client.on("message", function (message) {
    if (!message.member.roles.cache.has(config["announcer-role"]) || !message.content.startsWith(prefix) || message.author.bot) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (command === "hola") {
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`¡Holi! Me tomó ${timeTaken}ms darme cuenta de lo guapo que estás, bombón.`);
    } else if (command == "anunciar") {
        var announcement = "";
        for (const word in args) {
            announcement = announcement + args[word] + " ";
        }
        webhookClient.send(announcement)
    }                  
});

client.login(process.env.BOT_TOKEN);
// client.login(config.token);