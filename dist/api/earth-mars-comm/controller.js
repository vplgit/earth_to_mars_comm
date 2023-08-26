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
const service_1 = require("./service");
router.use(req_headers_manager_1.req_header_manager);
router.post("/message", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, service_1.service)(req);
        res.status(200).send(result);
    }
    catch (error) {
        throw error;
    }
}));
module.exports = router;
