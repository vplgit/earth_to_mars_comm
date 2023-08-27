"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const router = require("express").Router();
const req_headers_manager_1 = require("../../middlewares/req_headers_manager");
const knex_1 = require("../../database/knex");
const service_1 = require("./service");
router.use(req_headers_manager_1.req_header_manager);
//Route to perform translation
router.post("/message", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, service_1.service)(req);
        req.result = result;
        next();
        res.status(200).send(req.response);
    }
    catch (error) {
        next(error);
    }
}));
//Route to get logs
router.get("/log", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, knex_1.knex)("app_log").select("*");
        res.status(200).send(result);
    }
    catch (error) {
        next(error);
    }
}));
router.use(interceptor);
//Interceptor middleware to to convert response
function interceptor(req, res, next) {
    let sender = req.header("x-sender");
    let receiver = req.header("x-receiver");
    let message = req.body.message;
    let result = req.result;
    if (sender == "earth" && receiver == "mars") {
        req.response = {
            "Response from Earth": message,
            "Nokia Translation": result,
        };
    }
    else {
        req.response = {
            "Response from Mars": message,
            "Nokia Translation": result,
        };
    }
    next();
}
module.exports = router;
