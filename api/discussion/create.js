import uuid from "uuid";
import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "discussion",
    Item: {
      userId: data.userId,
      discussionId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      postedAt: Date.now(),
      author: data.author,
      pinned: data.pinned,
      title: data.title,
<<<<<<< HEAD
=======
      reply: []
>>>>>>> Discussion and reply now functioning
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    callback(null, success(201, "discussion post successful"));
  } catch (e) {
    callback(null, failure(e.statusCode, e.message));
  }
}
