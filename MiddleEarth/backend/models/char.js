const mongoose = require("mongoose");

const charSchema = mongoose.Schema({
  id: Number,
  imgUrl: String,
  land: { type: String, required: true },
  name: { type: String, required: true },
  role: String,
  species: { type: String, required: true },
});

module.exports = mongoose.model("Char", charSchema);
