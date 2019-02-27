// User.js
var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  //LatLng: String,
  password: {
    type: String,
    required: true
  },
});


const User = mongoose.model('users', UserSchema);
module.exports = User;
