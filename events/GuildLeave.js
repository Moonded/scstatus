// import { Events } from 'discord.js';
const { Events } = require('discord.js');

module.exports = {
	name: Events.GuildDelete,
	once: true,
	execute(guild) {
		console.log("LEAVE: "+ guild.name + " (" + guild.id + ")");
	},
};
