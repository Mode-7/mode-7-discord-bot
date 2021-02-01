const Discord = require("discord.js");
// const config = require("./config.json"); // No necesitamos este archivo al hacer deply en Heroku

const client = new Discord.Client();
const webhookClient = new Discord.WebhookClient(process.env.WEBHOOK_ID, process.env.WEBHOOK_TOKEN);

const prefix = process.env.PREFIX;
const welcomeChannelID = "741028008361721866";

client.once("ready", () => {
    console.log("Estoy listo.");
});

client.on("guildMemberAdd", function (member) {
    member.guild.channels.get(welcomeChannelID).send(`¡Bienvenid@ ${member}!  🎉 🤗\nAntes de comenzar, te pedimos leer las #📜│reglas y si necesitas ayuda con algo, puedes preguntar en #💬│general.\n\nDisfruta de tu estancia en Mode 7.`); 
});

client.on("message", function (message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    function comandosPublicos() {
        if (command === "hola") {
            const timeTaken = Date.now() - message.createdTimestamp;
            message.reply(`¡Holi! Me tomó ${timeTaken}ms darme cuenta de lo guapo que estás, bombón.`);
        } else if (command == "uwu") {
            message.reply(`UwU`);
        }
    }

    function comandosPrivados() {
        if (command == "anunciar") {
            var announcement = "";
            for (const word in args) {
                announcement = announcement + args[word] + " ";
            }
            webhookClient.send(announcement)
        }
    }

    if (!message.member.roles.cache.has(process.env["ANNOUNCER_ROLE"])) {
        comandosPublicos();
    } else {
        comandosPublicos();
        comandosPrivados();
    }               
});

// client.login(config.token);
client.login(process.env.BOT_TOKEN); // BOT_TOKEN es el Config Var creado en Heroku