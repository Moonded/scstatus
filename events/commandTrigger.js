const { Events } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    console.log(
      "USER: ",
      interaction.user.username,
      " | ",
      interaction.commandName
    );
  },
};
