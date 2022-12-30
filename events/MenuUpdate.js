// const { Events, EmbedBuilder } = require("discord.js");
// const Galactapedia = require("../lib/fetchGalactapedia");
// const wait = require('node:timers/promises').setTimeout;

// module.exports = {
//   name: Events.InteractionCreate,
//   async execute(interaction) {
//     if (!interaction.isStringSelectMenu()) return;

//     if (interaction.customId === "selectGalactapedia") {
//       await interaction.deferUpdate();
//       await wait(4000);
//       await interaction.editReply({ content: "Something was selected!", components: [] });
//     }
//   },
// };
