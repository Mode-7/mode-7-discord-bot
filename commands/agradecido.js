const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('agradecido')
		.setDescription('¿Te sientes agradecido? Usa este comando entonces.'),
	async execute(interaction) {
		await interaction.reply(`https://i.imgur.com/ASnDi7B.png`);
	},
};