"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");

const app = http.createServer(async (req, res) => {
  switch (req.url) {
    case "/":
      res.setHeader("Content-Type", "text/html");
      fs.createReadStream(path.join(__dirname, "../index.html")).pipe(res);
      break;

    case "/bundle.js":
      res.setHeader("Content-Type", "application/javascript");
    case "/bundle.js.map":
      fs.createReadStream(path.join(__dirname, "../bundles", req.url)).pipe(
        res
      );
      break;
  }
});

app.listen(process.env.PORT || 4343, () => {
  console.log("Test Server listening on :8080");
});
