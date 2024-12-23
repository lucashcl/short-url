import { Elysia, t } from "elysia";
import { createStore } from "./store";
import { randomUUID } from "node:crypto"

export const app = new Elysia()
  .get("/ping", () => "pong")
  .decorate("store", createStore())
  .get("/:id", ({ params: { id }, redirect, store, error }) => {
    const url = store.get(id);
    if (!url) return error(404, "This short url does not exist");
    return redirect(url);
  })
  .post("/", ({ body: { url }, store, error }) => {
    const id = randomUUID()
    store.set(id, url);
    if (!app.server) return error(500, "hostname and port are not defined");
    return `${app.server.hostname}:${app.server.port}/${id}`;
  }, {
    body: t.Object({
      url: t.String({ format: "uri" })
    })
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
