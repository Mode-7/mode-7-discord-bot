const Discord = require("discord.js");
const cron = require("cron");
// const config = require("./config.json"); // No necesitamos este archivo al hacer deploy en Heroku

const client = new Discord.Client();
const webhookClient = new Discord.WebhookClient(process.env.WEBHOOK_ID, process.env.WEBHOOK_TOKEN);

// ID del GUILD
guildId = process.env.GUILD_ID; // ID del GUILD

// IDs de canales
const announcementChannelId = '664249693601267743'; // Canal de anuncios
const welcomeChannelId = '741028008361721866'; // Canal de bienvenida
const rulesChannelId = '479304179102384128'; // Canal de reglas
const generalChannelId = '478782494666129419'; // Canal general
const offTopicChannelId = '875506827377381456'; // Canal off topic
const comidaChannelId = '602245119344902144'; // Canal de comida
const mariokartChannelId = '478782450806292481'; // Canal Mario Kart
// const ctrChannelId = '731357870364295198'; // Canal Crash Team Racing

// IDs de roles
const jugonNovatoRolId = '806620168939503636'; // Rol de Jugón Novato
const jugonActivoRolId = '728027086157119639'; // Rol de Jugón Activo
const jugonSemiActivoRolId = '806620222228398122'; // Rol de Jugón Semi Activo
const jugonLeyendaRolId = '806620208705568768'; // Rol de Jugón Leyenda

// IDs de ciertos usuarios
const julzUserId = '426098208708624384';

// Prefijo para comandos
const prefix = process.env.PREFIX;

// Bot listo
// client.once("ready", () => {
//     console.log("Estoy listo.");
// });

// Bot listo y Comandos Slash
const getApp = (guildId) => {
    const app = client.api.applications(client.user.id);

    if (guildId) {
        app.guilds(guildId)
    }

    return app;
}

client.once("ready", async () => {
    console.log("Estoy listo.");

    // Regresa todos los comandos (de este guildId en particular)
    const commands = await getApp(guildId).commands.get();
    console.log(commands);

    // Comandos
    await getApp(guildId).commands.post({
        data: {
            name: 'hola',
            description: 'Usa este comando para recibir un saludo del Mode 7 Bot.'
        },
    });

    await getApp(guildId).commands.post({
        data: {
            name: 'uwu',
            description: 'Usa este comando para publicar un hermoso uwu.'
        },
    });

    await getApp(guildId).commands.post({
        data: {
            name: 'encuentra',
            description: 'Este comando te va a decir el miembro de Mode 7 más jugón del momento.'
        },
    });

    await getApp(guildId).commands.post({
        data: {
            name: 'messirve',
            description: 'Usa este comando cuando te sirva algo.'
        },
    });

    await getApp(guildId).commands.post({
        data: {
            name: 'pildora',
            description: '¿Necesitas hacer un volado? Usa este comando para tomar una decisión.'
        },
    });

    await getApp(guildId).commands.post({
        data: {
            name: 'agradecido',
            description: '¿Te sientes agradecido? Usa este comando entonces.'
        },
    });

    await getApp(guildId).commands.post({
        data: {
            name: 'nopos',
            description: '¿Se acabó el tema de conversación? Este es el comando perfecto.'
        },
    });

    await getApp(guildId).commands.post({
        data: {
            name: 'boiler',
            description: 'Solo los que le caen al Mode 7 Grand Prix saben la utilidad de este comando.'
        },
    });

    await getApp(guildId).commands.post({
        data: {
            name: 'adiossuave',
            description: 'Los que juegan en el Mode 7 Grand Prix, saben qué hacer con este comando.'
        },
    });

    await getApp(guildId).commands.post({
        data: {
            name: 'policiajugona-1',
            description: 'Invoca la policía jugona para checar que la raza haya terminado sus juegos.'
        },
    });

    await getApp(guildId).commands.post({
        data: {
            name: 'policiajugona-2',
            description: 'Invoca la policía jugona para checar que la raza haya terminado sus juegos.'
        },
    });

    client.ws.on('INTERACTION_CREATE', async (interaction) => {
        const command = interaction.data.name.toLowerCase();

        switch (command) {
            case "hola":
                const user = client.users.cache.get(interaction.member.user.id);
                reply(interaction, `¡Holi ${user}! Estás bien guap@ y así.`);
                break;
            case "uwu":
                reply(interaction, `<:uwu:806331721754214411>`);
                break;
            case "encuentra":
                const randomUser = client.users.cache.random();
                reply(interaction, `Ahorita el usuario más jugón de Mode 7 es: ${randomUser}`);
                break;
            case "messirve":
                reply(interaction, `https://media1.tenor.com/images/0ded3d37756b480d80ae4fadc8121eac/tenor.gif?itemid=17952557`);
                break;
            case "pildora":
                let coinFlip = () => {
                    let resultCoin = (Math.floor(Math.random() * 2) == 0) ? 'https://i.imgur.com/2kqsZNk.png' : 'https://i.imgur.com/pEDmvdR.png';
                    reply(interaction, resultCoin);
                }
                coinFlip();
                break;
            case "agradecido":
                reply(interaction, `https://i.imgur.com/ASnDi7B.png`);
                break;
            case "nopos":
                reply(interaction, `https://i.imgflip.com/4wugny.jpg`);
                break;
            case "boiler":
                reply(interaction, `https://cdn.discordapp.com/attachments/478782450806292481/812162915674488863/8d7575fecdf184d33f258a3abcfe691a.png`);
                break;
            case "adiossuave":
                reply(interaction, `https://i.imgur.com/pw7eV4Y.jpg`);
                break;
            case "policiajugona-1":
                reply(interaction, `https://i.imgur.com/V0x0iOS.png`);
                break;
            case "policiajugona-2":
                reply(interaction, `https://i.imgur.com/jRYhz7i.png`);
                break;
            default:
        }
    });

    // Método para que el bot conteste comandos
    const reply = (interaction, response) => {
        client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    content: response
                },
            },
        });
    }
});

