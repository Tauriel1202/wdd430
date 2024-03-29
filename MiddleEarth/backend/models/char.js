const mongoose = require("mongoose");

const charSchema = mongoose.Schema({
  // id: { type: Number },
  charId: { type: String, required: true },
  imgUrl: { type: String },
  land: { type: String },
  name: { type: String, required: true },
  role: { type: String },
  species: { type: String },
});

module.exports = mongoose.model("Char", charSchema);
