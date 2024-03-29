import uuid from "uuid";
import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "votes",
    Item: {
      voteId: uuid(),
      ticker: data.ticker,
      name: data.name,
      yes: [],
      no: [],
      attachment: data.attachment,
      time: Date.now()
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    callback(null, success(201, "post successful"));
  } catch (e) {
    callback(null, failure(e.statusCode, e.message));
  }
}
