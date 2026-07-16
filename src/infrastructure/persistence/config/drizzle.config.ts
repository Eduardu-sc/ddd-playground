import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",

  schema: "./src/infrastructure/persistence/schema/*.ts",

  out: "./src/infrastructure/persistence/migrations",

  dbCredentials: {
    url: "./src/infrastructure/persistence/database/ddd-playground.db",
  },
});
