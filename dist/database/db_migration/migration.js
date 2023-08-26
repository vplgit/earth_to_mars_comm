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
exports.migrationScript = void 0;
const knex_1 = require("../knex");
function migrationScript() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const is_table_exists = yield knex_1.knex.schema.hasTable("app_log");
            if (!is_table_exists) {
                yield knex_1.knex.schema.createTable("app_log", (table) => {
                    table.increments();
                    table.string("process_time");
                    table.timestamp(true, true);
                });
            }
        }
        catch (error) {
            console.log("Migration...error : ", error);
            throw error;
        }
    });
}
exports.migrationScript = migrationScript;
