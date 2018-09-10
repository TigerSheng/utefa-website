const express = require('express')
const app = express()
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-2'});
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const bodyParser = require('body-parser');
const uuid = require('uuid/v1');

app.use(bodyParser.json());

//functions to check if certain element exists
app.param('userId', (req, res, next, id) => {
  req.userId = id;
  next();
})
app.param('noteId', (req, res, next, id) => {
  req.noteId = id;
  const params = {
    TableName: 'notes',
    Key: {
      userId: req.userId,
      noteId: id
    }
  };
  dynamoDB.get(params, (err, data) => {
    if(err) return next(err);
    else if(data.Item){
      req.notes = data.Item;
      next();
    }
    else{
      const error = new Error('note does not exist');
      error.status = 404;
      return next(error);
    }
  });
});

app.post('/notes', (req, res, next) => {
  console.log(req.body);

  const params = {
    TableName: 'notes',
    Item: {
      userId: "1",
      noteId: uuid(),
      content: req.body.content,
      attachment: req.body.attachment,
      pinned: req.body.pinned,
      postedAt: Date.now()
    }
  };
  dynamoDB.put(params, (err, data) => {
    if(err)
      return next(error);
    else{
      res.send("post successful");
    }
  });
});

app.get('/notes', (req, res, next) => {
  dynamoDB.scan({TableName: 'notes'}, (err, data) => {
    if(err)
      return next(err);
    if(data)
      res.send(data.Items);
    else {
      res.send("nothing");
    }
  });
});

app.get('/notes/:userId/:noteId', (req, res, next) => {
  res.send(req.notes);
});

app.get('/', (req, res, next) => {
  res.send('front page');
});

app.delete('/notes/:userId/:noteId', (req, res, next) => {
  const params = {
    Key: {
      userId: req.userId,
      noteId: req.noteId
    },
    TableName: 'notes'
  };
  dynamoDB.delete(params, (err, data) => {
    if(err){
      return next(err);
    }
    else{
      res.status(204).send('deleted');
    }
  });
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).send(err.message);
});

module.exports = app;
