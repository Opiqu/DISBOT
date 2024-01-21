const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;//設定可以超過3秒再回覆
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.deferReply();
		await wait(4_000);
		await interaction.editReply({ content: 'Secret Pong!', ephemeral: true });//設定只有當前使用者看的到
		const message = await interaction.fetchReply();
		console.log(message);
	},
};
