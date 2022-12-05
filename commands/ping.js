const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Te contesta con un Pong!'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};