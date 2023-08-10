const express = require("express");
const app = express();
const IMessage = require("./iMessage/index.js");
app.use(express.json());

const authorization_key = "1X573TN5N-AACXHLYX1-9CCP2N5M4-GG7MRJXKU";
const loop_secret_key = "HkG2SM2mA_IHHgrx07UwIoEk0oI-_heeFRD5ND04g9Cy4Pf_NUanGyPAx_D2ilc9";

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/", (req, res) => {
  try {
    const Imessage = new IMessage(authorization_key, loop_secret_key);
    const verified = Imessage.verifyRequest(req);
    if (!verified) {
      res.send("unauthorized access");
      return;
    }
    if(req.body?.alert_type == "message_inbound"){
      const sender_name = req.body.sender_name;
      const recipient = req.body.recipient;
      const message = `Received you message - ${req.body.text}`;
       Imessage.postMessage(sender_name, recipient, message);
       console.log(req.body);
      console.log(JSON.stringify(req.header));
       res.send();
    }
    else{
      console.log(req.body);
      res.send();
    }
  } catch (e) {
    console.log(e.message);
    res.send(e.message);
  }
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
