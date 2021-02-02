const Discord = require("discord.js");
// const config = require("./config.json"); // No necesitamos este archivo al hacer deply en Heroku

const client = new Discord.Client();
const webhookClient = new Discord.WebhookClient(process.env.WEBHOOK_ID, process.env.WEBHOOK_TOKEN);
welcomeChannelID = '741028008361721866'; // Canal de bienvenida
rulesChannelID = '479304179102384128'; // Canal de reglas
generalChannelID = '478782494666129419'; // Canal general

const prefix = process.env.PREFIX;

client.once("ready", () => {
    console.log("Estoy listo.");
});

// Bienvenida usuarios
client.on("guildMemberAdd", function (member) {
    console.log(member);

    const welcomeText = `¡Bienvenid@  <@${member.id}>! 🎉 🤗\nAntes de comenzar, te pedimos leer las ${member.guild.channels.cache.get(rulesChannelID).toString()} y si necesitas ayuda con algo, puedes preguntar en ${member.guild.channels.cache.get(generalChannelID).toString()}.\n\nDisfruta de tu estancia en Mode 7.`
    const channel = member.guild.channels.cache.get(welcomeChannelID);

    channel.send(welcomeText);
});

// Comandos públicos y privados con prefijo (?)
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

// Press F to pay Respects
client.on("message", function (message) {
    if (message.author.bot) return;

    const command = message.content;

    if (command === "f" || command === "F") {
        message.channel.send(`${message.guild.member.id} has paid respect.`);
    }
});

// client.login(config.token);
client.login(process.env.BOT_TOKEN); // BOT_TOKEN es el Config Var creado en Heroku