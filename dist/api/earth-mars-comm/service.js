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
exports.service = void 0;
const common_functions_1 = require("../common/common_functions");
const EventEmitter = require("events");
const eventEmitter = new EventEmitter();
function service(req) {
    return __awaiter(this, void 0, void 0, function* () {
        let sender = req.header("x-sender");
        let receiver = req.header("x-receiver");
        let message = req.body.message;
        const result = action(sender, receiver, message);
        return common_functions_1.common_functions.responseTranslator({
            result,
            sender,
            receiver,
            message,
        });
    });
}
exports.service = service;
function action(sender, receiver, message) {
    const nokiaKeypad = {
        a: "2",
        b: "22",
        c: "222",
        d: "3",
        e: "33",
        f: "333",
        g: "4",
        h: "44",
        i: "444",
        j: "5",
        k: "55",
        l: "555",
        m: "6",
        n: "66",
        o: "666",
        p: "7",
        q: "77",
        r: "777",
        s: "7777",
        t: "8",
        u: "88",
        v: "888",
        w: "9",
        x: "99",
        y: "999",
        z: "9999",
        " ": " ",
    };
    let translatedResult;
    // Subscriber: Earth
    eventEmitter.on("earthMessage", (message, input) => {
        translatedResult = message;
    });
    // Subscriber: Mars
    eventEmitter.on("marsMessage", (message, input) => {
        translatedResult = message;
    });
    // Subscriber: Translator
    eventEmitter.on("translatorMessage", (message) => {
        if (sender == "earth" && receiver == "mars") {
            let translatedMessage = "";
            for (const char of message) {
                if (char.toLowerCase() in nokiaKeypad) {
                    translatedMessage += nokiaKeypad[char.toLowerCase()];
                }
            }
            eventEmitter.emit("earthMessage", translatedMessage, message);
        }
        else {
            const numericParts = message.split(" ");
            let translatedMessage = "";
            for (const part of numericParts) {
                for (let dials in nokiaKeypad) {
                    if (part.includes(nokiaKeypad[dials])) {
                        translatedMessage += dials;
                    }
                }
                translatedMessage += " ";
            }
            eventEmitter.emit("marsMessage", translatedMessage, message);
        }
    });
    eventEmitter.emit("translatorMessage", message);
    return translatedResult;
}
