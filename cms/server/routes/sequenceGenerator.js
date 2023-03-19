var Sequence = require("../models/sequence");

var maxDocId = '0';
var maxMsgId = '0';
var maxContactId = '0';
var sequenceId = '0';

function SequenceGenerator(res) {
  Sequence.findOne().exec(function (err, sequence) {
    if (err) {
      return res.status(500).json({
        title: "An error occurred",
        error: err,
      });
    }

    sequenceId = sequence._id;
    maxDocId = ++sequence.maxDocId;
    maxMsgId = ++sequence.maxMsgId;
    maxContactId = ++sequence.maxContactId;
  });
}

SequenceGenerator.prototype.nextId = function (collectionType) {
  var updateObject = {};
  var nextId;

  switch (collectionType) {
    case "docs":
      maxDocId++;
      updateObject = { maxDocId: toString(maxDocId) };
      nextId = maxDocId;
      break;
    case "msgs":
      maxMsgId++;
      updateObject = { maxMsgId: maxMsgId };
      nextId = maxMsgId;
      break;
    case "contacts":
      maxContactId++;
      updateObject = { maxContactId: maxContactId };
      nextId = maxContactId;
      break;
    default:
      return -1;
  }

  Sequence.update({ _id: sequenceId }, { $set: updateObject }, function (err) {
    if (err) {
      console.log("nextId error = " + err);
      return null;
    }
  });

  return nextId;
};

module.exports = new SequenceGenerator();
