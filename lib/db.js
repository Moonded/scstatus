// import * as fs from "fs";
const fs = require("fs");

function dataFetch(file) {
  const path = `./db/${file}.json`;
  var data = fs.readFileSync(path, "utf8");
  return data;
}

module.exports = dataFetch;