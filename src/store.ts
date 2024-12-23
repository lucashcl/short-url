import { Database } from "bun:sqlite";

export type Store = ReturnType<typeof createStore>;

export function createStore(db: Database = new Database()) {
   db.query("CREATE TABLE IF NOT EXISTS store (key TEXT PRIMARY KEY, value TEXT)").run();

   const store = {
      get(key: string): string | undefined {
         const { value } = db.query<{ value: string }, string>("SELECT value FROM store WHERE key = ?").get(key) ?? {};
         return value;
      },
      set(key: string, value: string): void {
         db.query<void, { $key: string, $value: string }>("INSERT INTO store (key, value) VALUES ($key, $value)").run({ $key: key, $value: value });
      }
   }

   return store;
}