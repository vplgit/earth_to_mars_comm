const Knex = require("knex");
import { migrationScript } from "./db_migration/migration";
import config from "./knex_config";

const knex = Knex(config.development);

knex.raw("SELECT 1").then(async () => {
  try {
    await migrationScript();
    console.log("[ SQLite connected. ]");
  } catch (error) {
    console.log("[ Failed to connect SQLite. ]");
    throw error;
  }
});
export { knex };
