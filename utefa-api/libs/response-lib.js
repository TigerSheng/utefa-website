export function success(statusCode, body) {
  return buildResponse(statusCode, body);
}

export function failure(statusCode, body) {
  return buildResponse(statusCode, body);
}

function buildResponse(statusCode, response) {
  return {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify(response)
  };
}
