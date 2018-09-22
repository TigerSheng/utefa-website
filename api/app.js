const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const notes = require('./notes')
const votes = require('./votes')

app.use(bodyParser.json());
//handle CORS response headers
app.use((req, res, next) => {
    res.set({
      'Access-Control-Allow-Origin': '*',
      "Access-Control-Allow-Credentials": true
    });
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Amz-Security-Token, x-amz-date, Authorization")
    next();
});

app.get('/', (req, res, next) => {
  res.send('front page');
});

app.use('/notes', notes);

app.use('/votes', votes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).send(err.message);
});

module.exports = app;
