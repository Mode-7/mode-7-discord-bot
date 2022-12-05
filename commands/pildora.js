const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pildora')
		.setDescription('¿Necesitas hacer un volado? Usa este comando para tomar una decisión.'),
	async execute(interaction) {
        let coinFlip = () => {
            let resultCoin = (Math.floor(Math.random() * 2) == 0) ? 'https://i.imgur.com/2kqsZNk.png' : 'https://i.imgur.com/pEDmvdR.png';
            interaction.reply(interaction, resultCoin);
        }
        coinFlip();
	},
};