var express = require('express')
var router = express.Router()
const uuid = require('uuid/v1');
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-2'});
const dynamoDB = new AWS.DynamoDB.DocumentClient();

//functions to check if certain element exists
router.param('noteId', (req, res, next, id) => {
  req.noteId = id;
  const params = {
    TableName: 'notes',
    Key: {
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

router.post('/', (req, res, next) => {
  const params = {
    TableName: 'notes',
    Item: {
      userId: req.body.userId,
      noteId: uuid(),
      title: req.body.title,
      author: req.body.author,
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
      res.status(201).send("post successful");
    }
  });
});

router.get('/', (req, res, next) => {
  dynamoDB.scan({
    TableName: 'notes',
    Limit: 100
  }, (err, data) => {
    if(err)
      return next(err);
    if(data)
      res.status(200).send(data.Items);
    else {
      res.send("empty table");
    }
  });
});

router.get('/:noteId', (req, res, next) => {
  res.send(req.notes);
});

router.delete('/:noteId', (req, res, next) => {
  const params = {
    Key: {
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

module.exports = router
