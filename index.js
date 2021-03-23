const Discord = require("discord.js");
const cron = require("cron");
// const config = require("./config.json"); // No necesitamos este archivo al hacer deploy en Heroku

const client = new Discord.Client();
const webhookClient = new Discord.WebhookClient(process.env.WEBHOOK_ID, process.env.WEBHOOK_TOKEN);

// IDs de canales
const announcementChannelID = '664249693601267743'; // Canal de anuncios
const welcomeChannelID = '741028008361721866'; // Canal de bienvenida
const rulesChannelID = '479304179102384128'; // Canal de reglas
const generalChannelID = '478782494666129419'; // Canal general
const mariokartChannelID = '478782450806292481'; // Canal Mario Kart
const ctrChannelID = '731357870364295198'; // Canal Crash Team Racing

// IDs de roles
const jugonNovatoRolID = '806620168939503636'; // Rol de Jugón Novato
const jugonActivoRolID = '728027086157119639'; // Rol de Jugón Activo
const jugonSemiActivoRolID = '806620222228398122'; // Rol de Jugón Semi Activo
const jugonLeyendaRolID = '806620208705568768'; // Rol de Jugón Leyenda

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

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    function comandosPublicos() {
        switch (command) {
            case "hola":
                const timeTaken = Date.now() - message.createdTimestamp;
                message.reply(`¡Holi! Me tomó ${timeTaken}ms darme cuenta de lo guapo que estás, bombón.`);
                break;
            case "uwu":
                message.reply(`<:uwu:806331721754214411>`);
                break;
            case "encuentra":
                let user = message.guild.members.cache.random();
                message.channel.send(`El usuario más jugón es: ${user.user}`);
                break;
            case "messirve":
                message.channel.send(`https://media1.tenor.com/images/0ded3d37756b480d80ae4fadc8121eac/tenor.gif?itemid=17952557`);
                break;
            case "pildora":
                function coinFlip() {
                    let resultCoin = (Math.floor(Math.random() * 2) == 0) ? 'https://i.imgur.com/2kqsZNk.png' : 'https://i.imgur.com/pEDmvdR.png';
                    message.channel.send(resultCoin);
                }
                coinFlip();
                break;
            case "agradecido":
                message.channel.send(`https://i.imgur.com/ASnDi7B.png`);
                break;
            case "nopos":
                message.channel.send(`https://i.imgflip.com/4wugny.jpg`);
                break;
            case "boiler":
                message.channel.send(`https://cdn.discordapp.com/attachments/478782450806292481/812162915674488863/8d7575fecdf184d33f258a3abcfe691a.png`);
                break;
            default:
        }
    }

    function comandosPrivados() {
        switch (command) {
            case "anunciar":
                let announcement = "";
                for (const word in args) {
                    announcement = announcement + args[word] + " ";
                }
                webhookClient.send(announcement)
                break;
            default:
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
        "jugonas",
        "Jugón",
        "Jugon",
        "Jugona",
        "Jugones",
        "Jugonas"
    ];

    const respuestasJugon = [
        "¿pero qué tan jugón?",
        "jugón mis webos",
        "ni eres tan jugón, ¿pa' qué te haces?",
        "ya no te he visto tan jugón",
        "¡ah, jugoncito!",
        "una sesioncita jugona, ¿o qué?",
        "10/10 jugaré otra vez",
        "los pelijuegos no cuentan",
        "¿a ver la boleta? 👀",
        "puro free to play, así que chiste",
        "¿andamos jugones o qué?",
        "la pura crema y nata jugona aquí",
        "yo si te saco los negros más negros",
        "Lord Jugón",
        "jugón se nace, no se hace",
        "pura frase jugona ustedes, se pasan chavos",
        "ahora si que el <:pri:733044345262964837> porteó más",
        "ah prre",
        "https://i.imgur.com/6fHfar4.png"
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

// Buenos días Mode 7
let buenosDiasMode7 = new cron.CronJob('00 00 7 * * *', () => {
    const imagenesBuenosDias = [
        "https://i.imgur.com/Ix4QCXt.jpg",
        "https://i.imgur.com/YK4c25w.jpg",
        "https://i.imgur.com/aXU1qlR.jpg",
        "https://i.imgur.com/fhaRzth.jpg",
        "https://i.imgur.com/cz6DExV.jpg",
        "https://i.imgur.com/0mJq7mi.jpg",
        "https://i.imgur.com/ae42GWg.jpg",
        "https://i.imgur.com/hBuRXSv.jpg",
        "https://i.imgur.com/GVGnorT.jpg",
        "https://i.imgur.com/lEFOLdu.jpg",
        "https://i.imgur.com/pDcNHy4.jpg",
        "Buenos días a todos, en especial, al tío ☢⬆YOHI⬇☢"
    ];

    const responseBuenosDias = Math.floor(Math.random() * imagenesBuenosDias.length);
    let generalChannel = client.channels.cache.get(generalChannelID);
    generalChannel.send(imagenesBuenosDias[responseBuenosDias]);
}, null, false, 'America/Chihuahua');

buenosDiasMode7.start();

// Mode 7 Grand Prix
let recordarM7GP = new cron.CronJob('00 30 8 * * 4', () => {
    let mariokartChannel = client.channels.cache.get(mariokartChannelID);
    mariokartChannel.send(`¿Ya listos para el #M7GP de hoy mis jugones? https://i.imgur.com/IaODJMn.gif`);
}, null, false, 'America/Chihuahua');

recordarM7GP.start();

let flyerM7GP = new cron.CronJob('00 00 11 * * 4', () => {
    let mariokartChannel = client.channels.cache.get(mariokartChannelID);
    mariokartChannel.send(`Y acuérdense de compartir el flyer y el código del torneo con sus compas.\n\nCódigo: 0746-6549-8155\nLink a este canal: https://discord.gg/U77J5c6\n\nhttps://i.imgur.com/qjQs9rq.png`);
}, null, false, 'America/Chihuahua');

flyerM7GP.start();

// Mode 7 CTR
let recordarM7CTR = new cron.CronJob('00 30 8 * * 2', () => {
    let ctrChannel = client.channels.cache.get(ctrChannelID);
    ctrChannel.send(`¿Ya listos para el desvergue de hoy mis jugones? https://i.imgur.com/IaODJMn.gif`);
}, null, false, 'America/Chihuahua');

recordarM7CTR.start();

// Obtener últimos dos mensajes, comparar y empezar el mame
lient.on("message", (message) => {
    message.channel.messages.fetch({ limit: 2 }).then(messages => {
        let previous = messages.array()[0];
        let latest = messages.array()[1];

        if (latest.content == previous.content) {
            message.channel.send(`${latest.content}`);
        }
    });
});

// Le cae Marzito de aguafiestas
client.on("message", (message) => {
    if (message.channel.id == announcementChannelID) {
        if (message.author.bot) return;

        message.channel.send(`https://i.imgur.com/PpkWAud.png`);
    }
});

// Autoresponse PALA
client.on("message", (message) => {
    if (message.author.bot) return;

    const palabrasTrigger = [
        "facebook",
        "Facebook"
    ];

    const command = message.content;

    for (let i = 0; i < palabrasTrigger.length; i++) {
        if (command.includes(palabrasTrigger[i])) {
            message.channel.send('https://i.imgur.com/AmxiHj1.png');
            break;
        }
    }
});

// client.login(config.token);
client.login(process.env.BOT_TOKEN); // BOT_TOKEN es el Config Var creado en Heroku