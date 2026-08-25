import { createReadStream, existsSync, readFileSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..", "public");
const indexHtml = readFileSync(join(root, "index.html"));
const port = Number(process.env.PORT || 8788);

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
};

const spaPaths = new Set([
  "/services",
  "/services/property-management",
  "/services/association-management",
  "/team",
  "/portal",
  "/find-a-home",
  "/tides",
  "/contact",
]);

function isSpaPath(pathname) {
  const trimmed = pathname.replace(/\/$/, "") || "/";
  return trimmed === "/" || spaPaths.has(trimmed);
}

createServer((req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  let pathname = decodeURIComponent(url.pathname);
  if (pathname === "/index.html") pathname = "/";

  const safe = normalize(pathname).replace(/^(\.\.[/\\])+/, "");
  const filePath = join(root, safe);

  if (existsSync(filePath) && statSync(filePath).isFile() && !filePath.endsWith("index.html")) {
    res.writeHead(200, { "content-type": types[extname(filePath)] || "application/octet-stream" });
    createReadStream(filePath).pipe(res);
    return;
  }

  if (isSpaPath(pathname)) {
    res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    res.end(indexHtml);
    return;
  }

  res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
  res.end("Not found");
}).listen(port, "127.0.0.1", () => {
  console.log(`http://127.0.0.1:${port}`);
});
