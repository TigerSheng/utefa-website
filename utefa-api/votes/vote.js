import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

//helper function
const _MS_PER_DAY = 1000 * 60 * 60 * 24;
// a and b are javascript Date objects
function dateDiffInDays(a, b) {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

export async function main(event, context, callback) {
  let params = {
    TableName: "votes",
    // 'Key' defines the partition key and sort key of the item to be updated
    // - 'noteId': path parameter
    Key: {
      voteId: event.pathParameters.id
    }
  };
  //try get the vote first
  let vote = null;
  try{
    vote = await dynamoDbLib.call('get', params);
    if(!vote) callback(null, failure(404, "vote does not exist"))
    else vote = vote.Item
  }catch(e){
    callback(null, failure(e.statusCode, e.message))
  }
  //check time <= 2 days
  const time = new Date(vote.time)
  const now = new Date(Date.now())
  if(dateDiffInDays(time, now) > 2){
    callback(null, failure(400, "Vote Expired"));
  }

  //make new list of voters
  let list = [];
  if(event.pathParameters.options === "yes")
    list = vote.yes;
  else
    list = vote.no;
  //place vote if voter is not in original list
  if(list.indexOf(event.pathParameters.userId) === -1)
    list.push(event.pathParameters.userId);
  else {
    callback(null, failure(400, "You have already voted."))
  }

  params = {
    TableName: 'votes',
    Item:{
      voteId: vote.voteId,
      ticker: vote.ticker,
      name: vote.name,
      yes: vote.yes,
      no: vote.no,
      attachment: vote.attachment,
      time: vote.time
    }
  }

  if(event.pathParameters.options === "yes"){
    params.Item.yes = list;
  }else{
    params.Item.no = list;
  }

  try {
    const result = await dynamoDbLib.call("put", params);
    callback(null, success(200, "vote successful"));
  } catch (e) {
    callback(null, failure(e.statusCode, e.message));
  }
}
