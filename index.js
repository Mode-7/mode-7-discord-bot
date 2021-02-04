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

    const fotosChawi = [
        "https://i.ytimg.com/vi/ugPb9CahqJc/maxresdefault.jpg",
        "https://scontent.fymy1-2.fna.fbcdn.net/v/t15.5256-10/p160x160/128624914_880513332721410_4189615889164784461_n.jpg?_nc_cat=109&ccb=2&_nc_sid=08861d&_nc_ohc=Q_VHOZp0_isAX9AYqAx&_nc_ht=scontent.fymy1-2.fna&oh=76d00f5f5330a5bb4b55836ba99bc1f5&oe=6030F311",
        "https://i.ytimg.com/vi/0BG64GkXk08/maxresdefault.jpg",
        "https://www.segundoasegundo.com/wp-content/uploads/2018/02/5C26F054-0A66-468A-822A-3C2C4CE66A38.jpeg",
        "https://scontent.felp1-1.fna.fbcdn.net/v/t1.0-9/117046000_3160858957295426_7318290246267524902_n.jpg?_nc_cat=100&ccb=2&_nc_sid=8bfeb9&_nc_eui2=AeEYkkQHwrrj_fVrzJGeK6E5C_9zwwrFHiUL_3PDCsUeJeVtQfMFst6PZtInjbWqOlI&_nc_ohc=2Ek_H6KTnp0AX9KXM42&_nc_ht=scontent.felp1-1.fna&oh=8e3293ba424215bfbc72bfd5bba5e2dd&oe=6040C991",
        "https://scontent.felp1-1.fna.fbcdn.net/v/t1.0-9/103328412_3330621733628992_802055698247855747_n.jpg?_nc_cat=107&ccb=2&_nc_sid=8bfeb9&_nc_eui2=AeFnwFInCw0OG942S3bL3b9_J6aNbhVbSaInpo1uFVtJoh7LKEX26mehgdurW9AjT5w&_nc_ohc=kBPwzKyzKn8AX80FXy8&_nc_ht=scontent.felp1-1.fna&oh=f228b8e0fe76adf14820a2e38caad463&oe=603EE18C",
        "https://scontent.felp1-1.fna.fbcdn.net/v/t1.0-9/72870177_2494846527230009_7921490024061730816_n.jpg?_nc_cat=106&ccb=2&_nc_sid=8bfeb9&_nc_eui2=AeGH4mLGxJP1nv_JpNeHC76reQ236LFTrdd5DbfosVOt15IuEmI3C4z9vB4sL_WeX44&_nc_ohc=fFYRqJ-c22UAX-fqGqg&_nc_ht=scontent.felp1-1.fna&oh=b8fc10b4563392ce4c8e7db2555f4c6c&oe=604253E1"
    ];

    const responseChawi = Math.floor(Math.random() * fotosChawi.length);

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
            case "chawi":
                message.channel.send(fotosChawi[responseChawi]);
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
        "jugonas"
    ];

    const respuestasJugon = [
        "¿pero qué tan jugón?",
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
client.on("message", (message) => {
    message.channel.messages.fetch({ limit: 2 }).then(messages => {
        let previous = messages.array()[0];
        let latest = messages.array()[1];

        if (latest.content == previous.content) {
            message.channel.send(`${latest.content}`);
        }
    });
});

// client.login(config.token);
client.login(process.env.BOT_TOKEN); // BOT_TOKEN es el Config Var creado en Heroku