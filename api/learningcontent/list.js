import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function main(event, context, callback) {
  const params = {
    TableName: "learning-content",
    Limit: 100
  };

  try {
    const result = await dynamoDbLib.call("scan", params);
    // Return the matching list of items in response body
    callback(null, success(200, result.Items));
  } catch (e) {
    callback(null, failure(e.statusCode, e.message));
  }
}
