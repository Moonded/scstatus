// import { Events } from 'discord.js';
const { Events, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const postData = require("../lib/post.js");

const map = new Map();

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (interaction.isCommand() && interaction.commandName == "discovery") {
      map.set("system", interaction.options.getString("system"));
      map.set("version", interaction.options.getString("version"));
      map.set("poi_type", interaction.options.getString("poi_type"));
    }
    if (
      interaction.isModalSubmit() &&
      interaction.customId == "DiscoveryModal"
    ) {
      map.set(
        "squadron",
        interaction.fields.getTextInputValue("squadronnameInput") || "N/A"
      );
      map.set(
        "celestrial",
        interaction.fields.getTextInputValue("celestrialbodyInput") || "N/A"
      );
      map.set(
        "coordiante",
        interaction.fields.getTextInputValue("coordinatesInput") || "N/A"
      );
      map.set(
        "location",
        interaction.fields.getTextInputValue("locationInput") || "N/A"
      );
      map.set(
        "observation",
        interaction.fields.getTextInputValue("observationInput") || "N/A"
      );

      map.set("user", interaction.user.id);
      postData("http://localhost:3000/discovery", [...map]).then((data) => {
        console.log(data); // JSON data parsed by `data.json()` call
      });

     

      const userDiscovery = "Discovery by " + interaction.user.username;

      const exampleEmbed = new EmbedBuilder()
        .setColor(0x00ff00)
        .setTitle("Discovery Report Card")
        .addFields(
          { value: map.get("system"), name: "System", inline: true },
          { value: map.get("version"), name: "Version", inline: true },
          { value: map.get("poi_type"), name: "POI Type", inline: true },
          { value: map.get("celestrial"), name: "Celestrial", inline: true },
          { value: map.get("location"), name: "Location", inline: true },
          { value: map.get("coordiante"), name: "Coordiante", inline: true },
          { value: map.get("squadron"), name: "Squadron", inline: true },
          { value: "\u200B", name: "\u200B", inline: true },
          { value: map.get("observation"), name: "Overview", inline: true }
        )
        .setTimestamp()
        .setFooter({ text: userDiscovery });

      await interaction.reply({ embeds: [exampleEmbed], ephemeral: true });
    }
  },
};
