"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const request_time_middleware_1 = require("./middlewares/request_time_middleware");
const error_handler_1 = require("./middlewares/error_handler");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "*" }));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;
app.use(request_time_middleware_1.requestTimingMiddleware);
app.use("/api", require("./api"));
app.use(error_handler_1.errror_handler);
app.get("/", (req, res) => {
    res.send("Hello, Express with TypeScript!");
});
app.listen(port, () => {
    try {
        console.log(`[ Server is running on port ${port} ]`);
    }
    catch (error) {
        console.log("Error : ", error);
    }
});
