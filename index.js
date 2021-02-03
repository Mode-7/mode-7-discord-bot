const Discord = require("discord.js");
const cron = require("cron");
// const config = require("./config.json"); // No necesitamos este archivo al hacer deply en Heroku

const client = new Discord.Client();
const webhookClient = new Discord.WebhookClient(process.env.WEBHOOK_ID, process.env.WEBHOOK_TOKEN);

// IDs de canales
const welcomeChannelID = '741028008361721866'; // Canal de bienvenida
const rulesChannelID = '479304179102384128'; // Canal de reglas
const generalChannelID = '478782494666129419'; // Canal general
const mariokartChannelID = '478782450806292481'; // Canal Mario Kart
const ctrChannelID = '731357870364295198'; // Canal Crash Team Racing

// Prefijo para comandos
const prefix = process.env.PREFIX;

// Bot listo
client.once("ready", () => {
    console.log("Estoy listo.");
});

// Bienvenida usuarios
client.on("guildMemberAdd", (member) => {
    console.log(member);

    const welcomeText = `¡Bienvenid@  <@${member.id}>! 🎉 🤗\nAntes de comenzar, te pedimos leer las ${member.guild.channels.cache.get(rulesChannelID).toString()} y si necesitas ayuda con algo, puedes preguntar en ${member.guild.channels.cache.get(generalChannelID).toString()}.\n\nDisfruta de tu estancia en Mode 7.`
    const channel = member.guild.channels.cache.get(welcomeChannelID);

    channel.send(welcomeText);
});

// Comandos públicos y privados con prefijo (?)
client.on("message", (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const fotosChawi = [
        "https://i.ytimg.com/vi/ugPb9CahqJc/maxresdefault.jpg",
        "https://scontent.fymy1-2.fna.fbcdn.net/v/t15.5256-10/p160x160/128624914_880513332721410_4189615889164784461_n.jpg?_nc_cat=109&ccb=2&_nc_sid=08861d&_nc_ohc=Q_VHOZp0_isAX9AYqAx&_nc_ht=scontent.fymy1-2.fna&oh=76d00f5f5330a5bb4b55836ba99bc1f5&oe=6030F311",
        "https://i.ytimg.com/vi/0BG64GkXk08/maxresdefault.jpg",
        "https://lh3.googleusercontent.com/proxy/vyb8zUwxQE1X0ezg2YwA3-BzV-ZJ34ll8QlvdO9bNiew1Pe_AOL69diNFJMvjd4xYs_mCvrqFZ9tsazsWBTvCrv69kIklm1ACAYylA",
        "https://lh3.googleusercontent.com/proxy/PYznHv2pXAhh7M_CIt2xcI0J7lX1l-sEadso_-ivC1E6k5r1O3-fZ5BYxzjbRv9yh8PTjxM-bOn9cs2k0NcfkE_oDUdO35tIU3vyuA",
        "https://www.segundoasegundo.com/wp-content/uploads/2018/02/5C26F054-0A66-468A-822A-3C2C4CE66A38.jpeg"
    ];

    const responseChawi = Math.floor(Math.random() * fotosChawi.length);

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    function comandosPublicos() {
        if (command === "hola") {
            const timeTaken = Date.now() - message.createdTimestamp;
            message.reply(`¡Holi! Me tomó ${timeTaken}ms darme cuenta de lo guapo que estás, bombón.`);
        } else if (command == "uwu") {
            message.reply(`<:uwu:806331721754214411>`);
        } else if (command == "chawi") {
            message.channel.send(fotosChawi[responseChawi]);
        }
    }

    function comandosPrivados() {
        if (command == "anunciar") {
            let announcement = "";
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

// Comandos jugones
client.on("message", (message) => {
    if (message.author.bot) return;

    const palabrasTrigger = [
        "jugón",
        "jugon",
        "jugona",
        "jugones",
        "jugonas"
    ];

    const respuestasJugon = [
        "¿pero qué tan jugón",
        "jugón mis webos",
        "ni eres tan jugón, ¿pa' qué te haces?",
        "ya no te he visto tan jugón",
        "¡ahh jugoncito!",
        "una sesioncita jugona, ¿o qué?",
        "10/10 jugaré otra vez",
        "los pelijuegos no cuentan",
        "¿a ver la boleta? 👀",
        "puro free to play, así que chiste",
        "¿andan jugones o qué?",
        "la pura crema y nata jugona aquí"
    ];

    const responseJugon = Math.floor(Math.random() * respuestasJugon.length);

    const command = message.content;

    for (let i = 0; i < palabrasTrigger.length; i++) {
        if (command.includes(palabrasTrigger[i])) {
            message.channel.send(respuestasJugon[responseJugon]);
            break;
        }
    }
});

// Press F to pay Respects
client.on("message", (message) => {
    if (message.author.bot) return;

    const command = message.content;

    if (command === "f" || command === "F") {
        message.channel.send(`${message.member.user.username} pide "efes" en el chat.`);
    }
});

// Mode 7 Grand Prix
let recordarM7GP = new cron.CronJob('00 30 8 * * 4', () => {
    let mariokartChannel = client.channels.cache.get(mariokartChannelID);
    mariokartChannel.send(`¿Ya listos para el #M7GP de hoy mis jugones? https://i.imgur.com/IaODJMn.gif`);
}, null, false, 'America/Chihuahua');

recordarM7GP.start();

// Mode 7 CTR
let recordarM7CTR = new cron.CronJob('00 30 8 * * 2', () => {
    let ctrChannel = client.channels.cache.get(ctrChannelID);
    ctrChannel.send(`¿Ya listos para el desvergue de hoy mis jugones? https://i.imgur.com/IaODJMn.gif`);
}, null, false, 'America/Chihuahua');

recordarM7CTR.start();

// client.login(config.token);
client.login(process.env.BOT_TOKEN); // BOT_TOKEN es el Config Var creado en Heroku