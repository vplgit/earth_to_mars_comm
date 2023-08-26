import { knex } from "../database/knex";
export async function requestTimingMiddleware(req: any, res: any, next: any) {
  const start = Date.now();
  res.on("finish", async () => {
    const duration = Date.now() - start;
    console.log(`Request to ${req.method} ${req.path} took ${duration}ms`);
    const result = await knex("app_log").insert({
      process_time: duration,
    });
  });
  next();
}
