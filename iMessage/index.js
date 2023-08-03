 const axios = require("axios");
 class IMessage{

    constructor(authorization_key, loop_secret_key){
        if (typeof authorization_key === 'undefined' || typeof loop_secret_key === 'undefined') {
            throw new Error('Both authorization_key and loop_secret_key must be provided.');
          }
        this.authorization_key = authorization_key;
        this.loop_secret_key = loop_secret_key;
    }

    verifyRequest(req){
        const secretKey = "Pranav 1234"
        if(req.headers['authorization'] == null){
            return false;
        }else{
            const signature = req.headers['authorization'];
            if(secretKey != signature){
                return false;
            }
        }
        return true;
    }

    postMessage(sender_name, recipient, message){
        axios
      .post(
        "https://server.loopmessage.com/api/v1/message/send/",
        {
          recipient: recipient,
          text: message,
          sender_name: sender_name,
        },
        {
          headers: {
            "Authorization": this.authorization_key,
            "Loop-Secret-Key" : this.loop_secret_key,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err.message);
         console.log(err.response);
      });
    }
}

module.exports = IMessage 