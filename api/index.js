import { handler } from "../netlify/functions/api.mjs";

export default async function apiHandler(request, response) {
  const requestUrl = new URL(request.url || "/api", `https://${request.headers.host || "localhost"}`);
  const route = requestUrl.searchParams.get("path");
  const apiPath = route ? `/api/${route.replace(/^\/+/, "")}` : requestUrl.pathname;
  let body;

  if (request.body !== undefined && request.body !== null) {
    body = typeof request.body === "string"
      ? request.body
      : JSON.stringify(request.body);
  }

  const result = await handler({
    httpMethod: request.method,
    path: apiPath,
    rawQuery: requestUrl.searchParams.toString(),
    headers: request.headers,
    body,
    isBase64Encoded: false,
  });

  response.status(result.statusCode);
  Object.entries(result.headers || {}).forEach(([key, value]) => response.setHeader(key, value));
  response.send(result.isBase64Encoded ? Buffer.from(result.body || "", "base64") : (result.body || ""));
}
