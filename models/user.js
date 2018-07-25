const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  password: String,
  email: String,
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  instruments: {type: Array, required: true},
  genres: {type: Array, required: true},
  influences: {type: Array, required: true},
  dateUpdated: { type: Date, default: Date.now },
  instrumentsSeeked: {type: Array, required: true},
  skillSeeked: {type: Number, required: true},
  unreadMessages: Array,
  readMessages: Array,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
