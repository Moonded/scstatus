const fetch = require("node-fetch");

async function Galactapedia(result) {
//   console.log();
//   const value = JSON.parse(result)[0];
  const extract = { value: JSON.parse(result)[0] };
  const js = `{ allArticle ( where: { slug: {eq: "${extract.value}" } }) {edges { node { id title slug body }}}}`;
  const response = await fetch("https://robertsspaceindustries.com/galactapedia/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: js,
    }),
  });

  return await response.json();
}

module.exports = Galactapedia;
