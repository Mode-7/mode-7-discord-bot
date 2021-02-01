const Discord = require("discord.js");
// const config = require("./config.json"); // No necesitamos este archivo al hacer deply en Heroku

const client = new Discord.Client();
const webhookClient = new Discord.WebhookClient(process.env.WEBHOOK_ID, process.env.WEBHOOK_TOKEN);

const prefix = process.env.PREFIX;

client.once("ready", () => {
    console.log("Estoy listo.");
});

client.on("message", function (message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (command === "hola") {
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`¡Holi! Me tomó ${timeTaken}ms darme cuenta de lo guapo que estás, bombón.`);
    } else if (command == "uwu") {
        message.reply(`UwU`);
    } else if (message.member.roles.cache.has(process.env["ANNOUNCER_ROLE"])) {
        if (command == "anunciar") {
            var announcement = "";
            for (const word in args) {
                announcement = announcement + args[word] + " ";
            }
            webhookClient.send(announcement)
        }
    }                  
});

// client.login(config.token);
client.login(process.env.BOT_TOKEN); // BOT_TOKEN es el Config Var creado en Heroku