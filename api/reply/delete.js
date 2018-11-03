import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function main(event, context, callback) {
  
  const params = {
    TableName: "discussion-reply",
    // 'Key' defines the partition key and sort key of the item to be removed
    // - 'noteId': path parameter
    Key: {
      // replyId: event.pathParameters.id
      replyId: event.queryStringParameters.replyId,
      discussionId: event.queryStringParameters.discussionId
    }
  };

  try {
    const result = await dynamoDbLib.call("delete", params);
    callback(null, success(204, 'discussion post deleted'));
  } catch (e) {
    callback(null, failure(e.statusCode, e.message));
  }
}
