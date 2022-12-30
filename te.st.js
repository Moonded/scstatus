const fetch = require("node-fetch"),
  { parse } = require("node-html-parser"),
  Data = new Map();

async function shipMatrix() {
  const response = await fetch("https://robertsspaceindustries.com/ship-matrix");
  if (response.ok) {
    const html = await response.text();
    var root = parse(html);

    const container = root.querySelector(".shipscontainer");
    console.log(container);
  }
}

shipMatrix();
