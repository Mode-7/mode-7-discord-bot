const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('chupas')
		.setDescription('Chupaaaas. 💋'),
	async execute(interaction) {
		await interaction.reply(`https://i.imgur.com/IQ1Aa5G.jpg`);
	},
};