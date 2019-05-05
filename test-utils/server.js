"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");

const app = http.createServer(async (req, res) => {
  switch (req.url) {
    case "/":
      res.setHeader("Content-Type", "text/html");
      fs.createReadStream(path.join(__dirname, "../index.test.html")).pipe(res);
      break;

    case "/dist/bundles/editor.demo.js":
      res.setHeader("Content-Type", "application/javascript");
    case "/dist/bundles/editor.demo.js.map":
      fs.createReadStream(path.join(__dirname, "../", req.url)).pipe(res);
      break;
  }
});

const port = process.env.PORT || 4343;

app.listen(port, () => {
  console.log(`Test Server listening on :${port}`);
});
