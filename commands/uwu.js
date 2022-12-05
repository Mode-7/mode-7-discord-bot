const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('uwu')
		.setDescription('Usa este comando para publicar un hermoso uwu.'),
	async execute(interaction) {
		await interaction.reply(`<:uwu:806331721754214411>`);
	},
};