const express = require("express");
const stripe = require("stripe")("sk_test_51KqNoBEsO5lD4LSjbxwyaHilhLYJWqex3nkAu35puvfYNEZbMdlcReu4qmsAri5GgpDN8B2kuraLLcuIZy6vWSKz0019XGf6of");
const {v4: uuidv4} = require('uuid');
const Req = require('../models/Request');
const User = require('../models/User');
const router = express.Router();
const { EmailClient } = require("@azure/communication-email");
const connectionString = "<endpoint=https://communcation-mern.communication.azure.com/;accesskey=mGvpTHfzWlAgYWj7syV5QOISU33Agnmy8iNlqCXqM+WmxO4I4fUXVj3WgDdtYKkKRGhVtlKiI6oGN/2ccYNw4g==>";
const client = new EmailClient(connectionString);
router.get('/',(req, res, next)=>{
console.log("Get Response from Researcher");
res.json({
message: 'it works'
});
});

router.post('/pay',(req,res,next)=>{
  console.log(req.body.token+'adfadfad=>'+req.body.req_id);
const {token, amount} = req.body;
const idempotencyKey = uuidv4();
return stripe.customers.create({
email: token.email,
source: token    
}).then(customer=>{
stripe.charges.create({
   amount: amount*100,
   currency:'usd',
   customer: customer.id,
   receipt_email: token.email 
},{idempotencyKey})    
}).then(result=>{
  var query = { _id: req.body.req_id};
 var newvalues = {$set: {status:'4'}};
   
 Req.updateOne(query, newvalues, async(err, res)=> {
   if (err) throw err;
   console.log("Payment Successful");
   var reqqq = await Req.findOne({_id: req.body.req_id});
   var user = await User.findOne({_id:reqqq.user_id});
   console.log(user.email);
   const sender = "<mern@24d9462a-79f6-45a9-b5d2-2455488a4c00.azurecomm.net>";
      const emailContent = {
        subject: "Professional Registration Successful",
        plainText: "You are Successfully Registered with us.",
        html: "<html><head><title>Registration Successful</title></head><body><h2>Your Registration is Successful</h2><p>Your Registration is Successful. Please wait till admin approves your registration</p></body></html>",
      };
      const toRecipients = {
        to: [
          { email: "<"+req.body.email+">", displayName: "<Naveen Uniyal>" },
        ],
      };
      try {
        const emailMessage = {
          sender: sender,
          content: emailContent,
          recipients: toRecipients,
        };
    
        const sendResult = await client.send(emailMessage);
    
        if (sendResult && sendResult.messageId) {
          // check mail status, wait for 5 seconds, check for 60 seconds.
          const messageId = sendResult.messageId;
          if (messageId === null) {
            console.log("Message Id not found.");
            return;
          }
    
          console.log("Send email success, MessageId :", messageId);
    
          let counter = 0;
          const statusInterval = setInterval(async function () {
            counter++;
            try {
              const response = await client.getSendStatus(messageId);
              if (response) {
                console.log(`Email status for {${messageId}} : [${response.status}]`);
                if (response.status.toLowerCase() !== "queued" || counter > 12) {
                  clearInterval(statusInterval);
                }
              }
            } catch (e) {
              console.log("Error in checking send mail status: ",e);
            }
          }, 5000);
        } else {
          console.error("Something went wrong when trying to send this email: ", sendResult);
        }
      } catch (e) {
        console.log("################### Exception occoured while sending email #####################", e);
      }

   
});
 res.status(200).json(result);   
}).catch(err=>{
  console.log(err);  
})
});

module.exports = router;