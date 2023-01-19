const { REST, Routes } = require("discord.js");
const fs = require("node:fs");
const dotenv = require("dotenv");
dotenv.config();

require("console-stamp")(console, {
  format: ":date(HH:MM:ss.l).white :label()",
});

const commands = [];
// Grab all the command files from the commands directory you created earlier
const commandFiles = fs.readdirSync("./commandsGlobal").filter((file) => file.endsWith(".js"));

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
  const command = require(`./commandsGlobal/${file}`);
  commands.push(command.data.toJSON());
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

// and deploy your commands!

//Global Commands
(async () => {
  try {
    console.log(`Started refreshing ${commands.length} Local application (/) commands.`);

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENTID, process.env.GUILDID),
      { body: commands }
    );

    console.log(`Successfully reloaded ${data.length} Local application (/) commands.`);
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();



