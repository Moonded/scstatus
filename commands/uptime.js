const fetch = require("node-fetch");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("uptime")
    .setDescription("SC Uptime Info!"),
  async execute(interaction) {
    var html;
    const response = await fetch("http://localhost:3000/status");
    if (response.ok) {
      html = await response.text();
    }
    const data = JSON.parse(html);
    const exampleEmbed = new EmbedBuilder()
      .setColor(0x00ff00)
      .setTitle("Current Uptime")
      .setURL("https://status.robertsspaceindustries.com/")
      .addFields(
        { name: data[0].title, value: data[0].status },
        { name: data[1].title, value: data[1].status, inline: true },
        { name: data[3].title, value: data[3].status, inline: true },
        { name: data[2].title, value: data[2].status, inline: true }
      )
      .setTimestamp()
      .setFooter({ text: "Last Updated By Moonded" });

    await interaction.reply({ embeds: [exampleEmbed], ephemeral: true   });
  },
};
