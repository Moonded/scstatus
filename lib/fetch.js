const fetch = require("node-fetch");
const { parse } = require("node-html-parser");

var statusTotal = new Map();
async function fetchPage(url, options) {
  const response = await fetch(url);
  if (response.ok) {
    const htmlDom = await response.text();
    var root;
    root = parse(htmlDom);

    const systemsContainer = root.querySelector(".systems-container").querySelectorAll(".system");

    var title, status, MockUP;

    for (var i = 0; i < systemsContainer.length; i++) {
      statusTotal.set(
        systemsContainer[i].querySelector(".system-title").text.replace(/\s\s+/g, "").replace(/\s+$/, ""),
        systemsContainer[i].querySelector(".system-status").text.replace(/\s\s+/g, "").replace(/\s+$/, "")
      );
    }
    return statusTotal;
  } 
}

module.exports = fetchPage;
