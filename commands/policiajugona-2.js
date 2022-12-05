const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('policiajugona-2')
		.setDescription('Invoca la policía jugona 2 para checar que la raza haya terminado sus juegos.'),
	async execute(interaction) {
		await interaction.reply(`https://i.imgur.com/jRYhz7i.png`);
	},
};