import { serveDir } from "jsr:@std/http/file-server";

Deno.serve((req, info) => {
    const url = new URL(req.url);
    if (url.pathname.startsWith("/static")) {
        return serveDir(req, { dir: "./static" });
    } else if (url.pathname === "/requestIP") {
        const responseData = {
            ip: info.remoteAddr.hostname,
        };

        return new Response(JSON.stringify(responseData), {
            headers: { "Content-Type": "application/json" },
        });
    } else  {
        return serveDir(req, { dir: "./public", fsRoot: "./public"});
    }
});