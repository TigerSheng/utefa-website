import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function main(event, context, callback) {
  const params = {
    TableName: "discussion",
    Key: {
      discussionId: event.pathParameters.id
    }
  };

  try {
    const result = await dynamoDbLib.call("delete", params);
    callback(null, success(204, 'discussion post deleted'));
  } catch (e) {
    callback(null, failure(e.statusCode, e.message));
  }
}
