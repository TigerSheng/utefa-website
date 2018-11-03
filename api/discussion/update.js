import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "discussion",
    // 'Key' defines the partition key and sort key of the item to be updated
<<<<<<< HEAD
=======
    // - 'noteId': path parameter
>>>>>>> Discussion and reply now functioning
    Key: {
      discussionId: event.pathParameters.id
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET content = :content, attachment = :attachment, title = :title",
    ExpressionAttributeValues: {
      ":attachment": data.attachment ? data.attachment : null,
      ":content": data.content ? data.content : null,
      ":title": data.title ? data.title : null,
<<<<<<< HEAD
=======
      ":reply" : data.reply ? data.reply : null
>>>>>>> Discussion and reply now functioning
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
