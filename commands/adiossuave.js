const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('adiossuave')
		.setDescription('Solo los que le caen al Mode 7 Grand Prix saben la utilidad de este comando.'),
	async execute(interaction) {
		await interaction.reply(`https://i.imgur.com/pw7eV4Y.jpg`);
	},
};