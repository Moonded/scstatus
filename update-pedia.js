const prisma = require("@prisma/client"),
  fs = require("fs"),
  fetch = require("node-fetch"),
  prismaClient = new prisma.PrismaClient();

(async () => {
  console.time("[Complete] Galactapedia Querry");
  console.log("[Starting] Galactapedia Querry");
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
              tags {
                ... on Tag {
                  name
                }
              }
              categories {
                ... on Category {
                  name
                }
              }
            }
          }
        }
      }
      `,
    }),
  });
  console.timeEnd("[Complete] Galactapedia Querry");
  const result = await response.json();
  dataArray = result.data.allArticle.edges;
  for (i = 0; i < dataArray.length; i++) {
    dataArray[i].node.title;
  }
  // console.log(dataArray.node.categories);
  console.log("[Starting] DB Push");
  const pushGalactapedia = await prismaClient.galactapedia.createMany({
    data: dataArray.map((data) => ({
      id: data.node.id,
      slug: data.node.slug,
      title: data.node.title,
      tags: data.node.tags.filter((category) => category != null).map((tag) => tag.name),
      category: data.node.categories.filter((category) => category != null).map((category) => category.name),
    })),
    skipDuplicates: true,
  });

  // const pushGalactapedia = await prismaClient.galactapedia.upsert({
  //   where: dataArray.map((data) => ({
  //     id: data.node.id,
  //   })),
  //   update: {},
  //   create: {
  //     data: dataArray.map((data) => ({
  //       id: data.node.id,
  //       slug: data.node.slug,
  //       title: data.node.title,
  //       tags: data.node.tags.filter((category) => category != null).map((tag) => tag.name),
  //       category: data.node.categories.filter((category) => category != null).map((category) => category.name),
  //     })),
  //   },
  // });

  console.log("[Complete] Updated:", pushGalactapedia.count, "entries");
})();
