const fs = require("fs");
const path = require("path");

const dirs = fs.readdirSync(path.join(__dirname, "./src/plugins"));
dirs.forEach(dir => {
  try {
    fs.renameSync(
      path.join(__dirname, "src/plugins", dir, "main.ts"),
      path.join(__dirname, "src/plugins", dir, "slatePlugin.ts")
    );
  } catch (e) {
    console.log("e :", e);
  }
});
