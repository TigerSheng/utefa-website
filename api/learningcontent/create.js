import uuid from "uuid";
import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "learning-content",
    Item: {
      contentId: uuid(),
      file: {
        name: data.name,
        link: data.attachment
      },
      description: data.description,
      postedAt: Date.now(),
      author: data.author,
      isPublic: data.isPublic
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    callback(null, success(201, "upload learning content successfully"));
  } catch (e) {
    callback(null, failure(e.statusCode, e.message));
  }
}
