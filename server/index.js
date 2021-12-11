const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../database/index.js');
const controller = require('./controllers/index.js');

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
app.use(express.static(__dirname + '/../client/dist'));

app.post('/match', bodyParser.json(), (req, res) => {
  console.log('post', req.body);
  return controller.getDogs(req.body.secondReasons, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).end({error: err});
    } else {
      res.status(200).json(data).end();
    }
  })
});
