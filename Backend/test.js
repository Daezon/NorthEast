const HumanToMilliseconds = require("human-to-milliseconds");
const prettyMilliseconds = require("pretty-ms");
try {
  const translated = HumanToMilliseconds("1h50m");
  console.log();
} catch (err) {
  console.log(err);
}
