import uuid from "uuid";
import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "notes",
    Item: {
      userId: data.userId,
      noteId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      postedAt: Date.now(),
      author: data.author,
      pinned: data.pinned,
      title: data.title
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    callback(null, success("post successful"));
  } catch (e) {
    callback(null, failure({ status: false }));
  }
}
