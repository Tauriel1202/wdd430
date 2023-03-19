const mongoose = require("mongoose");

const docsSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  url: { type: String, required: true },
  children: { type: Array },
});

module.exports = mongoose.model("Document", docsSchema);
