import { common_functions } from "../common/common_functions";

const EventEmitter = require("events");
const eventEmitter = new EventEmitter();
export async function service(req: any) {
  let sender = req.header("x-sender");
  let receiver = req.header("x-receiver");
  let message = req.body.message;
  const result = action(sender, receiver, message);

  return common_functions.responseTranslator({
    result,
    sender,
    receiver,
    message,
  });
}

function action(sender: any, receiver: any, message: string) {
  const nokiaKeypad: any = {
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

  let translatedResult: any;
  // Subscriber: Earth
  eventEmitter.on("earthMessage", (message: any, input: any) => {
    translatedResult = message;
  });

  // Subscriber: Mars
  eventEmitter.on("marsMessage", (message: any, input: any) => {
    translatedResult = message;
  });

  // Subscriber: Translator
  eventEmitter.on("translatorMessage", (message: any) => {
    if (sender == "earth" && receiver == "mars") {
      let translatedMessage = "";
      for (const char of message) {
        if (char.toLowerCase() in nokiaKeypad) {
          translatedMessage += nokiaKeypad[char.toLowerCase()];
        }
      }
      eventEmitter.emit("earthMessage", translatedMessage, message);
    } else {
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
