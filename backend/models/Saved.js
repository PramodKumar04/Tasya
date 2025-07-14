const { model } = require("mongoose");
const { savedSchema } = require("../schema/Saved.js");

const savedModel = model("Saved", savedSchema);

module.exports = { savedModel };
