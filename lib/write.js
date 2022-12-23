// import * as fs from "fs";
const fs = require("fs");

function dataWrite(file, data) {
  const path = `./db/${file}.json`;
  var data = fs.writeFileSync(path, data, "utf8");
  return data;
}

module.exports = dataWrite;
