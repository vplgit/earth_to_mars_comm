import express from "express";
const router = express.Router();
router.use("/earth-mars-comm", require("./earth-mars-comm/controller"));
module.exports = router;
