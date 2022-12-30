const fetchPage = require("./lib/fetch"),
  prisma = require("@prisma/client"),
  prismaClient = new prisma.PrismaClient();

const guild = {
  id: "421412271772794880",
};

(async () => {
  const resp = await fetchPage("https://status.robertsspaceindustries.com/");
  const pushGalactapedia = await prismaClient.guild.upsert({
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
})();
