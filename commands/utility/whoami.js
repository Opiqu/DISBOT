// commands/whoami.js
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('whoami')
		.setDescription('Returns your nickname and roles in this server.'),
	async execute(interaction) {
		const member = interaction.member; // Get the member who issued the command
		const nickname = member.nickname || member.user.username; // Nickname in the server, or username if no nickname
		const roles = member.roles.cache.map(role => role.name).join(', '); // List of role names

		await interaction.reply(`Your nickname: ${nickname}\nYour roles: ${roles}`);
	},
};
