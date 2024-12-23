import { describe, expect, test } from "bun:test";
import { createStore, Store } from "./store";

describe("Store", () => {
   let store: Store;
   test("create a new store", () => {
      store = createStore();
      expect(store).toBeDefined();
   });

   test("set a value", () => {
      store.set("key", "value")
      expect(store.get("key")).toBe("value");
   })
})