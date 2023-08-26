export function errror_handler(err: any, req: any, res: any, next: any) {
  console.log("Errro Jamd");
  res
    .status(err.statusCode || 500)
    .send({ error: err.message || "Internal Server Error" });
}
