const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('eww')
		.setDescription('Comando para cuando algo te da asco. 🐶'),
	async execute(interaction) {
		await interaction.reply(`https://i.imgur.com/BkQT0a4.jpg`);
	},
};