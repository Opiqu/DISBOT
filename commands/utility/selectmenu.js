// commands/selectMenu.js
const { SlashCommandBuilder, ActionRowBuilder, SelectMenuBuilder, StringSelectMenuBuilder } = require('discord.js');
const selectMenuOptions = require('./selectmenui/seleMenuOp');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('selectmenu')
		.setDescription('你未來的就學計畫'),
	async execute(interaction) {
		await interaction.deferReply();
		const selectMenu = new StringSelectMenuBuilder()
			.setCustomId('selectMenu')
			.setPlaceholder('選擇你未來的人生方向')
			.addOptions([
				{
					label: '休學',
					description: '這是第一個選項',
					value: 'option1',
				},
				{
					label: '退學',
					description: '這是第二個選項',
					value: 'option2',
				},
				{
					label: '簽博',
					description: '這是第三個選項',
					value: 'option3',
				},
				// ...更多選項
			]);
		const row = new ActionRowBuilder().addComponents(selectMenu);
		await interaction.editReply({ content: '請選擇一個選項：', components: [row] });

	},
};
