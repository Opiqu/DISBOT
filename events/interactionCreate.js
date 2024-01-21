const { Events } = require('discord.js');
const selectMenuOptions = require('../commands/utility/selectmenui/seleMenuOp.js'); // 更新這裡的路徑

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (interaction.isChatInputCommand()) {
			const command = interaction.client.commands.get(interaction.commandName);

			if (!command) {
				console.error(`No command matching ${interaction.commandName} was found.`);
				return;
			}

			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(error);
				if (interaction.replied || interaction.deferred) {
					await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
				} else {
					await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
				}
			}
		} else if (interaction.isModalSubmit()) {
			// 處理模態提交
			if (interaction.customId === 'myModal') {
				const usname = interaction.fields.getTextInputValue('favoriteColorInput');
				const apart = interaction.fields.getTextInputValue('hobbiesInput');
				console.log(`姓名: ${usname}, 單位: ${apart}`);
				await interaction.reply({ content: `你的提交已成功接收！\n 姓名: ${usname} \n 單位: ${apart}` });
			}
		} else if (interaction.isStringSelectMenu()) {
			// 處理下拉選單
			if (interaction.customId === 'selectMenu') {
				const selectedValue = interaction.values[0];
				const selectedOption = selectMenuOptions.find(option => option.value === selectedValue);
				const selectedLabel = selectedOption ? selectedOption.label : '未知選項';
				const member = interaction.member;
				const nickname = member.nickname || member.user.username;
				const roles = member.roles.cache
					.filter(role => role.name !== '@everyone') // Filter out the @everyone role
					.map(role => role.name)
					.join(', ');
				console.log(`${nickname}選擇了：${selectedLabel}，在此人還是${roles}的時候`);
				await interaction.reply(`${nickname}選擇了：${selectedLabel}，在此人還是${roles}的時候`);
			}
		}
	},
};
