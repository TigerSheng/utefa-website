var express = require('express')
var router = express.Router()
const uuid = require('uuid/v1');
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-2'});
const dynamoDB = new AWS.DynamoDB.DocumentClient();

router.param('contentId', (req, res, next, id) => {
  req.contentId = id;
  const params = {
    TableName: 'learning-content',
    Key: {
      contentId: id
    }
  }
  dynamoDB.get(params, (err, data) => {
    if(err) return next(err)
    else if(data.Item){
      req.item = data.Item
      next()
    }else{
      const error = new Error('content does not exist')
      error.status = 404
      return next(error);
    }
  })
})

router.post('/', (req, res, next) => {
  const params = {
      TableName: 'learning-content',
      Item: {
        contentId: uuid(),
        file: {
          name: req.body.name,
          link: req.body.attachment
        },
        description: req.body.description,
        postedAt: Date.now(),
        author: req.body.author,
        isPublic: req.body.isPublic
      }
  }
  dynamoDB.put(params, (err, data) => {
    if(err)
      return next(err);
    else {
      res.status(201).send("upload learning content successfully")
    }
  })
})

router.get('/', (req, res, next) => {
  dynamoDB.scan({
    TableName: 'learning-content'
  }, (err, data) => {
    if(err)
      return next(err);
    else if(data)
      res.status(200).send(data.Items);
    else {
      res.send("no content available")
    }
  })
})

router.delete('/:contentId', (req, res, next) => {
  const params = {
    TableName: 'learning-content',
    Key: {
      contentId: req.contentId
    }
  }
  dynamoDB.delete(params, (err, data) => {
    if(err) {
      return next(err)
    }else
      res.status(204).send('deleted')
  })
})

router.get('/public', (req, res, next) => {
  dynamoDB.scan({
    TableName: 'learning-content',
    FilterExpression: 'isPublic = :p',
    ExpressionAttributeValues: {
      ':p': true
    }
  }, (err, data) => {
    if(err)
      return next(err);
    else if(data)
      res.status(200).send(data.Items);
    else {
      res.send("no content available")
    }
  })
})

module.exports = router
