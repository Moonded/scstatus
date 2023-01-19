const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    StringSelectMenuBuilder,
    ModalBuilder,
    TextInputBuilder,
  } = require("discord.js"),
  crypto = require("crypto"),
  fetch = require("node-fetch"),
  { sanatizeModal } = require("../lib/sanatize");

// import {
//   SlashCommandBuilder,
//   EmbedBuilder,
//   ActionRowBuilder,
//   ButtonBuilder,
//   StringSelectMenuBuilder,
//   ModalBuilder,
//   TextInputBuilder,
//   Interaction,
// } from "discord.js";
// import * as crypto from "crypto";
// import fetch from "node-fetch";
// // import { sanatizeModal } from "../lib/sanatize";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dev")
    .setDescription("Report a discovery"),

  async execute(interaction) {
    const dataMap = new Map();
    var dataMapCheckArray;
    dataMap.set("uuid", crypto.randomUUID());

    const discoveryEmbed = new EmbedBuilder()
      .setColor(0x00ff00)
      .setTitle("Discovery Report Card Wizard")
      .setDescription(
        "Please fill out the following fields using the buttons below. \n Once you have submitted the details, you can submit the form."
      )
      .setFields(
        { value: "\u200B", name: "System", inline: true },
        { value: "\u200B", name: "Version", inline: true },
        {
          value: "\u200B",
          name: "POI Type",
          inline: true,
        },
        {
          value: "\u200B",
          name: "Celestrial",
          inline: true,
        },
        { value: "\u200B", name: "Location", inline: true },
        {
          value: "\u200B",
          name: "Coordiante",
          inline: true,
        },
        {
          value: "\u200B",
          name: "Organisation",
          inline: true,
        },
        {
          value: interaction.user.username,
          name: "Discoverd by",
          inline: true,
        },
        { value: "\u200B", name: "Observations", inline: true }
      )
      .setTimestamp()
      .setFooter({ text: dataMap.get("uuid") });

    const ButtonRow = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder().setCustomId("system").setLabel("System").setStyle(1)
      )
      .addComponents(
        new ButtonBuilder()
          .setCustomId("version")
          .setLabel("Version")
          .setStyle(1)
      )
      .addComponents(
        new ButtonBuilder().setCustomId("poi").setLabel("POI").setStyle(1)
      )
      .addComponents(
        new ButtonBuilder()
          .setCustomId("details")
          .setLabel("Details")
          .setStyle(1)
      )
      .addComponents(
        new ButtonBuilder()
          .setCustomId("submit")
          .setLabel("Submit")
          .setStyle(3)
          .setDisabled(true)
      );

    const SystemMenu = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId("systemMenu")
        .setPlaceholder("Nothing selected")
        .addOptions([
          {
            label: "Stanton",
            value: "Stanton",
          },
          {
            label: "Pyro",
            value: "Pyro",
          },
        ])
    );

    const POIMenu = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId("poiMenu")
        .setPlaceholder("Nothing selected")
        .addOptions([
          {
            label: "Comm Array",
            value: "comm_array",
          },
          {
            label: "Space Staion",
            value: "space_station",
          },
          {
            label: "Major Landing Zone",
            value: "major_landing_zone",
          },
          {
            label: "Small Oujtpost (No Pads)",
            value: "small_outpost_no_pads",
          },
          {
            label: "Large Outpost (Has Pads)",
            value: "large_outpost_has_pads",
          },
          {
            label: "Aid Shelter",
            value: "aid_shelter",
          },
          {
            label: "Scrapyard",
            value: "scrapyard",
          },
          {
            label: "Bunker/Underground Facility",
            value: "bunker_underground_facility",
          },
          {
            label: "Cave (Ship Only)",
            value: "cave_ship_only",
          },
          {
            label: "Cave (Foot Only)",
            value: "cave_foot_only",
          },
          {
            label: "Cave (Foot/Vehicle)",
            value: "cave_foot_vehicle",
          },
          {
            label: "Cave (Foot/Vehicle/Ship)",
            value: "cave_foot_vehicle_ship",
          },
          {
            label: "Wreck/Crash Site",
            value: "wreck_crash_site",
          },
          {
            label: "Landmark/Other",
            value: "landmark_other",
          },
          {
            label: "Derelict Outpost",
            value: "derelict_outpost",
          },
          {
            label: "Event Location",
            value: "event_location",
          },
        ])
    );

    const DiscoveryModal = new ModalBuilder()
      .setCustomId("DiscoveryModal")
      .setTitle("Discovery")
      .addComponents(
        (Celestial = new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId("celestrialbodyInput")
            .setLabel("CELESTIAL BODY")
            .setStyle(1)
            .setRequired(true)
        )),
        (Location = new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId("locationInput")
            .setLabel("NAME OF YOUR LOCATION")
            .setStyle(1)
            .setRequired(true)
        )),
        (Coordiantes = new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId("coordinatesInput")
            .setLabel("COORDINATES")
            .setStyle(2)
            .setRequired(true)
        )),
        (Organisations = new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId("organisationInput")
            .setLabel("ORGANISATION NAME (Optional)")
            .setStyle(1)
            .setPlaceholder("Give us your Org Name (No link)")
            .setRequired(false)
        )),
        (Observations = new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId("observationInput")
            .setLabel("OBSERVATIONS (Optional)")
            .setStyle(2)
            .setPlaceholder("No Observations")
            .setRequired(false)
        ))
      );

    const VersionMenu = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId("versionMenu")
        .setPlaceholder("Nothing selected")
        .addOptions([
          {
            label: "PTU",
            value: "PTU",
          },
          {
            label: "Live",
            value: "Live",
          },
        ])
    );

    const msg = await interaction.reply({
      embeds: [discoveryEmbed],
      components: [ButtonRow],
    });

    var submitted;

    const collector = msg.createMessageComponentCollector({
      time: 3600000,
      filter: (i) => i.user.id === interaction.user.id,
    });

    collector.on("collect", async (mnu) => {
      switch (mnu.customId) {
        case "systemMenu":
          dataMap.set("system", mnu.values[0]);
          discoveryEmbed.data.color = 0x00ff00;
          if (
            (dataMapCheckArray =
              [
                dataMap.has("system"),
                dataMap.has("version"),
                dataMap.has("poi"),
              ].every((v) => v === true) === true)
          ) {
            ButtonRow.components[4].data.disabled = false;
          }
          discoveryEmbed.data.fields[0].value = mnu.values[0];
          mnu.update({
            embeds: [discoveryEmbed],
            components: [ButtonRow],
          });
          break;
        case "versionMenu":
          dataMap.set("version", mnu.values[0]);
          discoveryEmbed.data.color = 0x00ff00;
          if (
            (dataMapCheckArray =
              [
                dataMap.has("system"),
                dataMap.has("version"),
                dataMap.has("poi"),
              ].every((v) => v === true) === true)
          ) {
            ButtonRow.components[4].data.disabled = false;
          }
          discoveryEmbed.data.fields[1].value = mnu.values[0];
          mnu.update({
            embeds: [discoveryEmbed],
            components: [ButtonRow],
          });
          break;
        case "poiMenu":
          dataMap.set("poi", mnu.values[0]);
          discoveryEmbed.data.color = 0x00ff00;
          if (
            (dataMapCheckArray =
              [
                dataMap.has("system"),
                dataMap.has("version"),
                dataMap.has("poi"),
              ].every((v) => v === true) === true)
          ) {
            ButtonRow.components[4].data.disabled = false;
          }
          discoveryEmbed.data.fields[2].value = mnu.values[0];
          mnu.update({
            embeds: [discoveryEmbed],
            components: [ButtonRow],
          });
          break;
        case "system":
          discoveryEmbed.data.color = 0xffff00;
          mnu.update({
            embeds: [discoveryEmbed],
            components: [ButtonRow, SystemMenu],
          });
          break;
        case "version":
          discoveryEmbed.data.color = 0xffff00;
          mnu.update({
            embeds: [discoveryEmbed],
            components: [ButtonRow, VersionMenu],
          });
          break;
        case "poi":
          discoveryEmbed.data.color = 0xffff00;
          mnu.update({
            embeds: [discoveryEmbed],
            components: [ButtonRow, POIMenu],
          });
          break;
        case "details":
          getModalSubmit();
          mnu.showModal(DiscoveryModal);
          break;
        case "submit":
          discoveryEmbed.data.title = "Discovery Report";
          delete discoveryEmbed.data.description;
          mnu.update({
            embeds: [discoveryEmbed],
            components: [],
          });
          fetch(
            "https://discord.com/api/webhooks/1063858701649326080/swzEc2H8vjTbOEiKNYdmFgbnfbGioJOItxSMkkiZ3WXRN_WshUyeChtJKHgLjsQEeu4Q",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                content:
                  "```json\n" +
                  JSON.stringify(Object.fromEntries(dataMap)) +
                  "\n```",
              }),
            }
          );
          collector.stop();
          break;
        default:
          discoveryEmbed.data.color = 0xff0000;
          discoveryEmbed.data.description =
            "Please fill out the following fields using the buttons below. \n Once you have submitted the details, you can submit the form.\n\n**ERROR**\n\nThe button clicked was not recognised.";
          mnu.update({
            embeds: [discoveryEmbed],
            components: [ButtonRow],
          });
      }
    });

    collector.on("end", (collected, reason) => {
      switch (reason) {
        case "time":
          interaction.followUp({
            content: "You took to long to fill the form.",
            ephemeral: true,
          });
          break;
        case "messageDelete":
          interaction.followUp({
            content: "The message was deleted.",
            ephemeral: true,
          });
          break;
        case "user":
          interaction.followUp({
            content: "Thank you for submitting.",
            ephemeral: true,
          });
          break;
        case "channelDelete":
          break;
        case "guildDelete":
          break;
        default:
          interaction.followUp({
            content:
              "Something went wrong and ended the Interaction collector.",
            ephemeral: true,
          });
      }
    });

    async function getModalSubmit() {
      submitted = await interaction
        .awaitModalSubmit({
          time: 86400000,
          filter: (i) => i.user.id === interaction.user.id,
        })
        .catch((error) => {
          console.error(error);
          return null;
        });
      if (submitted.customId === "DiscoveryModal") {
        const [celestial, location, coordinates, organisation, observations] =
          submitted.fields.fields.map((field) => field.value);
        discoveryEmbed.data.fields[3].value = celestial.sanatizeModal();
        discoveryEmbed.data.fields[4].value = location.sanatizeModal();
        discoveryEmbed.data.fields[5].value = coordinates.sanatizeModal();
        discoveryEmbed.data.fields[6].value =
          organisation.sanatizeModal() || "None";
        discoveryEmbed.data.fields[8].value =
          observations.sanatizeModal() || "None";
        dataMap.set("celestial", celestial);
        dataMap.set("location", location);
        dataMap.set("coordinates", coordinates);
        dataMap.set("organisation", organisation || "None");
        dataMap.set("observations", observations || "None");
        if (dataMapCheckArray === true) {
          ButtonRow.components[4].data.disabled = false;
        }
        submitted.update({
          embeds: [discoveryEmbed],
          components: [ButtonRow],
        });
      }
    }
  },
};
