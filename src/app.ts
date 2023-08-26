import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { requestTimingMiddleware } from "./middlewares/request_time_middleware";
import { errror_handler } from "./middlewares/error_handler";

dotenv.config();
const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;
app.use(requestTimingMiddleware);
app.use("/api", require("./api"));
app.use(errror_handler);

app.listen(port, () => {
  try {
    console.log(`[ Server is running on port ${port} ]`);
  } catch (error) {
    console.log("Error : ", error);
  }
});
