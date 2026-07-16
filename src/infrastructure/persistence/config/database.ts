import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";

export class AppDatabase {
  private static instance: ReturnType<typeof drizzle>;

  static conectar() {
    if (!this.instance) {
      const sqlite = new Database(
        "./src/infrastructure/persistence/database/ddd-playground.db",
      );

      this.instance = drizzle(sqlite);
    }

    return this.instance;
  }

  static executarMigrations() {
    if (!this.instance) {
      this.conectar();
    }

    migrate(this.instance, {
      migrationsFolder: "./src/infrastructure/persistence/migrations",
    });
  }

  static get db() {
    if (!this.instance) {
      throw new Error("Banco de dados não foi inicializado.");
    }

    return this.instance;
  }
}
