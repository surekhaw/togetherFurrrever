const mongoose = require('mongoose');
const { Schema } = mongoose;

const dogSchema = new mongoose.Schema({
  "BreedName": String,
  "AltBreedName" : String,
  "Temperment" : String,
  "Intelligence" : Number,
}

const Dog = mongoose.model('Dog', dogSchema, 'dogs');

module.exports = Dog;