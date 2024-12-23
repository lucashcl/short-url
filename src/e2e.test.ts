import { describe, expect, test } from "bun:test";
import { app } from ".";

describe("E2E", () => {
   const baseUrl = "http://localhost:3000"
   test("ping", async () => {
      const response = await app.handle(new Request(`${baseUrl}/ping`))
         .then(res => res.text())
      expect(response).toBe("pong");
   })

   test("create short url", async () => {
      const request = new Request(`${baseUrl}/`, { method: "POST", body: JSON.stringify({ url: baseUrl }), headers: { "Content-Type": "application/json" } })
      const response = await app.handle(request)
         .then(res => res.text())
      console.log(response)
      expect(response).toBeString()
   })
})