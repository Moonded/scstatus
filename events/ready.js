// import { Events } from 'discord.js';
const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`BOT Started: ${client.user.tag}`);
	},
};
