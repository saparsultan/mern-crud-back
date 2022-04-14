const mongoose = require("mongoose");

const FriendSchema = new mongoose.Schema({
  name: {
    type: "String",
    required: true,
  },
  age: {
    type: "Number",
    required: true,
  },
  description: {
    type: "String",
    required: false,
  },
});

const FriendModal = mongoose.model("friends", FriendSchema);

module.exports = FriendModal;