const { Client, GatewayIntentBits, SlashCommandBuilder } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });

module.exports = {
	data: new SlashCommandBuilder()
		.setName('encuentra')
		.setDescription('Este comando te va a decir el miembro de Mode 7 más jugón del momento.'),
	async execute(interaction) {


        let randomUser = interaction.guild.members;
		console.log(randomUser);
		//await interaction.reply(`Ahorita el usuario más jugón de Mode 7 es: ${randomUser}`);
	},
};