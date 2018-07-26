const express = require('express')
const app = express()
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-2'});
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const bodyParser = require('body-parser');
const uuid = require('uuid/v1');

app.use(bodyParser.json());

app.post('/notes', (req, res, next) => {
  console.log(req.body);

  const params = {
    TableName: 'notes',
    Item: {
      userId: "1",
      noteId: uuid(),
      content: req.body.content,
      pinned: req.body.pinned
    }
  };
  dynamoDB.put(params, (err, data) => {
    if(err)
      res.send(err);
    else {
      res.send("successful");
    }
  });
});

app.get('/notes', (req, res, next) => {
  dynamoDB.scan({TableName: 'notes'}, (err, data) => {
    if(err)
      res.send(err);
    if(data)
      res.send(data.Items);
    else {
      res.send("nothing");
    }
  });
});

app.get('/', (req, res, next) => {
  res.send('front page');
});

module.exports = app;
