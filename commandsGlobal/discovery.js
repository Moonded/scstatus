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
    .setDescription("Report a discovery")
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
          { name: "Live", value: "Live" },
          { name: "PTU", value: "PTU" }
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
      orgInput = new TextInputBuilder()
        .setCustomId("organisationInput")
        .setLabel("ORGANISATION NAME (Optional)")
        .setStyle(TextInputStyle.Short)
        .setPlaceholder("Give us your Org Name (No link)")
        .setRequired(false),
      celestrialInput = new TextInputBuilder()
        .setCustomId("celestrialbodyInput")
        .setLabel("CELESTIAL BODY")
        .setStyle(TextInputStyle.Short)
        .setRequired(true),
      coordinatesInput = new TextInputBuilder()
        .setCustomId("coordinatesInput")
        .setLabel("COORDINATES")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true),
      locationInput = new TextInputBuilder()
        .setCustomId("locationInput")
        .setLabel("NAME OF YOUR LOCATION")
        .setStyle(TextInputStyle.Short)
        .setRequired(true),
      observationInput = new TextInputBuilder()
        .setCustomId("observationInput")
        .setLabel("OBSERVATIONS (Optional)")
        .setStyle(TextInputStyle.Paragraph)
        .setPlaceholder("No Observations")
        .setRequired(false),
      Organisation = new ActionRowBuilder().addComponents(orgInput),
      Celestrial = new ActionRowBuilder().addComponents(celestrialInput),
      Coordiantes = new ActionRowBuilder().addComponents(coordinatesInput),
      Location = new ActionRowBuilder().addComponents(locationInput),
      Observations = new ActionRowBuilder().addComponents(observationInput);

    modal.addComponents(
      Celestrial,
      Location,
      Coordiantes,
      Organisation,
      Observations
    );

    await interaction.showModal(modal);
  },
};
