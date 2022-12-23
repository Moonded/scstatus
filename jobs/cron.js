const fetchPage = require("../lib/fetch");
const CronJob = require("cron").CronJob;
const fs = require("fs");
console.log("Starting Up Cron Job");

var job = new CronJob("*/10 * * * *", async (err) => {
  if (err) {
    console.error(err);
  }

  const resp = await fetchPage("https://status.robertsspaceindustries.com/");
  resp.set("Persistent Test Universe", "Operational ");
  const body = JSON.stringify([...resp]);
  const object = {};

  JSON.parse(body).forEach(([key, value]) => {
    object[key] = value;
  });
  const writeBody = JSON.stringify(object);
  console.log(writeBody)

  fs.writeFileSync("./db/html_status.json", writeBody);

  console.log("Fetched RSI Status");
});

job.start();
console.log("Cron Job Started");
