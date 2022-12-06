const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Muestra información del servidor.'),
	async execute(interaction) {
		// interaction.guild is the object representing the Guild in which the command was run
		await interaction.reply({content: `Estás en el servidor de ${interaction.guild.name} y actualmente tiene ${interaction.guild.memberCount} miembros.`, ephemeral: true})
	},
};