// Bienvenida usuarios
client.on("guildMemberAdd", (member) => {
    console.log(member);

    const welcomeText = `¡Bienvenid@  <@${member.id}>! 🎉 🤗\nAntes de comenzar, date una vuelta por las ${member.guild.channels.cache.get(rulesChannelId).toString()} y si necesitas ayuda con algo, puedes preguntar en ${member.guild.channels.cache.get(generalChannelId).toString()}.\n\nQue disfrutes de tu estancia en Mode 7.\n\nhttps://www.youtube.com/watch?v=o0kGvgXmmgk`
    const channel = member.guild.channels.cache.get(generalChannelId);

    channel.send(welcomeText);
});

// Comandos públicos y privados con prefijo (?)
client.on("message", (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    // const fotosChawi = [
    //     "https://i.ytimg.com/vi/ugPb9CahqJc/maxresdefault.jpg",
    //     "https://scontent.fymy1-2.fna.fbcdn.net/v/t15.5256-10/p160x160/128624914_880513332721410_4189615889164784461_n.jpg?_nc_cat=109&ccb=2&_nc_sid=08861d&_nc_ohc=Q_VHOZp0_isAX9AYqAx&_nc_ht=scontent.fymy1-2.fna&oh=76d00f5f5330a5bb4b55836ba99bc1f5&oe=6030F311",
    //     "https://i.ytimg.com/vi/0BG64GkXk08/maxresdefault.jpg",
    //     "https://www.segundoasegundo.com/wp-content/uploads/2018/02/5C26F054-0A66-468A-822A-3C2C4CE66A38.jpeg",
    //     "https://scontent.felp1-1.fna.fbcdn.net/v/t1.0-9/117046000_3160858957295426_7318290246267524902_n.jpg?_nc_cat=100&ccb=2&_nc_sid=8bfeb9&_nc_eui2=AeEYkkQHwrrj_fVrzJGeK6E5C_9zwwrFHiUL_3PDCsUeJeVtQfMFst6PZtInjbWqOlI&_nc_ohc=2Ek_H6KTnp0AX9KXM42&_nc_ht=scontent.felp1-1.fna&oh=8e3293ba424215bfbc72bfd5bba5e2dd&oe=6040C991",
    //     "https://scontent.felp1-1.fna.fbcdn.net/v/t1.0-9/103328412_3330621733628992_802055698247855747_n.jpg?_nc_cat=107&ccb=2&_nc_sid=8bfeb9&_nc_eui2=AeFnwFInCw0OG942S3bL3b9_J6aNbhVbSaInpo1uFVtJoh7LKEX26mehgdurW9AjT5w&_nc_ohc=kBPwzKyzKn8AX80FXy8&_nc_ht=scontent.felp1-1.fna&oh=f228b8e0fe76adf14820a2e38caad463&oe=603EE18C",
    //     "https://scontent.felp1-1.fna.fbcdn.net/v/t1.0-9/72870177_2494846527230009_7921490024061730816_n.jpg?_nc_cat=106&ccb=2&_nc_sid=8bfeb9&_nc_eui2=AeGH4mLGxJP1nv_JpNeHC76reQ236LFTrdd5DbfosVOt15IuEmI3C4z9vB4sL_WeX44&_nc_ohc=fFYRqJ-c22UAX-fqGqg&_nc_ht=scontent.felp1-1.fna&oh=b8fc10b4563392ce4c8e7db2555f4c6c&oe=604253E1",
    //     "https://scontent.felp1-1.fna.fbcdn.net/v/t1.0-9/146321923_3646009972113653_8655034765111138461_n.jpg?_nc_cat=101&ccb=2&_nc_sid=e3f864&_nc_eui2=AeEPriJrfIuXEC2fDcjo0T_IKR6k6tqzhqspHqTq2rOGq8FVlffM931dmG8-VPw-Z-g&_nc_ohc=bWhlo8ookTYAX9aLiB5&_nc_ht=scontent.felp1-1.fna&oh=16b5e3671cf5f1408c0da7fe8144fe16&oe=60475E68",
    //     "https://scontent.felp1-1.fna.fbcdn.net/v/t1.0-9/36733025_1746025548778781_6016901332294696960_n.jpg?_nc_cat=101&ccb=2&_nc_sid=174925&_nc_eui2=AeEqUJsuiMnadehUfmnIyZNwKkL1weAiSq8qQvXB4CJKr0tlaLRClhJSpLSXtNbJntY&_nc_ohc=F_SB5lmOy9oAX8nnwrS&_nc_ht=scontent.felp1-1.fna&oh=f704e28ff71ef543db70b0f2991d1e3d&oe=60488E72",
    //     "https://scontent.felp1-1.fna.fbcdn.net/v/t1.0-9/25660083_1543503845697620_495379384778827202_n.jpg?_nc_cat=104&ccb=2&_nc_sid=174925&_nc_eui2=AeFhurrvxGRIRAtI1ScC79XOXrDzFWtF1IdesPMVa0XUh3hpvNH0xd1hTGWuLuW6tjA&_nc_ohc=pD3zKQ37xtkAX_tKGjP&_nc_ht=scontent.felp1-1.fna&oh=ab1fe0739e49f960724ffe4641c4d834&oe=604676F7",
    //     "https://scontent.felp1-1.fna.fbcdn.net/v/t1.0-9/13015204_1009799495734727_762340714370653242_n.jpg?_nc_cat=109&ccb=2&_nc_sid=174925&_nc_eui2=AeFepxATtEgS_0zt20F4lmtaMxipcMDiF-szGKlwwOIX63J-cb-SG49m4R6JIwC55k8&_nc_ohc=BIYZYABZyRIAX-0NDXT&_nc_ht=scontent.felp1-1.fna&oh=91c3923267552c528c067db56a0bbccc&oe=6046AA52",
    //     "https://scontent.felp1-1.fna.fbcdn.net/v/t1.0-9/1920579_768770019837677_2449586166312160575_n.jpg?_nc_cat=107&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeEnHonndgs0aYtaHrBM3tDVJ-ZEiHeWa24n5kSId5ZrbsebLbhSNkeoS_jPE3H-bag&_nc_ohc=jexq48bU0asAX8-_ZaJ&_nc_ht=scontent.felp1-1.fna&oh=39af5f558a380a53a732dffeea2c4f3b&oe=6046C014",
    //     "https://scontent.felp1-1.fna.fbcdn.net/v/t1.0-9/1385444_762232653824747_398874664178689072_n.jpg?_nc_cat=102&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeERa3chLl2CxDX6o1jtiIBCYUESfInSqUlhQRJ8idKpSRh5LGHYZjp8RURHc2UIM2Y&_nc_ohc=CDxQChQWY74AX_IhYpl&_nc_ht=scontent.felp1-1.fna&oh=d868dccec61f953c9a327b2cf7fae9d1&oe=6046EED4",
    //     "https://scontent.felp1-1.fna.fbcdn.net/v/t1.0-9/1459986_610410305673650_1284009300_n.jpg?_nc_cat=108&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeHnuIOw6yU-EYRGoxMLrca6-prgpW4zKin6muClbjMqKaoaPmJqbNmuCtcR89YDzeE&_nc_ohc=xgJEUdXXZBQAX9RgGC3&_nc_ht=scontent.felp1-1.fna&oh=e50e061862d0180eb6a9d5f1cd828c5c&oe=604579E1",
    //     "https://scontent.felp1-1.fna.fbcdn.net/v/t1.0-9/310685_248699498511401_1584787492_n.jpg?_nc_cat=109&ccb=2&_nc_sid=174925&_nc_eui2=AeHfeTMfmBZr57F1SkiOTRUd8oM8FTbasqbygzwVNtqyprs0AN-oxwUJmE_B1xOqdH0&_nc_ohc=uYkNMnOnbt4AX85O-up&_nc_ht=scontent.felp1-1.fna&oh=7b4050501ce81f285a5380a8c84138d6&oe=60474FF2",
    //     "https://scontent.felp1-1.fna.fbcdn.net/v/t1.0-9/378932_287905134590837_1425080768_n.jpg?_nc_cat=106&ccb=2&_nc_sid=174925&_nc_eui2=AeHjYikcsU0s7o6Iaa56Z3ZgSNHpqx0Tp5RI0emrHROnlMl2-VPu3kgRd_7PlKg9EN0&_nc_ohc=EYjQI7kszusAX8j76M7&_nc_ht=scontent.felp1-1.fna&oh=788432f3ceb5ce8b6eda3d015020039c&oe=604523F5"
    // ];

    // const responseChawi = Math.floor(Math.random() * fotosChawi.length);

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    // function comandosPublicos() {
        // switch (command) {
            // case "hola":
            //     const timeTaken = Date.now() - message.createdTimestamp;
            //     message.reply(`¡Holi! Me tomó ${timeTaken}ms darme cuenta de lo guapo que estás, bombón.`);
            //     break;
            // case "uwu":
            //     message.reply(`<:uwu:806331721754214411>`);
            //     break;
            // case "chawi":
            //     message.channel.send(fotosChawi[responseChawi]);
            //     break;
            // case "encuentra":
            //     let user = message.guild.members.cache.random();
            //     message.channel.send(`El usuario más jugón es: ${user.user}`);
            //     break;
            // case "messirve":
            //     message.channel.send(`https://media1.tenor.com/images/0ded3d37756b480d80ae4fadc8121eac/tenor.gif?itemid=17952557`);
            //     break;
            // case "pildora":
            //     function coinFlip() {
            //         let resultCoin = (Math.floor(Math.random() * 2) == 0) ? 'https://i.imgur.com/2kqsZNk.png' : 'https://i.imgur.com/pEDmvdR.png';
            //         message.channel.send(resultCoin);
            //     }
            //     coinFlip();
            //     break;
            // case "agradecido":
            //     message.channel.send(`https://i.imgur.com/ASnDi7B.png`);
            //     break;
            // case "nopos":
            //     message.channel.send(`https://i.imgflip.com/4wugny.jpg`);
            //     break;
            // case "boiler":
            //     message.channel.send(`https://cdn.discordapp.com/attachments/478782450806292481/812162915674488863/8d7575fecdf184d33f258a3abcfe691a.png`);
            //     break;
            // default:
        // }
    // }

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
        // comandosPublicos();
    } else {
        // comandosPublicos();
        comandosPrivados();
    }               
});

