const fetch = require("node-fetch");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Info Module")
    .addStringOption((option) =>
      option
        .setName("status")
        .setDescription("The input to echo back")
        .addChoices(
          { name: "Funny", value: "gif_funny" },
          { name: "Meme", value: "gif_meme" },
          { name: "Movie", value: "gif_movie" }
        )
    ),
  async execute(interaction) {
    const status =
      interaction.options.getString("input") ?? "No input provided";

    var html;

    const response = await fetch("http://localhost:3000/info");
    if (response.ok) {
      html = JSON.parse(await response.text());
    }
    const data = html;


    const exampleEmbed = new EmbedBuilder()
      .setColor(0x00ff00)
      .setTitle("Info!")
      .addFields({ name: "What?", value: "Don't look at me lie that!" })
      .setTimestamp()
      .setFooter({ text: "Last Updated By Moonded" });

    await interaction.reply({ embeds: [exampleEmbed], ephemeral: true   });
  },
};
