import { knex } from "../database/knex";
export async function requestTimingMiddleware(req: any, res: any, next: any) {
  try {
    const start = Date.now();
    res.on("finish", async () => {
      const duration = Date.now() - start;
      console.log(`Request to ${req.method} ${req.path} took ${duration}ms`);
      await knex("app_log").insert({
        process_time: duration,
        request_path: req.path,
        request_method: req.method,
      });
    });
    next();
  } catch (error) {
    throw error;
  }
}
