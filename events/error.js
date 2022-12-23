// import { Events } from 'discord.js';
const { Events } = require('discord.js');

module.exports = {
	name: Events.Error,
	async execute(error) {
        console.error(error);
	},
};
