const mongoose = require("mongoose");

const sequenceSchema = mongoose.Schema({
  maxDocId: { type: String },
  maxMsgId: { type: String },
  maxContactId: { type: String },
  // maxContactId: { type: Int32Array },
});

module.exports = mongoose.model("Sequence", sequenceSchema);
