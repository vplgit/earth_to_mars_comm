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
exports.req_header_manager = void 0;
function req_header_manager(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let senderType = parseInt(req.body.message);
        if (isNaN(senderType)) {
            req.headers["x-sender"] = "earth";
            req.headers["x-receiver"] = "mars";
        }
        else {
            req.headers["x-sender"] = "mars";
            req.headers["x-receiver"] = "earth";
        }
        console.log("x-sender : ", req.header("x-sender"));
        console.log("x-receiver : ", req.header("x-receiver"));
        next();
    });
}
exports.req_header_manager = req_header_manager;
