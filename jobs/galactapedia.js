const CronJob = require("cron").CronJob;
const fs = require("fs");
const fetch = require("node-fetch");

require("console-stamp")(console, {
  format: ":date(HH:MM:ss.l).white :label()",
});

// console.log("Starting Up Cron Job");
(async () => {
  // var job = new CronJob("*/10 * * * *", async (err) => {
  //   if (err) {
  //     console.error(err);
  //   }
  const response = await fetch("https://robertsspaceindustries.com/galactapedia/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `{
        allArticle {
          edges {
            node {
              id
              title
              slug
            }
          }
        }
      }
      `,
    }),
  });

  if (response.ok) {
    const result = await response.json();
    console.log(result);
    fs.writeFile("./db/galactapedia.json", JSON.stringify(result), (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
})();
// });

// job.start();
console.log("Cron Job Started");
