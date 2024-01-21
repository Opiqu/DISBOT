const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const { flask_url } = require('../../config.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('whereismydoc')
		.setDescription('查詢文檔是否存在於資料庫中')
		.addStringOption(option =>
			option.setName('content')
				.setDescription('要查詢的檔名')
				.setRequired(true)),
	async execute(interaction) {
		const docName = interaction.options.getString('content'); // 從指令中獲取文檔名稱

		try {
			// 向 Flask API 發送請求
			const response = await axios.post(flask_url, {
				docName: docName
			});

			// 處理回應
			if (response.data.exists) {
				await interaction.reply(`文檔 ${docName} 存在於資料庫中。`);
			} else {
				await interaction.reply(`文檔 ${docName} 不存在於資料庫中。`);
			}
		} catch (error) {
			// 處理錯誤
			console.error(error);
			await interaction.reply('無法執行查詢。');
		}
	},
};
