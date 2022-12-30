const fetch = require("node-fetch");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("poi")
    .setDescription("Point of Interest Info!"),
  async execute(interaction) {

    await interaction.reply("Work in Progress!");
  },
};
