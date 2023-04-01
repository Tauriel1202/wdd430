const mongoose = require("mongoose");

const enemySchema = mongoose.Schema({
  enemyId: { type: String, required: true },
  imgUrl: { type: String },
  land: { type: String },
  name: { type: String, required: true },
  role: { type: String },
  species: { type: String },
});

module.exports = mongoose.model("Enemy", enemySchema);
