const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('messirve')
		.setDescription('Usa este comando cuando algo te sirva.'),
	async execute(interaction) {
		await interaction.reply(`https://media1.tenor.com/images/0ded3d37756b480d80ae4fadc8121eac/tenor.gif?itemid=17952557`);
	},
};