export async function req_header_manager(req: any, res: any, next: any) {
  let senderType: any = parseInt(req.body.message);
  if (isNaN(senderType)) {
    req.headers["x-sender"] = "earth";
    req.headers["x-receiver"] = "mars";
  } else {
    req.headers["x-sender"] = "mars";
    req.headers["x-receiver"] = "earth";
  }
  console.log("x-sender : ", req.header("x-sender"));
  console.log("x-receiver : ", req.header("x-receiver"));
  next();
}
