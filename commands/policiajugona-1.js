const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('policiajugona-1')
		.setDescription('Invoca la policía jugona para checar que la raza haya terminado sus juegos.'),
	async execute(interaction) {
		await interaction.reply(`https://i.imgur.com/V0x0iOS.png`);
	},
};