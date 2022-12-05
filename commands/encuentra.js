const { Client, GatewayIntentBits, SlashCommandBuilder } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

module.exports = {
	data: new SlashCommandBuilder()
		.setName('encuentra')
		.setDescription('Este comando te va a decir el miembro de Mode 7 más jugón del momento.'),
	async execute(interaction) {
        const randomUser = client.users.cache.random();
		await interaction.reply(`Ahorita el usuario más jugón de Mode 7 es: ${randomUser}`);
	},
};