const db = require('../database/index.js');
const Dogs = require('../models/dogModel.js');

const getDogs = (input, callback) => {
  let attributes = input.split(', ');
  return Dogs.find(
    {
      "$or": [
          { "Temperment" : { "$regex": attributes[0], "$options":"i"} },
          { "Temperment" : { "$regex": attributes[1], "$options":"i"} },
          { "Temperment" : { "$regex": attributes[2], "$options":"i"} },
      ]
  }, (err, dogs) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      const bestDogMatches = [];
      const goodDogMatches = [];
      console.log('dog', typeof dogs[0].Temperment);
      var attribute0 = new RegExp( attributes[0], 'gi');
      var attribute1 = new RegExp( attributes[1], 'gi');
      var attribute2 = new RegExp( attributes[2], 'gi');
      dogs.forEach(dog => {
        if (dog.Temperment.match(attribute0) && dog.Temperment.match(attribute1) && dog.Temperment.match(attribute2)) {
          bestDogMatches.push(dog);
        } else if (dog.Temperment.match(attribute0) && dog.Temperment.match(attribute1)) {
          goodDogMatches.push(dog);
        } else if (dog.Temperment.match(attribute1) && dog.Temperment.match(attribute2)) {
          goodDogMatches.push(dog);
        } else if (dog.Temperment.match(attribute0) && dog.Temperment.match(attribute2)) {
          goodDogMatches.push(dog);
        }
      });
      if (bestDogMatches.length > 0) {
        callback(null, bestDogMatches);
      } else if (goodDogMatches.length > 0) {
        callback(null, goodDogMatches);
      } else {
        callback(null, dogs);
      }
    }
  });
};

// getMatch
module.exports = { getDogs };