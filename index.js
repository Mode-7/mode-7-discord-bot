const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const cron = require('cron');

//DEBUG
const debugEnabled = false;

// Create a new client instance and specify needed intents
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Guild ID
const guild = guildId; // ID del Guild Local
//const guild = process.env.GUILD_ID; // ID del Guild Remoto

// IDs de canales
const announcementChannelId = '664249693601267743'; // Canal de anuncios
const welcomeChannelId = '478777821976723487'; // Canal de bienvenida
const rulesChannelId = '479304179102384128'; // Canal de reglas
const generalChannelId = '875506827377381456'; // Canal general
const gamingGeneralChannelId = '478782494666129419'; // Canal gaming general
const helpChannelId = '973608999410872400'; // Canal de ayuda
const comidaChannelId = '602245119344902144'; // Canal de comida
const mariokartChannelId = '478782450806292481'; // Canal Mario Kart
const ctrChannelId = '731357870364295198'; // Canal Crash Team Racing

// IDs de roles
const jugonNovatoRolId = '806620168939503636'; // Rol de Jugón Novato
const jugonActivoRolId = '728027086157119639'; // Rol de Jugón Activo
const jugonSemiActivoRolId = '806620222228398122'; // Rol de Jugón Semi Activo
const jugonLeyendaRolId = '806620208705568768'; // Rol de Jugón Leyenda

// IDs de ciertos usuarios
const julzUserId = '426098208708624384';
const hermabotId = '733920906023403623';

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

