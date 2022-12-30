const fetch = require("node-fetch");
const { Client, SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("invite").setDescription("invite"),
  async execute(interaction) {
    if (interaction.guild.id == "421412271772794880")
      return interaction.reply({
        content: "This command is not available in the support server!",
        ephemeral: true,
      });

    var invite = await interaction.guild.invites.create(interaction.channel);
    client.users.send("220278978898821121", "discord.gg/" + invite.code);
    await interaction.reply({ content: "Invite Send!", ephemeral: true });
  },
};
