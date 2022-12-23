const express = require("express"),
  dataFetch = require("../lib/db"),
  dataWrite = require("../lib/write"),
  bodyParser = require("body-parser"),
  app = express(),
  port = 3000,
  jsonParser = bodyParser.json(),
  urlencodedParser = bodyParser.urlencoded({ extended: false });
fs = require("fs");

app.get("/", async (req, res) => {
  const data = JSON.parse(await dataFetch("endpoints"));
  res.json(data);
});

app.get("/faq", async (req, res) => {
  const data = JSON.parse(await dataFetch("faq"));
  res.json(data);
});

app.get("/info", async (req, res) => {
  const data = JSON.parse(await dataFetch("info"));
  res.json(data);
});

app.get("/incidents", async (req, res) => {
  const data = JSON.parse(await dataFetch("incidents"));
  res.json(data);
});

app.get("/status", async (req, res) => {
  const data = JSON.parse(await dataFetch("html_status"));
  res.json(data);
});

app.get("/status/states", async (req, res) => {
  const data = JSON.parse(await dataFetch("Status"));
  res.json(data);
});

app.get("/discovery", async (req, res) => {
  const data = JSON.parse(await dataFetch("discovery"));
  res.json(data);
});

app.post("/discovery", jsonParser, async (req, res) => {
  // console.log("Discovery Body: ", req.body);

  const object = {};

  req.body.forEach(([key, value]) => {
    object[key] = value;
  });

  const data = JSON.parse(await dataFetch("discovery"));
  var obj
  obj = [...data, object];
  // console.log(obj);

  dataWrite("discovery", JSON.stringify(obj));

  // console.log('Converted Object: ', object);
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
