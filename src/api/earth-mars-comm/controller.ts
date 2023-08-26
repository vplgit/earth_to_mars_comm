const router = require("express").Router();
import { req_header_manager } from "../../middlewares/req_headers_manager";

import { service } from "./service";
router.use(req_header_manager);

router.post("/message", async (req: any, res: any, next: any) => {
  try {
    const result = await service(req);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
