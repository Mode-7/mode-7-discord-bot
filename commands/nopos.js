const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('nopos')
		.setDescription('Comando para cuando algo "ta cabrón"'),
	async execute(interaction) {
		await interaction.reply(`https://i.imgflip.com/4wugny.jpg`);
	},
};