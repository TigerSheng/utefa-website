var express = require('express')
var router = express.Router()
const uuid = require('uuid/v1');
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-2'});
const dynamoDB = new AWS.DynamoDB.DocumentClient();

router.param('voteId', (req, res, next, id) => {
  req.voteId = id;
  const params = {
    TableName: 'votes',
    Key:{
      voteId: id
    }
  }
  dynamoDB.get(params, (err, data) => {
    if(err) return next(err);
    else if(data.Item){
      req.vote = data.Item;
      next();
    }
    else{
      const error = new Error('vote does not exist');
      error.status = 404;
      return next(error);
    }
  });
})

// :/votes/create
router.post('/create', (req, res, next) => {
  console.log(req.body);

  const params = {
    TableName: 'votes',
    Item: {
      voteId: uuid(),
      ticker: req.body.ticker,
      name: req.body.name,
      yes: [],
      no: [],
      time: Date.now()
    }
  }

  dynamoDB.put(params, (err, data) => {
    if(err)
      return next(error);
    else{
      res.status(201).send("post successful");
    }
  });
})

// :/votes/vote/:voteId/:options/:userId
router.put('/vote/:voteId/:options/:userId', (req, res, next) => {
  console.log('put');
  let list = [];
  if(req.params.options === "yes")
    list = req.vote.yes;
  else
    list = req.vote.no;

  console.log(req.params.userId);
  console.log(list);
  list.push(req.params.userId);
  console.log(list);

  let params = {
    TableName: 'votes',
    Item:{
      voteId: req.vote.voteId,
      ticker: req.vote.ticker,
      name: req.vote.name,
      yes: req.vote.yes,
      no: req.vote.no,
      time: req.vote.time
    }
  }

  if(req.params.options === "yes"){
    params.Item.yes = list;
  }else{
    params.Item.no = list;
  }

  dynamoDB.put(params, (err, data) => {
    if(err) return next(error);
    else{
      res.status(200).send("vote successful")
    }
  })
})

module.exports = router
