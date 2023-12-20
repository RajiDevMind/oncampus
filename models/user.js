const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, min: 4, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, min: 4, required: true },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
