import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "discussion-reply",
    // 'Key' defines the partition key and sort key of the item to be updated
    Key: {
      replyId: event.queryStringParameters.replyId,
      discussionId: event.queryStringParameters.discussionId
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET content = :content",
    ExpressionAttributeValues: {
      ":content": data.content ? data.content : null,
    },
    ReturnValues: "ALL_NEW"
  };

  try {
    const result = await dynamoDbLib.call("update", params);
    callback(null, success(200, { status: true }));
  } catch (e) {
    callback(null, failure(e.statusCode, e.message));
  }
}
