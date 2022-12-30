const fetch = require("node-fetch");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("uptime").setDescription("SC Uptime Info!"),
  async execute(interaction) {
    // await interaction.reply('send it!', { ephemeral: true });

    const response = await fetch("http://localhost:3000/status");
    if (!response.ok) return;

    const responseText = JSON.parse(await response.text()),
      map = new Map(Object.entries(responseText));

    for (const [key, value] of map.entries()) {
      switch (value) {
        case "Operational ":
          map.set(key, "🟢 " + value);
          break;
        case "Degraded Performance ":
          map.set(key, "🟡 " + value);
          break;
        case "Partial Outage ":
          map.set(key, "🟠 " + value);
          break;
        case "Major Outage ":
          map.set(key, "🔴 " + value);
          break;
        case "Maintenance ":
          map.set(key, "🟣 " + value);
          break;
        case "N/A ":
          map.set(key, "❓ " + value);
          break;
        default:
          map.set(key, "🟣 " + value);
      }
    }

    const exampleEmbed = new EmbedBuilder()
      .setColor(0x00ff00)
      .setTitle("Current Uptime")
      .setURL("https://status.robertsspaceindustries.com/")
      .addFields(
        { name: "Platform", value: map.get("Platform") },
        { name: "Electronic Access", value: map.get("Electronic Access"), inline: true },
        { name: "Persistant Universe", value: map.get("Persistent Universe"), inline: true },
        {
          name: "Persistant Test Universe",
          value: "❓ N/A",
          inline: true,
        }
      )
      .setTimestamp()
      .setFooter({ text: "Updates every 10 minutes." });

    await interaction.reply({ embeds: [exampleEmbed] });
  },
};
