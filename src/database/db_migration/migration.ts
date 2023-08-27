import { knex } from "../knex";

export async function migrationScript() {
  try {
    const is_table_exists = await knex.schema.hasTable("app_log");
    if (!is_table_exists) {
      await knex.schema.createTable("app_log", (table: any) => {
        table.increments();
        table.string("request_method");
        table.string("request_path");
        table.string("process_time");
        table.timestamps(true, true);
      });
    }
  } catch (error) {
    console.log("Migration...error : ", error);
    throw error;
  }
}
