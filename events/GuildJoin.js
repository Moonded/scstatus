const { Events } = require("discord.js"),
  prisma = require("@prisma/client"),
  prismaClient = new prisma.PrismaClient();

module.exports = {
  name: Events.GuildCreate,
  once: true,
  async execute(guild) {
    console.log("JOIN: " + guild.name + " (" + guild.id + ")");
    const JoinGuild = await prismaClient.guild.upsert({
      where: {
        id: guild.id,
      },
      update: {},
      create: {
        id: guild.id,
        settings: {
          create: [
            {
              serverUpload: false,
              discoveryUploadURI: "N/A",
              UploadUsers: [],
            },
          ],
        },
      },
    });
  },
};
