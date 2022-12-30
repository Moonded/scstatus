const fetch = require("node-fetch");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("commands")
    .setDescription("List current available commands."),
  async execute(interaction) {
    const exampleEmbed = new EmbedBuilder()
      .setColor(0x00ff00)
      .addFields({
        name: "Available Commands",
        value:
          "● /commands\nGet a list of all available commands.\n● /discovery\nReport new found Discovery from the verse.\n● /uptime\nGet latest Uptime, updated every 10 Minutes\n● /search\nSearch the Galactapedia.",
      })
      .setTimestamp()

    await interaction.reply({ embeds: [exampleEmbed], ephemeral: true });
  },
};
