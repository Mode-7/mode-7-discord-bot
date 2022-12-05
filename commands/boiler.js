const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('boiler')
		.setDescription('Solo los que le caen al Mode 7 Grand Prix saben la utilidad de este comando.'),
	async execute(interaction) {
		await interaction.reply(`https://cdn.discordapp.com/attachments/478782450806292481/812162915674488863/8d7575fecdf184d33f258a3abcfe691a.png`);
	},
};