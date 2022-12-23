const {
  SlashCommandBuilder,
  Events,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("discovery")
    .setDescription("Info Module")
    .addStringOption((option) =>
      option
        .setName("system")
        .setDescription("Selecet the System")
        .setRequired(true)
        .addChoices(
          { name: "Stanton", value: "Stanton" },
          { name: "Pyro", value: "Pyro" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("version")
        .setDescription("Selecet the Version")
        .setRequired(true)
        .addChoices(
          { name: "3.17", value: "3.17" },
          { name: "3.16", value: "3.16" },
          { name: "3.15", value: "3.15" },
          { name: "3.14", value: "3.14" },
          { name: "3.13", value: "3.13" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("poi_type")
        .setDescription("Selecet the Version")
        .setRequired(true)
        .addChoices(
          {
            name: "Wreckage/Crash Site of a Ship",
            value: "Wreckage/Crash Site of a Ship",
          },
          {
            name: "Wreckage/Crash Site of a Satellite/Station",
            value: "Wreckage/Crash Site of a Satellite/Station",
          },
          { name: "Outpost", value: "Outpost" },
          { name: "Abandoned Outpost", value: "Abandoned Outpost" },
          { name: "Cave", value: "Cave" },
          { name: "Biome", value: "Biome" },
          { name: "Miscellaneous", value: "Miscellaneous" },
          { name: "Drug Lab", value: "Drug Lab" },
          { name: "Other", value: "Other" }
        )
    ),

  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const modal = new ModalBuilder()
        .setCustomId("DiscoveryModal")
        .setTitle("Discovery"),
      squadronnameInput = new TextInputBuilder()
        .setCustomId("squadronnameInput")
        .setLabel("SQUADRON NAME (Optional)")
        .setStyle(TextInputStyle.Short)
        .setPlaceholder("No Squadron")
        .setRequired(false),
      celestrialInput = new TextInputBuilder()
        .setCustomId("celestrialbodyInput")
        .setLabel("CELESTIAL BODY")
        .setStyle(TextInputStyle.Short)
        .setRequired(false),
      coordinatesInput = new TextInputBuilder()
        .setCustomId("coordinatesInput")
        .setLabel("COORDINATES")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(false),
      locationInput = new TextInputBuilder()
        .setCustomId("locationInput")
        .setLabel("NAME OF YOUR LOCATION")
        .setStyle(TextInputStyle.Short)
        .setRequired(false),
      observationInput = new TextInputBuilder()
        .setCustomId("observationInput")
        .setLabel("OBSERVATIONS (Optional)")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(false),
      Squadron = new ActionRowBuilder().addComponents(squadronnameInput),
      Celestrial = new ActionRowBuilder().addComponents(celestrialInput),
      Coordiantes = new ActionRowBuilder().addComponents(coordinatesInput),
      Location = new ActionRowBuilder().addComponents(locationInput),
      Observations = new ActionRowBuilder().addComponents(observationInput);
      
    modal.addComponents(
      Celestrial,
      Location,
      Coordiantes,
      Squadron,
      Observations
    );

    await interaction.showModal(modal);
  },
};
