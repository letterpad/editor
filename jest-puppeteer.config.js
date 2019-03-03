let args = [];
if (process.env.CHROME_FLAGS) {
  args = process.env.CHROME_FLAGS.split(" ");
}

console.log("using chrome flags", args);

module.exports = {
  server: {
    command: "node test-utils/server.js",
    port: 4343
  },
  launch: {
    args,
    headless: true
  },
  browserContext: "default"
};
