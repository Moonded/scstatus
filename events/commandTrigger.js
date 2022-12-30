// import { Events } from "discord.js";
const { Events } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    console.log(
      "GUILD: ",
      interaction.guild.name + " (" + interaction.guildId + ")",
      " | USER: ",
      interaction.user.username + " (" + interaction.user.id + ")",
      " | COMMAND: ",
      interaction.commandName
    );
  },
};
