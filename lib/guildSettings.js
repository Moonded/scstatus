// import * as fs from "fs";
const fs = require("fs");

function guildSettings(guildId) {
  var data = fs.readFileSync("./db/guildSettings.json", "utf8");
  const serverObject = JSON.parse(data).find((guild) => guild.id === guildId);
  return serverObject;
}

module.exports = guildSettings;
