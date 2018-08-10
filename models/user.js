const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
  password: String,
  email: String,
  firstName: { type: String },
  lastName: { type: String },
  experience: String,
  instruments: {type: Array},
  influences: {type: Array},
  genres: {type: Array},
  dateUpdated: { type: Date, default: Date.now },
  endeavors: String,
  etCetera: String,
  instrumentsSeeked: {type: Array},
  skillSeeked: {type: Number},
  unreadMessages: Array,
  readMessages: Array,
},

  validPassword = function (password) {
    console.log('validating password...', password)
    return bcrypt.compareSync(password, this.password);
  }
);

UserSchema.pre('save', function (next) {
  let user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.validPassword = function (password) {
  console.log('validating password...', password)
  return bcrypt.compareSync(password, this.password)
}
// UserSchema.prototype.comparePassword = function (candidatePassword, cb) {
//   console.log('candPass:', candidatePassword, "this.pass:", this.password);
//   bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
//     if (err) return cb(err);
//     cb(null, isMatch);
//   });
// };

const User = mongoose.model("User", UserSchema);

module.exports = User;
