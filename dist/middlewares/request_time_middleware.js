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
exports.requestTimingMiddleware = void 0;
const knex_1 = require("../database/knex");
function requestTimingMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const start = Date.now();
            res.on("finish", () => __awaiter(this, void 0, void 0, function* () {
                const duration = Date.now() - start;
                console.log(`Request to ${req.method} ${req.path} took ${duration}ms`);
                const result = yield (0, knex_1.knex)("ss").insert({
                    process_time: duration,
                });
            }));
            next();
        }
        catch (error) {
            console.log("$$$$$$$$$$$$$$$$$$$$$4 : ", error);
            throw error;
        }
    });
}
exports.requestTimingMiddleware = requestTimingMiddleware;