// Comandos jugones
client.on("message", (message) => {
    if (message.author.bot) return;

    const palabrasTrigger = [
        "mode 7",
        "Mode 7",
        "mode7",
        "Mode7",
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
        "eso tilín",
        "soñé que Mulaka estaba chido raza 😕",
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
        "¿ya contaste los crt que ha comprado ya Matatán?",
        "jugón se nace, no se hace",
        "pura frase jugona ustedes, se pasan chavos",
        "ahora si que el <:pri:733044345262964837> porteó más",
        "ah prre",
        "súper jugón",
        "jugones, los quiero",
        "jugón aspiro a ser",
        "antes jugón que traer morrita, la neta",
        "jugón, panista e infiel, ¿qué más quieres mami?",
        "detecto una alta cantidad de jugonería aquí",
        "hay tiempos de jugar y tiempos de callar",
        "a ningún jugón le hace daño un fifita",
        "ves que el vato es jugón y le da game pass",
        "ah prro, a punta de puro game pass",
        "no se puede chiflar y ganar en el fortnite al mismo tiempo",
        "¿no que muy jugones? pinches ojetitos",
        "¡ni que fueran enchiladas, prro!",
        "¿lo quieres peladito y en la boca?",
        "con eso te armabas una pc krnal",
        "https://i.imgur.com/6fHfar4.png",
        "ALV XD",
        "https://i.imgur.com/rsUQ6ko.png", // Exceso en jugones
        "¿ya andan jugando cascajo?",
        "jueguen el pelón del don noviembre",
        "https://cdn.discordapp.com/attachments/479071002094075931/965658462518382703/Contina-viendo-los-posts.mp4",
        "puto el que lo lea xD"
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

// Comandos jueves
client.on("message", (message) => {
    if (message.author.bot) return;

    const palabrasTriggerJueves = [
        "jueves",
        "Jueves"
    ];

    const respuestasJugonJueves = [
        "viernes chiquito",
        "jueves de mario karritos ahuevo",
        "día de putazos en mario kart",
        "tgit",
        "¡hoy hay Mode 7 Grand Prix prros!",
        "ánimo mis chingones ya es jueves",
        "puro mario kart y no mamadas alv",
        "siento que arranco la carretera 🎶",
        "échenme esos boilers pues"
    ];

    const responseJugonJueves = Math.floor(Math.random() * respuestasJugonJueves.length);

    const command = message.content;

    for (let i = 0; i < palabrasTriggerJueves.length; i++) {
        if (command.includes(palabrasTriggerJueves[i])) {
            message.channel.send(respuestasJugonJueves[responseJugonJueves]);
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
let buenosDiasMode7 = new cron.CronJob('00 00 7 * * sun-thu', () => {
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
        "https://i.imgur.com/aPag9Uf.jpg",
        "https://i.imgur.com/yur7mbF.jpg",
        "https://i.imgur.com/6dGFzYB.jpg",
        "https://i.imgur.com/m4KIDBi.jpg",
        "https://i.imgur.com/vXFjJhh.jpg",
        "https://i.imgur.com/EVXPq9z.jpg",
        "https://i.imgur.com/Ba8QyWM.jpg",
        "https://i.imgur.com/FCr4AGF.jpg",
        "https://i.imgur.com/ArKPExr.jpg",
        "https://i.imgur.com/4w7LCHI.jpg",
        "Buenos días a todos, en especial, al tío ☢⬆YOHI⬇☢",
        "https://luiscarlospando.com/mode-7-discord/M7_buen_dia.mp4"
    ];

    const responseBuenosDias = Math.floor(Math.random() * imagenesBuenosDias.length);
    let offTopicChannel = client.channels.cache.get(offTopicChannelId);
    offTopicChannel.send(imagenesBuenosDias[responseBuenosDias]);
}, null, false, 'America/Chihuahua');

buenosDiasMode7.start();

let buenosDiasMode7Friday = new cron.CronJob('00 00 7 * * fri', () => {
    const imagenesBuenosDias = [
        "https://i.imgur.com/sjq1GG3.gif",
        "https://i.imgur.com/0vZSgYT.jpg",
        "https://i.imgur.com/3VRfKBS.jpg",
        "https://i.imgur.com/Fcrst4G.gifv",
        "Feliz viernes prros, pásenla chido",
        "Ya es viernes raza, ¡ánimo!",
        "TGIF 🥳🥳🥳",
        "Gracias a Dios es viernes razaaaa",
        "Ya viernes gente, ¿qué van a jugar este fin de semana?",
        "Viernesuki"
    ];

    const responseBuenosDias = Math.floor(Math.random() * imagenesBuenosDias.length);
    let offTopicChannel = client.channels.cache.get(offTopicChannelId);
    offTopicChannel.send(imagenesBuenosDias[responseBuenosDias]);
}, null, false, 'America/Chihuahua');

buenosDiasMode7Friday.start();

let buenosDiasMode7Wknd = new cron.CronJob('00 00 7 * * sat', () => {
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
    let offTopicChannel = client.channels.cache.get(offTopicChannelId);
    offTopicChannel.send(imagenesBuenosDias[responseBuenosDias]);
}, null, false, 'America/Chihuahua');

buenosDiasMode7Wknd.start();

// Mode 7 Grand Prix
let recordarM7GP = new cron.CronJob('00 30 8 * * 4', () => {
    let mariokartChannel = client.channels.cache.get(mariokartChannelId);
    mariokartChannel.send(`¿Ya listos para el #M7GP de hoy mis jugones? https://i.imgur.com/IaODJMn.gif`);
}, null, false, 'America/Chihuahua');

recordarM7GP.start();

let flyerM7GP = new cron.CronJob('00 00 11 * * 4', () => {
    let mariokartChannel = client.channels.cache.get(mariokartChannelId);
    mariokartChannel.send(`Y acuérdense de compartir el flyer, el hashtag y el código del torneo con sus compas.\n\nCódigo: 0746-6549-8155\nLink a este canal: https://discord.gg/U77J5c6\n\nhttps://i.imgur.com/u4ekrdL.png`);
}, null, false, 'America/Chihuahua');

flyerM7GP.start();

// Mode 7 CTR
// let recordarM7CTR = new cron.CronJob('00 30 8 * * 2', () => {
//     let ctrChannel = client.channels.cache.get(ctrChannelId);
//     ctrChannel.send(`¿Ya listos para el desvergue de hoy mis jugones? https://i.imgur.com/IaODJMn.gif`);
// }, null, false, 'America/Chihuahua');

// recordarM7CTR.start();

// Obtener últimos dos mensajes, comparar y empezar el mame
/*
client.on("message", (message) => {
    message.channel.messages.fetch({ limit: 2 }).then(messages => {
        let previous = messages.array()[0];
        let latest = messages.array()[1];

        if (latest.content == previous.content) {
            message.channel.send(`${latest.content}`);
        }
    });
});
*/

// Le cae Marzito de aguafiestas
client.on("message", (message) => {
    if (message.channel.id == announcementChannelId) {
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

// Comandos hermabot
client.on("message", (message) => {
    if (message.author.bot) return;

    const palabrasTrigger = [
        "hermabot",
        "Hermabot",
        "HERMABOT"
    ];

    const respuestasJugon = [
        "¿qué pedo, yo qué?",
        "¿quién me habla?",
        "hermabot, hermano, ya eres mexicano",
        "¿qué pasó?",
        "¿qué onda, qué onda?",
        "soy Suave",
        "tuuuuut",
        "¿qué tranza prros?"
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

// Julz is in da house
// client.on("message", (message) => {
//     if (message.channel.id == comidaChannelId) {
//         if (message.author.bot) return;

//         if (message.mentions.users.some((user) => user.id === julzUserId)) {
//             message.channel.send('https://i.imgur.com/c4ImBHD.jpg');
//         }
//     }
// });

client.on("message", (message) => {
    if (message.channel.id == comidaChannelId) {
        if (message.author.bot) return;

        const palabrasTrigger = [
            "julz",
            "Julz",
            "@julz",
            "@Julz"
        ];

        const command = message.content;

        for (let i = 0; i < palabrasTrigger.length; i++) {
            if (command.includes(palabrasTrigger[i])) {
                message.channel.send('https://i.imgur.com/c4ImBHD.jpg');
                break;
            }
        }
    }
});

// Valiendo barriga
client.on("message", (message) => {
    if (message.author.bot) return;

    const palabrasTrigger = [
        "valiendo barriga",
        "valiendo Barriga",
        "Valiendo barriga",
        "Valiendo Barriga",
        "baliendo barriga",
        "baliendo Barriga",
        "Baliendo barriga",
        "Baliendo Barriga"
    ];

    const command = message.content;

    for (let i = 0; i < palabrasTrigger.length; i++) {
        if (command.includes(palabrasTrigger[i])) {
            message.channel.send('señor verga');
            break;
        }
    }
});

// Frases de Matatán
client.on("message", (message) => {
    if (message.author.bot) return;

    const palabrasTrigger = [
        "Hola, ¿cómo están?",
        "hola, ¿cómo están?",
        "Hola ¿cómo están?",
        "hola ¿cómo están?",
        "Hola, cómo están?",
        "hola, cómo están?",
        "Hola cómo están?",
        "hola cómo están?",
        "Hola cómo están",
        "hola cómo están",
        "Hola, ¿como están?",
        "hola, ¿como están?",
        "Hola ¿como están?",
        "hola ¿como están?",
        "Hola, como están?",
        "hola, como están?",
        "Hola como están?",
        "hola como están?",
        "Hola como están",
        "hola como están",
        "Hola, ¿cómo estan?",
        "hola, ¿cómo estan?",
        "Hola ¿cómo estan?",
        "hola ¿cómo estan?",
        "Hola, cómo estan?",
        "hola, cómo estan?",
        "Hola cómo estan?",
        "hola cómo estan?",
        "Hola cómo estan",
        "hola cómo estan",
        "Hola, ¿como estan?",
        "hola, ¿como estan?",
        "Hola ¿como estan?",
        "hola ¿como estan?",
        "Hola, como estan?",
        "hola, como estan?",
        "Hola como estan?",
        "hola como estan?",
        "Hola como estan",
        "hola como estan",
        "está en gamepass",
        "Está en gamepass",
        "está en game pass",
        "Está en game pass",
        "está en Game Pass",
        "Está en Game Pass",
        "esta en gamepass",
        "Esta en gamepass",
        "esta en game pass",
        "Esta en game pass",
        "esta en Game Pass",
        "Esta en Game Pass",
        "están en gamepass",
        "Están en gamepass",
        "están en game pass",
        "Están en game pass",
        "están en Game Pass",
        "Están en Game Pass",
        "estan en gamepass",
        "Estan en gamepass",
        "estan en game pass",
        "Estan en game pass",
        "estan en Game Pass",
        "Estan en Game Pass",
        "bienvenidos una vez más",
        "Bienvenidos una vez más",
        "bienvenidos una vez mas",
        "Bienvenidos una vez mas"
    ];

    const command = message.content;

    for (let i = 0; i < palabrasTrigger.length; i++) {
        if (command.includes(palabrasTrigger[i])) {
            message.channel.send('<:matatan:691802785913634816>');
            break;
        }
    }
});

// Si Dios quiere
client.on("message", (message) => {
    if (message.author.bot) return;

    const palabrasTrigger = [
        "si Dios quiere",
        "si dios quiere",
        "si Dios kiere",
        "si dios kiere",
        "Si Dios quiere",
        "Si dios quiere",
        "Si Dios kiere",
        "Si dios kiere"
    ];

    const command = message.content;

    for (let i = 0; i < palabrasTrigger.length; i++) {
        if (command.includes(palabrasTrigger[i])) {
            message.channel.send('https://i.imgur.com/F62Cn4E.jpg');
            break;
        }
    }
});

// Puro pendejo usa Joycon
client.on("message", (message) => {
    if (message.author.bot) return;

    const palabrasTrigger = [
        "joy-con",
        "Joy-con",
        "Joy-Con",
        "joy-Con",
        "JOY-CON",
        "joycon",
        "JOYCON",
        "joy con",
        "JOY CON",
        "joycons",
        "JOYCONS",
        "joy cons",
        "JOY CONS",
        "Joycon",
        "Joy Con",
        "JOY CON",
        "Joycons",
        "Joy Cons"
    ];

    const command = message.content;

    for (let i = 0; i < palabrasTrigger.length; i++) {
        if (command.includes(palabrasTrigger[i])) {
            message.channel.send('https://i.imgur.com/eHYWCPU.png');
            break;
        }
    }
});

// client.login(config.token);
client.login(process.env.BOT_TOKEN); // BOT_TOKEN es el Config Var creado en Heroku