// Comandos jugones
client.on("messageCreate", async message => {
    if (message.author.bot) return;

    const palabrasTriggerJugon = [
        "mode 7",
        "mode7",
        "jugón",
        "jugon",
        "jugona",
        "jugones",
        "jugonas",
        "cascajo"
    ];

    const respuestasJugon = [
        "eso tilín",
        "soñé que Mulaka estaba chido raza 😕",
        "jugón mis webos",
        `ni eres tan jugón mi ${message.member.displayName}, ¿pa' qué te haces?`,
        "ya no te he visto tan jugón",
        "una sesioncita jugona, ¿o qué?",
        "los pelijuegos no cuentan",
        "¿a ver la boleta? 👀",
        "puro free to play, así que chiste",
        "¿andamos jugones o qué?",
        "la pura crema y nata jugona aquí",
        `yo si te saco los negros más negros mi ${message.member.displayName}`,
        "Lord Jugón",
        "jugón se nace, no se hace",
        "pura frase jugona ustedes, se pasan xD",
        "ahora si que el <:pri:733044345262964837> porteó más",
        `ah prre ${message.member.displayName} 👀`,
        "súper jugón",
        "¿jugón y alucín?",
        "jugones, los quiero",
        "jugón, priísta e infiel, ¿qué más quieres mami?",
        "a ningún jugón le hace daño un fifa",
        "ves que el vato es jugón y le das game pass",
        "no hay nada más humilde que jugar en game pass",
        "¿no que muy jugones? pinches ojetitos",
        "con eso te armabas una pc krnal",
        "https://i.imgur.com/6fHfar4.png",
        "ALV XD",
        "https://i.imgur.com/rsUQ6ko.png", // Exceso en jugones
        "¿ya andan jugando cascajo?",
        "https://cdn.discordapp.com/attachments/479071002094075931/965658462518382703/Contina-viendo-los-posts.mp4",
        "puto el que lo lea xD",
        "ni saben leerm jaja 🤭",
        "https://i.imgur.com/9sFgLxL.jpg",
        "ahorita en la noche de splatoon"
    ];

    const palabrasTriggerOjetes = [
        "ojete",
        "ojetito"
    ];

    const respuestasOjetes = [
        "https://cdn.discordapp.com/attachments/1118774371205513217/1121913030083629086/No_que_muy_vergs_ojetitos.mp4",
        "https://cdn.discordapp.com/attachments/1118774371205513217/1121956923844075550/download.jpg",
        "https://cdn.discordapp.com/attachments/1118774371205513217/1121956936959660102/download.jpg",
        "https://cdn.discordapp.com/attachments/1118774371205513217/1121956952646373376/27f4c03feb2b7943eacc24e441297a581a7cb22d398a1b351cbdd28180dcc495_1.jpg",
        "https://cdn.discordapp.com/attachments/1118774371205513217/1121956970874814516/images.jpg",
        "https://cdn.discordapp.com/attachments/1118774371205513217/1121956991187824650/download.jpg",
        "https://cdn.discordapp.com/attachments/1118774371205513217/1121957058992947362/2287414.jpg",
        "https://cdn.discordapp.com/attachments/1118774371205513217/1121957059311702058/533976.jpg"
    ];

    const respuestasPeda = [
        "https://img.memegenerator.net/instances/81137401.jpg",
        "https://cdn.discordapp.com/attachments/1118774371205513217/1121897877027954728/images.jpg",
        "https://cdn.discordapp.com/attachments/1118774371205513217/1121898035811717221/istockphoto-1392916754-612x612.jpg",
        "https://cdn.discordapp.com/attachments/1118774371205513217/1121898325159972884/images.jpg",
        "https://cdn.discordapp.com/attachments/1118774371205513217/1121898612423655434/images.jpg",
	"https://cdn.discordapp.com/attachments/875506827377381456/1122243674517012674/Feliz-viernes-1687634119259.mp4"
    ];

    const palabrasTriggerPeda = [
        "peda",
        "pisto",
        "fiesta"
    ];

    const palabrasTriggerJueves = [
        "jueves",
        "jueveves",
        "viernes chiquito"
    ];

    const respuestasJugonJueves = [
        "jueves de mario karritos ahuevo",
        "día de putazos en mario kart",
        "tgit",
        "¡hoy hay Mode 7 Grand Prix prros!",
        "ánimo mis chingones ya es jueves",
        "puro mario kart y no mamadas alv",
        "siento que arranco la carretera 🎶",
        "échenme esos boilers pues"
    ];

    const palabrasTriggerJueves1 = [
        "siento que arranco",
        "siento que arranco...",
    ];

    const respuestasJugonJueves1 = [
        "...la carretera 🎶"
    ];

    const palabrasTriggerJueves2 = [
        "voy enfierrado",
    ];

    const respuestasJugonJueves2 = [
        "...por la costera 🎶"
    ];

    const palabrasTriggerJueves3 = [
        "mi troca casi se desparpaja"
    ];

    const respuestasJugonJueves3 = [
        "...pura madre se me raja 🎶"
    ];

    const palabrasTriggerJueves4 = [
        "llevo un fletazo pal otro lado",
        "llevo un fletazo pa'l otro lado",
    ];

    const respuestasJugonJueves4 = [
        "...y voa ganarme, buena marmajaaa 🎶"
    ];

    const palabrasTriggerPala = [
        "facebook",
        "feis",
        "feisbuk",
        "feisbook"
    ];

    const palabrasTriggerHermabot = [
        "bot",
        "mode 7 bot",
        "hermabot",
        "@"+hermabotId
    ];

    const respuestasHermabot = [
        "¿qué pedo, yo qué?",
        "hermabot, hermano, ya eres mexicano",
        "¿qué pasó?",
        "¿qué rollo?",
        "soy Suave",
        "tuuuuut",
        "¿qué tranza?",
        "ni saben leer, jaja 🤭",
        "al chile SIUUUU",
        `¿qué pedo mi ${message.member.displayName}?`,
        `¿qué pasó ${message.member.displayName}? ¿me hablabas o qué?`,
        "https://i.imgur.com/VPPPlA8.jpg",
        "¿Qué, qué, qué?, ¿es algo sobre pizza?\n\nhttps://i.imgur.com/KO1AiKs.png"
    ];

    const palabrasTriggerJulz = [
        "Julz",
        "@Julz"
    ];

    const palabrasTriggerValiendo = [
        "valiendo barriga",
        "baliendo barriga"
    ];

    const palabrasTriggerMatatan = [
        "hola ¿cómo están?",
        "hola, cómo están?",
        "hola cómo están?",
        "hola cómo están",
        "hola, ¿como están?",
        "hola ¿como están?",
        "hola, como están?",
        "hola como están?",
        "hola como están",
        "hola, ¿cómo estan?",
        "hola ¿cómo estan?",
        "hola, cómo estan?",
        "hola cómo estan?",
        "hola cómo estan",
        "hola, ¿como estan?",
        "hola ¿como estan?",
        "hola, como estan?",
        "hola como estan?",
        "hola como estan",
        "está en gamepass",
        "está en game pass",
        "esta en gamepass",
        "esta en game pass",
        "están en gamepass",
        "estan en gamepass",
        "estan en game pass",
        "bienvenidos una vez más",
        "bienvenidos una vez mas",
        "osea"
    ];

    const palabrasTriggerDios = [
        "si dios quiere",
        "si dios kiere"
    ];

    const palabrasTriggerJoycon = [
        "joy-con",        
        "joycon",        
        "joy con",
        "joycons",
        "joy cons"
    ];

    const palabrasTriggerSaludMatatan = [
        "salud",
        "salucita",
        "saludcita"
    ];

    const usuariosTriggerDEBUG = [
        "mexicanskynet",
        "itsmemijo"
    ];

    // Randomizar respuestas
    const responseJugon = Math.floor(Math.random() * respuestasJugon.length);
    const responseOjetes = Math.floor(Math.random() * respuestasOjetes.length);
    const responsePeda = Math.floor(Math.random() * respuestasPeda.length);
    const responseJugonJueves = Math.floor(Math.random() * respuestasJugonJueves.length);
    const responseJugonJueves1 = Math.floor(Math.random() * respuestasJugonJueves1.length);
    const responseJugonJueves2 = Math.floor(Math.random() * respuestasJugonJueves2.length);
    const responseJugonJueves3 = Math.floor(Math.random() * respuestasJugonJueves3.length);
    const responseJugonJueves4 = Math.floor(Math.random() * respuestasJugonJueves4.length);
    const responseHermabot = Math.floor(Math.random() * respuestasHermabot.length);

    const command = message.content.toLowerCase();
    const commandIssuer = message.member.user.username.toLowerCase();

    //DEVELOPER DEBUG
    if(debugEnabled){
        for(let i = 0; i < usuariosTriggerDEBUG.length; i++){
            if(command.includes("debug") && commandIssuer.includes(usuariosTriggerDEBUG[i])){
                message.channel.send("Esto es lo que veo: ``` "+message.content+" ``` ");
            }
            break;
        }
    }

    // Respuestas jugonas
    for (let i = 0; i < palabrasTriggerJugon.length; i++) {
        if (command.includes(palabrasTriggerJugon[i])) {
            message.channel.send(respuestasJugon[responseJugon]);
            break;
        }
    }

    //Respuestas ojetes
    for (let i = 0; i < palabrasTriggerOjetes.length; i++) {
        if (command.includes(palabrasTriggerOjetes[i])) {
            message.channel.send(respuestasOjetes[responseOjetes]);
            break;
        }
    }

    // Respuestas peda/fiesta
    for (let i = 0; i < palabrasTriggerPeda.length; i++) {
        if (command.includes(palabrasTriggerPeda[i])) {
            message.channel.send(respuestasPeda[responsePeda]);
            break;
        }
    }    

    // Comandos M7GP
    for (let i = 0; i < palabrasTriggerJueves.length; i++) {
        if (command.includes(palabrasTriggerJueves[i])) {
            message.channel.send(respuestasJugonJueves[responseJugonJueves]);
            break;
        }
    }

    for (let i = 0; i < palabrasTriggerJueves1.length; i++) {
        if (command.includes(palabrasTriggerJueves1[i])) {
            message.channel.send(respuestasJugonJueves1[responseJugonJueves1]);
            break;
        }
    }

    for (let i = 0; i < palabrasTriggerJueves2.length; i++) {
        if (command.includes(palabrasTriggerJueves2[i])) {
            message.channel.send(respuestasJugonJueves2[responseJugonJueves2]);
            break;
        }
    }

    for (let i = 0; i < palabrasTriggerJueves3.length; i++) {
        if (command.includes(palabrasTriggerJueves3[i])) {
            message.channel.send(respuestasJugonJueves3[responseJugonJueves3]);
            break;
        }
    }

    for (let i = 0; i < palabrasTriggerJueves4.length; i++) {
        if (command.includes(palabrasTriggerJueves4[i])) {
            message.channel.send(respuestasJugonJueves4[responseJugonJueves4]);
            break;
        }
    }

    // Press F to pay respects
    if (command === "f" || command === "F") {
        message.channel.send(`${message.member.displayName} pide "efes" en el chat.`);
    }

    // Le cae Marzito de aguafiestas
    if (message.channel.id == announcementChannelId) {
        if (message.author.bot) return;

        message.channel.send(`https://i.imgur.com/PpkWAud.png`);
    }

    // Autoreponse PALA
    for (let i = 0; i < palabrasTriggerPala.length; i++) {
        if (command.includes(palabrasTriggerPala[i])) {
            message.channel.send('https://i.imgur.com/AmxiHj1.png');
            break;
        }
    }

    // Hermabot
    for (let i = 0; i < palabrasTriggerHermabot.length; i++) {
        if (command.includes(palabrasTriggerHermabot[i])) {
            message.channel.send(respuestasHermabot[responseHermabot]);
            break;
        }
    }

    // Homenaje al Julz
    for (let i = 0; i < palabrasTriggerJulz.length; i++) {
        if (command.includes(palabrasTriggerJulz[i])) {
            message.channel.send('https://i.imgur.com/c4ImBHD.jpg');
            break;
        }
    }

    // Valiendo barriga
    for (let i = 0; i < palabrasTriggerValiendo.length; i++) {
        if (command.includes(palabrasTriggerValiendo[i])) {
            message.channel.send('señor verga');
            break;
        }
    }

    // Frases del Matatán
    for (let i = 0; i < palabrasTriggerMatatan.length; i++) {
        if (command.includes(palabrasTriggerMatatan[i])) {
            message.channel.send('<:matatan:691802785913634816>');
            break;
        }
    }

    // Si Dios quiere
    for (let i = 0; i < palabrasTriggerDios.length; i++) {
        if (command.includes(palabrasTriggerDios[i])) {
            message.channel.send('https://i.imgur.com/F62Cn4E.jpg');
            break;
        }
    }

    // Puro pendejo usa Joycon
    for (let i = 0; i < palabrasTriggerJoycon.length; i++) {
        if (command.includes(palabrasTriggerJoycon[i])) {
            message.channel.send('https://i.imgur.com/eHYWCPU.png');
            break;
        }
    }

    // Salud Matatán
    for (let i = 0; i < palabrasTriggerSaludMatatan.length; i++) {
        if (command.includes(palabrasTriggerSaludMatatan[i])) {
            message.channel.send('https://i.imgur.com/FLQT9B2.jpg');
            break;
        }
    }

    // Cuando el Shinobi postea algo en el canal de 🍲│comida
    if (message.channel.id == comidaChannelId) {
        if (message.author.bot) return;

        let author = message.author.id;        

        if (author == client.users.cache.find(u => u.tag === 'shinobipunk#7122').id) {
            message.channel.send('https://i.imgur.com/9XsTQuI.png');
        }
    };
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
    let generalChannel = client.channels.cache.get(generalChannelId);
    generalChannel.send(imagenesBuenosDias[responseBuenosDias]);
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
    let generalChannel = client.channels.cache.get(generalChannelId);
    generalChannel.send(imagenesBuenosDias[responseBuenosDias]);
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
    let generalChannel = client.channels.cache.get(generalChannelId);
    generalChannel.send(imagenesBuenosDias[responseBuenosDias]);
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
    mariokartChannel.send(`Y acuérdense de compartir el flyer, el hashtag y el código del torneo con sus compas.\n\nCódigo: 0746-6549-8155\nLink a este canal: https://discord.gg/U77J5c6\n\nhttps://i.imgur.com/JKVAkXE.png`);
}, null, false, 'America/Chihuahua');

flyerM7GP.start();

// Log in to Discord with your client's token
client.login(token); // Local
//client.login(process.env.BOT_TOKEN); // Remote
