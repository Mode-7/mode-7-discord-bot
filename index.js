const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
// const { clientId, guildId, token } = require('./config.json');
const cron = require('cron');

// Create a new client instance and specify needed intents
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Disable max listeners
process.setMaxListeners(0);

// Guild ID
// const guild = guildId; // ID del Guild Local
const guild = process.env.GUILD_ID; // ID del Guild Remoto

// IDs de canales
const announcementChannelId = '664249693601267743'; // Canal de anuncios
const welcomeChannelId = '478777821976723487'; // Canal de bienvenida
const rulesChannelId = '479304179102384128'; // Canal de reglas
const generalChannelId = '875506827377381456'; // Canal general
const gamingGeneralChannelId = '478782494666129419'; // Canal gaming general
const helpChannelId = '973608999410872400'; // Canal de ayuda
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
        "Jugonas",
        "cascajo",
        "Cascajo"
    ];

    const respuestasJugon = [
        "eso tilín",
        "soñé que Mulaka estaba chido raza 😕",
        "jugón mis webos",
        `ni eres tan jugón mi ${message.member.user.username}, ¿pa' qué te haces?`,
        "ya no te he visto tan jugón",
        "una sesioncita jugona, ¿o qué?",
        "los pelijuegos no cuentan",
        "¿a ver la boleta? 👀",
        "puro free to play, así que chiste",
        "¿andamos jugones o qué?",
        "la pura crema y nata jugona aquí",
        `yo si te saco los negros más negros mi ${message.member.user.username}`,
        "Lord Jugón",
        "jugón se nace, no se hace",
        "pura frase jugona ustedes, se pasan xD",
        "ahora si que el <:pri:733044345262964837> porteó más",
        `ah prre ${message.member.user.username} 👀`,
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
client.on("messageCreate", async message => {
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

// Comandos M7GP
client.on("messageCreate", async message => {
    if (message.author.bot) return;

    const palabrasTriggerJueves = [
        "siento que arranco",
        "siento que arranco...",
        "Siento que arranco",
        "Siento que arranco..."
    ];

    const respuestasJugonJueves = [
        "...la carretera 🎶"
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

client.on("messageCreate", async message => {
    if (message.author.bot) return;

    const palabrasTriggerJueves = [
        "voy enfierrado",
        "voy enfierrado...",
        "Voy enfierrado",
        "Voy enfierrado..."
    ];

    const respuestasJugonJueves = [
        "...por la costera 🎶"
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

client.on("messageCreate", async message => {
    if (message.author.bot) return;

    const palabrasTriggerJueves = [
        "mi troca casi se desparpaja",
        "mi troca casi se desparpaja...",
        "Mi troca casi se desparpaja",
        "Mi troca casi se desparpaja..."
    ];

    const respuestasJugonJueves = [
        "...pura madre se me raja 🎶"
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

client.on("messageCreate", async message => {
    if (message.author.bot) return;

    const palabrasTriggerJueves = [
        "llevo un fletazo pal otro lado",
        "llevo un fletazo pal otro lado...",
        "Llevo un fletazo pal otro lado",
        "Llevo un fletazo pal otro lado...",
        "llevo un fletazo pa'l otro lado",
        "llevo un fletazo pa'l otro lado...",
        "Llevo un fletazo pa'l otro lado",
        "Llevo un fletazo pa'l otro lado..."
    ];

    const respuestasJugonJueves = [
        "...y voa ganarme, buena marmajaaa 🎶"
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

// Press F to pay respects
client.on("messageCreate", async message => {
    if (message.author.bot) return;

    const command = message.content;

    if (command === "f" || command === "F") {
        message.channel.send(`${message.member.user.username} pide "efes" en el chat.`);
    }
});

// Le cae Marzito de aguafiestas
client.on("messageCreate", async message => {
    if (message.channel.id == announcementChannelId) {
        if (message.author.bot) return;

        message.channel.send(`https://i.imgur.com/PpkWAud.png`);
    }
});

// Autoresponse PALA
client.on("messageCreate", async message => {
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
client.on("messageCreate", async message => {
    if (message.author.bot) return;

    const palabrasTrigger = [
        "hermabot",
        "Hermabot",
        "HERMABOT"
    ];

    const respuestasJugon = [
        "¿qué pedo, yo qué?",
        "hermabot, hermano, ya eres mexicano",
        "¿qué pasó?",
        "¿qué onda, qué onda?",
        "soy Suave",
        "tuuuuut",
        "¿qué tranza prros?",
        "ni saben leer, jaja 🤭",
        "al chile SIUUUU",
        `¿qué pedo mi ${message.member.user.username}?`,
        `¿qué pasó ${message.member.user.username}? ¿me hablas?`
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

// Homenaje al Julz
client.on("messageCreate", async message => {
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
client.on("messageCreate", async message => {
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

// Frases del Matatán
client.on("messageCreate", async message => {
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
        "Bienvenidos una vez mas",
        "osea",
        "Osea"
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
client.on("messageCreate", async message => {
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
client.on("messageCreate", async message => {
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

// Salud Matatán
client.on("messageCreate", async message => {
    if (message.author.bot) return;

    const palabrasTrigger = [
        "salud",
        "Salud",
        "SALUD"
    ];

    const command = message.content;

    for (let i = 0; i < palabrasTrigger.length; i++) {
        if (command.includes(palabrasTrigger[i])) {
            message.channel.send('https://i.imgur.com/FLQT9B2.jpg');
            break;
        }
    }
});

// Cuando el Shinobi postea algo en el canal de 🍲│comida
client.on("messageCreate", async message => {
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
    mariokartChannel.send(`Y acuérdense de compartir el flyer, el hashtag y el código del torneo con sus compas.\n\nCódigo: 0746-6549-8155\nLink a este canal: https://discord.gg/U77J5c6\n\nhttps://i.imgur.com/u4ekrdL.png`);
}, null, false, 'America/Chihuahua');

flyerM7GP.start();

// Log in to Discord with your client's token
// client.login(token); // Local
client.login(process.env.BOT_TOKEN); // Remote