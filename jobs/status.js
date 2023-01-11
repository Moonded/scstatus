const fetchPage = require("../lib/fetch"),
  CronJob = require("cron").CronJob,
  prisma = require("@prisma/client"),
  prismaClient = new prisma.PrismaClient();

require("console-stamp")(console, {
  format: ":date(HH:MM:ss.l).white :label()",
});

console.log("Starting Up Cron Job");

var job = new CronJob("*/10 * * * *", async (err) => {
  if (err) {
    console.error(err);
  }

  const resp = await fetchPage("https://status.robertsspaceindustries.com/");
  if (resp == null) {
    console.error("Error Fetching RSI Status");
    return;
  }
  const pushGalactapedia = await prismaClient.status.createMany({

    data: {
      Platform: await resp.get("Platform"),
      PersistentUniverse: await resp.get("Persistent Universe"),
      PersistentTestUniverse: "N/A",
      ElectronicAccess: await resp.get("Electronic Access"),
    },

    skipDuplicates: true,
  });

  console.log("Fetched RSI Status");
});

job.start();
