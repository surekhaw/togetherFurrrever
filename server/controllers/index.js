const db = require('../database/index.js');
const Dogs = require('../models/dogModel.js');
const Profile = require('../models/profileModel.js');

const getDog = (breed, callback) => {
  console.log('getting dog', breed);
  return Dogs.find({ "BreedName" : { "$regex": breed, "$options":"i" }}, (err, dog) => {
    if (err) {
      callback(err);
    } else {
      console.log('cb dog', dog);
      callback(null, dog);
    }
  })
};

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
      console.log('getting dogs');
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

const getProfiles = (dogs, callback) => {
  console.log('getting profiles', dogs);
  const profiles = Promise.all(dogs.map(dog => {
    return Profile.find(
      {"petBreed" : { "$regex": dog.BreedName, "$options":"i" }}, (err, matches) => {
        if (err) {
          console.log(err);
          callback(err);
        }
      });
    })
  )
  .then(profiles => {
    console.log('profiles', profiles)
    callback(null, profiles);
  });
};

const addProfile = (profile, callback) => {
  return getDog(profile.petBreed, (err, dog) => {
    if (err) {
      callback(err);
    } else {
      console.log('dog', dog);
      profile.petAttributes = dog[0].Temperment;
      profile.petIQ = dog[0].Intelligence;
      return Profile.findOneAndUpdate({ email: profile.email }, profile, { new: true, upsert: true }, (err, result) => {
        if (err) {
          callback(err);
        } else {
          getDogs(profile.secondReasons, (err, dogs) => {
            if (err) {
              callback(err)
            } else {
              getProfiles(dogs, (err, profiles) => {
                if (err) {
                  callback(err);
                } else {
                  callback(null, { 'match': profiles, 'new': result });
                }
              });
            }
          })
        }
      });
    }
  });
};

module.exports = { getDog, getDogs, getProfiles, addProfile };