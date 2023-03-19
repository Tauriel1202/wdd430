const mongoose = require("mongoose");

const contactsSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, requred: true },
  email: { type: String, requred: true },
  phone: { type: String },
  imgUrl: { type: String },
  group: [{ type: mongoose.Schema.Types.ObjectId, ref: "Contact" }],
});

module.exports = mongoose.model("Contact", contactsSchema);
