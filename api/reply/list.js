import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function main(event, context, callback) {

  console.log(event);
  const params = {
    ExpressionAttributeValues: {
      ":discussionId": event.queryStringParameters.postId
    },
    KeyConditionExpression: "discussionId = :discussionId",
    TableName: "discussion-reply",
    Limit: 25
  };

  try {
    const result = await dynamoDbLib.call("query", params);
    // Return the matching list of items in response body
    callback(null, success(200, result.Items));
  } catch (e) {
    callback(null, failure(e.statusCode, e.message));
  }
}
