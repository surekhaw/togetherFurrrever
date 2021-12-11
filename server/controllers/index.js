const db = require('../../database/index.js');
const Dogs = require('../models/dogsModel.js');

const getDogs = (input, callback) => {
  let attributes = input.split(', ');
  return db.getRecipe(ingredients, (err, recipe) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null, recipe);
    }
  });
};

module.exports = { getDogs };