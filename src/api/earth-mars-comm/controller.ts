const router = require("express").Router();
import { req_header_manager } from "../../middlewares/req_headers_manager";
import { knex } from "../../database/knex";

import { service } from "./service";
router.use(req_header_manager);

//Route to perform translation
router.post("/message", async (req: any, res: any, next: any) => {
  try {
    const result = await service(req);
    req.result = result;
    next();
    res.status(200).send(req.response);
  } catch (error) {
    next(error);
  }
});

//Route to get logs
router.get("/log", async (req: any, res: any, next: any) => {
  try {
    const result = await knex("app_log").select("*");
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

router.use(interceptor);

//Interceptor middleware to to convert response
function interceptor(req: any, res: any, next: any) {
  let sender = req.header("x-sender");
  let receiver = req.header("x-receiver");
  let message = req.body.message;
  let result: any = req.result;
  if (sender == "earth" && receiver == "mars") {
    req.response = {
      "Response from Earth": message,
      "Nokia Translation": result,
    };
  } else {
    req.response = {
      "Response from Mars": message,
      "Nokia Translation": result,
    };
  }
  next();
}
module.exports = router;
