const mongoose = require("mongoose");

const landSchema = mongoose.Schema({
  landId: { type: String, required: true },
  name: { type: String, required: true },
  imgUrl: { type: String, required: true },
});

module.exports = mongoose.model("Land", landSchema);
