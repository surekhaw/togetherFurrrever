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
  petBreed: String,
  petAttributes: String,
  petIQ: Number
});

const Profile = mongoose.model('Profile', profileSchema, 'profiles');


module.exports = Profile;