const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } = require("discord.js"),
  prisma = require("@prisma/client"),
  prismaClient = new prisma.PrismaClient();

// const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("galactapedia")
    .setDescription("Search the Galactapedia")
    .addStringOption((option) => option.setName("search").setDescription("What are you searching for?").setRequired(true))
    .addBooleanOption((option) => option.setName("list").setDescription("How only the list of results?").setRequired(false)),
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;
    const search = interaction.options.getString("search"),
      list = interaction.options.getBoolean("list"),
      searchSlug = await prismaClient.galactapedia.findMany({
        where: {
          OR: [
            {
              id: { contains: search, mode: "insensitive" },
            },
            {
              title: { contains: search, mode: "insensitive" },
            },
            {
              slug: { contains: search, mode: "insensitive" },
            },
            {
              category: { has: search },
            },
            {
              tags: { has: search },
            },
          ],
        },
      });
    searchIndex = searchSlug.map((element) => element.title).join(" ● ");

    // console.log(searchSlug)

    if (searchSlug.length < 25 && list === false) {
      var OptionArray = [];
      for (var i = 0; i < searchSlug.length; i++) {
        const OptionChunk = { label: searchSlug[i].title, value: searchSlug[i].slug };
        OptionArray.push(OptionChunk);
      }
      const searchEmbed = new EmbedBuilder()
          .setColor(0x00ff00)
          .setTitle("Galactapedia Search Results on " + search + ":")
          .setTimestamp()
          .setDescription(searchIndex),
        rowMenu = new ActionRowBuilder().addComponents(new StringSelectMenuBuilder().setCustomId("selectGalactapedia").setPlaceholder("Nothing selected").addOptions(OptionArray));

      await interaction.reply({ embeds: [searchEmbed], ephemeral: true, components: [rowMenu] });
    } else if (list === true) {
      const searchEmbed = new EmbedBuilder()
        .setColor(0x00ff00)
        .setTitle("Galactapedia Search Results on " + search + ":")
        .setTimestamp()
        .setDescription(searchIndex)
        .setFooter({ text: "List only, as selected by the user." });

      await interaction.reply({ embeds: [searchEmbed], ephemeral: true });
    } else {
      await interaction.reply({
        content:
          "Too many results, please be more specific or use a different tag/category.\nIf you are looking for details about a ship, use the `/ship` command.\nTo get a list of the results regardless, set the `list` option to `true`. ",
        ephemeral: true,
      });
    }
  },
};
