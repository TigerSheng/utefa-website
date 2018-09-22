var express = require('express')
var router = express.Router()
const uuid = require('uuid/v1');
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-2'});
const dynamoDB = new AWS.DynamoDB.DocumentClient();

//helper function
const _MS_PER_DAY = 1000 * 60 * 60 * 24;

// a and b are javascript Date objects
function dateDiffInDays(a, b) {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

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

  //check time <= 2 days
  const time = new Date(req.vote.time)
  const now = new Date(Date.now())
  if(dateDiffInDays(time, now) > 2){
    const error = new Error("Vote expired");
    error.status = 400;
    return next(error);
  }

  //make new list of voters
  let list = [];
  if(req.params.options === "yes")
    list = req.vote.yes;
  else
    list = req.vote.no;
  list.push(req.params.userId);

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
