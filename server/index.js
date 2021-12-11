const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const db = require('./database/index.js');
const controller = require('./controllers/index.js');

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
app.use(express.static(__dirname + '/../client/dist'));

app.post('/match', bodyParser.json(), (req, res) => {
  console.log('post', req.body);
  let profile = req.body;
  const imageURL = `/assets/images/${req.body.firstFavorite}.jpg`
  profile.imageURL = imageURL;
  return controller.addProfile(profile, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).end({error: err});
    } else {
      console.log('data', data.match[0]);
      if (data.match[0].length > 0) {
        res.status(200).json(data.match[0]);
      } else {
        res.status(400).send('sorry, no matches');
      }
    }
  })
});
