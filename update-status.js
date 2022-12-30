const fetchPage = require("./lib/fetch"),
  prisma = require("@prisma/client"),
  prismaClient = new prisma.PrismaClient();

(async () => {
  const resp = await fetchPage("https://status.robertsspaceindustries.com/");
  const pushGalactapedia = await prismaClient.status.createMany({
    data: {
      Platform: await resp.get("Platform"),
      PersistentUniverse: await resp.get("Persistent Universe"),
      PersistentTestUniverse: "N/A",
      ElectronicAccess: await resp.get("Electronic Access"),
    },
    skipDuplicates: true,
  });
})();
