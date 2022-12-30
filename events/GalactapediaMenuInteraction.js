const { Events, EmbedBuilder, SplitOptions } = require("discord.js");
const Galactapedia = require("../lib/fetchGalactapedia");
const wait = require("node:timers/promises").setTimeout;

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isStringSelectMenu()) return;
    if (!interaction.customid === "selectGalactapedia") return;

    const interactionValue = interaction.values,
      valueextract = { value: interactionValue[0] },
      value = JSON.stringify(interaction.values),
      galactapedia = await Galactapedia(value),
      node = galactapedia.data.allArticle.edges[0].node,
      nodebody = node.body.replace(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g, function (match) {
        return `<${match}>`;
      }),
      nodeLink = `http://localhost:3000/r/g/${node.id}-${node.slug}`,
      Content = `**[${node.title}](<${nodeLink}>)**\n${nodebody}`;

    const exampleEmbed = new EmbedBuilder().setColor(0x00ff00).setTitle("Galactapedia Search Results:").setDescription(Content).setTimestamp();

    if (interaction.customId === "selectGalactapedia") {
      await interaction.deferUpdate();
      await interaction.editReply({ components: [], embeds: [exampleEmbed], ephemeral: true });
    }
  },
};
