const Discord = require("discord.js");
// const config = require("./config.json"); // No necesitamos este archivo al hacer deply en Heroku

const welcome = require('./welcome');
const commands = require('./commands');

const client = new Discord.Client();
const webhookClient = new Discord.WebhookClient(process.env.WEBHOOK_ID, process.env.WEBHOOK_TOKEN);

const prefix = process.env.PREFIX;

client.once("ready", () => {
    console.log("Estoy listo.");

    welcome(client);

    commands(client);
});

// client.login(config.token);
client.login(process.env.BOT_TOKEN); // BOT_TOKEN es el Config Var creado en Heroku