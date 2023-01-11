// routes/api/Requests.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
const { EmailClient } = require("@azure/communication-email");
const connectionString = "<endpoint=https://communcation-mern.communication.azure.com/;accesskey=mGvpTHfzWlAgYWj7syV5QOISU33Agnmy8iNlqCXqM+WmxO4I4fUXVj3WgDdtYKkKRGhVtlKiI6oGN/2ccYNw4g==>";
const client = new EmailClient(connectionString);
const mongoose = require('mongoose');
const translate = require('@iamtraction/google-translate');
// Load Book model
//const Book = require('../../models/Book');
const Request = require('../../models/Request');
const Application = require('../../models/Application');
const auth = require('../../middleware/auth');

// @route GET api/books/test
// @description tests books route
// @access Public
const Req = mongoose.model("Request");
const Appl = mongoose.model("Application");
const Reqq = require('../../models/Request');
const User = require('../../models/User');
router.get('/', (req, res) => {
  //console.log('test');
  Reqq.find()
    .then(reqqs => res.json(reqqs))
    .catch(err => res.status(404).json({ noreqqsfound: 'No reqqs found' }));
});


router.get('/request-list', (req, res) => {
  //console.log('test');
  Reqq.find({status:"1"})
    .then(reqqs => res.json(reqqs))
    .catch(err => res.status(404).json({ noreqqsfound: 'No reqqs found' }));
});

router.get('/admin-request-list', (req, res) => {
  //console.log('test');
  Reqq.find({status:"1"})
    .then(reqqs => res.json(reqqs))
    .catch(err => res.status(404).json({ noreqqsfound: 'No reqqs found' }));
});

router.get('/applied-requests', (req, res) => {
  Reqq.find({status:'2'})
    .then(reqqs => res.json(reqqs))
    .catch(err => res.status(404).json({ noreqqsfound: 'No reqqs found' }));
});

router.get('/completed-requests', (req, res) => {
  Reqq.find({status:'3'})
    .then(reqqs => res.json(reqqs))
    .catch(err => res.status(404).json({ noreqqsfound: 'No reqqs found' }));
});

router.get('/professional-active-requests', (req, res) => {
  Reqq.find({status:'4'})
    .then(reqqs => res.json(reqqs))
    .catch(err => res.status(404).json({ noreqqsfound: 'No reqqs found' }));
});










router.post('/place', function(req,res){

  //console.log('tttt');
  
  new Req({
        specialisation: req.body.specialisation,
        repair_explanation: req.body.repair_explanation,
        repair_immediately: req.body.repair_immediately,
        address_1: req.body.address_1,
        address_2: req.body.address_2,
        country: req.body.country,
        state_or_province: req.body.state_or_province,
        zipcode: req.body.zipcode,
        city: req.body.city,
        status: "1",
        user_id: req.body.user_id
    }).save(function(err,doc){
    if(err)res.json(err);
    else 
    {
      
    res.json({ msg: 'Request Placed Successfully' });
    
  } 
      });
    });

router.post('/apply', function(req,res){
  new Appl({
    time_of_service: req.body.time_of_service,
    fees: req.body.fees,
    request_applied: req.body.request_applied,
    professional_id: req.body.professional_id
}).save(async(err,doc)=>{
if(err)res.json(err);
else 
{
  var myquery = { _id: mongoose.Types.ObjectId(req.body.request_applied) }; 
  var newvalues = { $set: {status: 2 } }; 
  Reqq.updateOne(myquery, newvalues, function(err1, res1){
  if(err1) throw err1;
  else 
  {
    
  res.json({ msg: 'Request Applied Successfully' });
    
}
  });

//var q = { _id: mongoose.Types.ObjectId(req.body.request_applied) }; 

var result = await Reqq.findOne({ _id: req.body.request_applied });
var user_details = await User.findOne({_id:result.user_id});
//console.log(user_details.email);
const sender = "<mern@24d9462a-79f6-45a9-b5d2-2455488a4c00.azurecomm.net>";
      const emailContent = {
        subject: "Request Application",
        plainText: "Someone Applied for the Request",
        html: "<html><head><title>Request Application</title></head><body><h2>Someone Applied for the Request you created</h2></body></html>",
      };
      const toRecipients = {
        to: [
          { email: "<"+user_details.email+">", displayName: "<Naveen Uniyal>" },
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
  
}
});
});


router.get('/pending-requests/:id', (req, res) => {
  Reqq.find({user_id:req.params.id,status:"1"})
    .then(reqqs => res.json(reqqs))
    .catch(err => res.status(404).json({ noreqqsfound: 'No reqqs found' }));
});


router.get('/active-requests/:id', (req, res) => {
  Reqq.find({user_id:req.params.id,status:"4"})
    .then(reqqs => res.json(reqqs))
    .catch(err => res.status(404).json({ noreqqsfound: 'No reqqs found' }));
});

router.get('/request-applications/:id', (req, res) => {
  //console.log(req.params.id);
  Reqq.find({status:'2',user_id:req.params.id})
    .then(reqqs => res.json(reqqs))
    .catch(err => res.status(404).json({ noreqqsfound: 'No reqqs found'+req.params.id }));
});

// get a request via id

router.get('/:id', (req, res) => {
  
  Reqq.findById(req.params.id)
  .then(Reqq => res.json(Reqq))
  .catch(err => res.status(404).json({ noreqqfound: 'No reqq found' }));
});



router.post('/translate',function(req,res1){
  translate(req.body.content, { from: 'en', to: 'fr' }).then(res => {
  //console.log(res.text); // OUTPUT: ''
  return res1.status(200).json({ data: res.text });
   
  }).catch(err => {
    console.error(err);
  });
});

router.post('/translate1',function(req,res1){
  translate(req.body.content, { from: 'fr', to: 'en' }).then(res => {
  //console.log(res.text); // OUTPUT: ''
  return res1.status(200).json({ data: res.text });
   
  }).catch(err => {
    console.error(err);
  });
});


module.exports = router;