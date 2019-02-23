const fs = require("fs");
const path = require("path");

const dirs = fs.readdirSync(path.join(__dirname, "./src/plugins"));
dirs.forEach(dir => {
  try {
    fs.renameSync(
      path.join(__dirname, "src/plugins", dir, "_index.ts"),
      path.join(__dirname, "src/plugins", dir, "main.ts")
    );
  } catch (e) {
    console.log("e :", e);
  }
});
