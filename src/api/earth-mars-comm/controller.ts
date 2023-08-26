const router = require("express").Router();
import { knex } from "../../database/knex";
import { req_header_manager } from "../../middlewares/req_headers_manager";

import { service } from "./service";
router.use(req_header_manager);

router.post("/message", async (req: any, res: any) => {
  try {
    const result = await service(req);
    res.status(200).send(result);
  } catch (error) {
    throw error;
  }
});
router.get("/", async (req: any, res: any) => {
  const result = await knex("app_log").select("*");
  res.send({
    Data: result,
    message: "I am at my destination",
  });
});
module.exports = router;
