import { createServer } from "node:http";
import { promises as fs } from "node:fs";
import path from "node:path";

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8"
};

const safeResolve = (rootDir, requestPath) => {
  const normalized = decodeURIComponent(requestPath).split("?")[0].replace(/^\/+/, "");
  const resolved = path.resolve(rootDir, normalized);
  if (!resolved.startsWith(rootDir)) {
    return null;
  }

  return resolved;
};

const sendResponse = (response, statusCode, body, contentType) => {
  response.writeHead(statusCode, { "content-type": contentType });
  response.end(body);
};

export const startStaticServer = ({ rootDir, port = 4173, host = "127.0.0.1" }) =>
  new Promise((resolve, reject) => {
    const server = createServer(async (request, response) => {
      const pathname = request.url === "/" ? "/index.html" : request.url;
      let filePath = safeResolve(rootDir, pathname);

      if (!filePath) {
        sendResponse(response, 403, "Forbidden", "text/plain; charset=utf-8");
        return;
      }

      try {
        const stat = await fs.stat(filePath);
        if (stat.isDirectory()) {
          filePath = path.join(filePath, "index.html");
        }
      } catch {
        if (!path.extname(filePath)) {
          filePath = path.join(filePath, "index.html");
        }
      }

      try {
        const contents = await fs.readFile(filePath);
        const extension = path.extname(filePath).toLowerCase();
        sendResponse(response, 200, contents, MIME_TYPES[extension] || "application/octet-stream");
      } catch {
        sendResponse(response, 404, "Not found", "text/plain; charset=utf-8");
      }
    });

    server.once("error", reject);
    server.listen(port, host, () => {
      resolve({
        url: `http://${host}:${port}`,
        close: () =>
          new Promise((closeResolve, closeReject) => {
            server.close((error) => (error ? closeReject(error) : closeResolve()));
          })
      });
    });
  });
