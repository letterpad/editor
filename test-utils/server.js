"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");

const app = http.createServer(async (req, res) => {
  if (req.url.endsWith(".editor.demo.js") || req.url === "/favicon.ico") {
    res.end("not allowed");
  }
  switch (req.url) {
    case "/":
      res.setHeader("Content-Type", "text/html");
      fs.createReadStream(path.join(__dirname, "../index.html")).pipe(res);
      break;

    case "/dist/bundles/editor.demo.js":
      res.setHeader("Content-Type", "application/javascript;charset=UTF-8");
    case "/dist/bundles/editor.demo.js.map":
      fs.createReadStream(path.join(__dirname, "../", req.url)).pipe(res);
    default:
      break;
  }
});

const port = process.env.PORT || 4343;

app.listen(port, () => {
  console.log(`Test Server listening on :${port}`);
});
