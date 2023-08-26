"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errror_handler = void 0;
function errror_handler(err, req, res, next) {
    res
        .status(err.statusCode || 500)
        .send({ Error: err.message } || { Error: "Internal Server Error" });
}
exports.errror_handler = errror_handler;
