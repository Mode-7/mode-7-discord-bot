const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('calzon-matatan')
		.setDescription('¿Matatán compró o subió créditos de algún juego a su Twitter? Hora de usar este útil comando. 🫣'),
	async execute(interaction) {
		await interaction.reply(`https://i.imgur.com/cTyf3cY.jpg`);
	},
};