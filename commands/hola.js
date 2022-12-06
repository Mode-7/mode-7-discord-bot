const { Client, GatewayIntentBits, SlashCommandBuilder } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hola')
		.setDescription('Usa este comando para recibir un saludo del Mode 7 Bot.'),
	async execute(interaction) {
		await interaction.reply(`¡Holi ${interaction.user.username}! Estás bien guap@ y así.`);
	},
};