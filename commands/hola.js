const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hola')
		.setDescription('Usa este comando para recibir un saludo del Mode 7 Bot.'),
	async execute(interaction) {
		const user = client.users.cache.get(interaction.member.user.id);
		await interaction.reply(`¡Holi ${user}! Estás bien guap@ y así.`);
	},
};