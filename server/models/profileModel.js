const mongoose = require('mongoose');
const { Schema } = mongoose;

const profileSchema = new mongoose.Schema({
  userName: String,
  email: String,
  imageURL: String,
  firstFavorite: String,
  firstReasons: String,
  secondFavorite: String,
  secondReasons: String,
  hasPet: Boolean,
  petBreed: String
});

const Profile = mongoose.model('Profile', profileSchema);


module.exports = Profile;