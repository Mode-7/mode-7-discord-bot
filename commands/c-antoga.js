const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('c-antoga')
		.setDescription('El comando para cuando algo c antoga.'),
	async execute(interaction) {
		await interaction.reply(`https://i.imgur.com/kudrTP3.png`);
	},
};