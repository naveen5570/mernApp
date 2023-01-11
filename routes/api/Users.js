// routes/api/books.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
// Load Book model
//const Book = require('../../models/Book');
const User = require('../../models/User');
const auth = require('../../middleware/auth');
const { EmailClient } = require("@azure/communication-email");
const connectionString = "<endpoint=https://communcation-mern.communication.azure.com/;accesskey=mGvpTHfzWlAgYWj7syV5QOISU33Agnmy8iNlqCXqM+WmxO4I4fUXVj3WgDdtYKkKRGhVtlKiI6oGN/2ccYNw4g==>";
const client = new EmailClient(connectionString);
const { SmsClient } = require('@azure/communication-sms');

const smsconnectionString = "endpoint=https://communcation-mern.communication.azure.com/;accesskey=mGvpTHfzWlAgYWj7syV5QOISU33Agnmy8iNlqCXqM+WmxO4I4fUXVj3WgDdtYKkKRGhVtlKiI6oGN/2ccYNw4g==";

// Instantiate the SMS client.
const smsClient = new SmsClient(smsconnectionString);
const googleClient = new OAuth2Client("102143246081-iqodvc2om9ecjrcgdecfindnmpicu06i.apps.googleusercontent.com");


// @route GET api/books/test
// @description tests books route
// @access Public
router.get('/user-test', auth,  (req, res) => 

res.send('user route testing!')

);

// Send an Email

router.get('/user-test1',   async(req, res) => {
  const sender = "<mern@24d9462a-79f6-45a9-b5d2-2455488a4c00.azurecomm.net>";
  const emailContent = {
    subject: "Registration Successful",
    plainText: "You are Successfully Registered with us.",
    html: "<html><head><title>ACS Email as a Service</title></head><body><h1>ACS Email as a Service - Html body</h1><h2>This email is part of testing of email communication service</h2></body></html>",
  };
  const toRecipients = {
    to: [
      { email: "<naveen.uniyal5@gmail.com>", displayName: "<Naveen Uniyal>" },
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

// Send a SMS message

router.get('/user-test2',   async(req, res) => {
  const sendResults = await smsClient.send({
    from: "+918178203672",
    to: ["+918802699145", "<to-phone-number-2>"],
    message: "Hello World 👋🏻 via SMS"
  });

  // Individual messages can encounter errors during sending.
  // Use the "successful" property to verify the status.
  for (const sendResult of sendResults) {
    if (sendResult.successful) {
      console.log("Success: ", sendResult);
    } else {
      console.error("Something went wrong when trying to send this message: ", sendResult);
    }
  }


});


// @route GET api/books
// @description Get all books
// @access Public
router.get('/', (req, res) => {
  console.log('ddd');
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(404).json({ nousersfound: 'No Users found' }));
});

// @route GET api/books/:id
// @description Get single book by id
// @access Public
router.get('/get-user/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(404).json({ nouserfound: 'No User found' }));
});

// @route GET api/users/login
router.post('/login', async(req, res) => {
    var query = { email: req.body.email};
    const user_data =  await User.find(query);
    if(user_data.length!=0)
    {
      bcrypt.compare(req.body.password, user_data[0].password, (err, data) => {
        //if error than throw error
        if (err) 
        {
          return err.status(401).json({ msg: "Password not correct" }) 
        }

        //if both match than you can do anything
        if (data) {
          
          return jwt.sign({id:user_data[0]._id}, config.get('jwtsecret'), {expiresIn:3600},
          (err,token) =>{
           if(err) throw err;
           res.status(200).json({ 
            token:token,
            name:user_data[0].name,
            msg: 'Login success' });
          }
          );
            
        } else {
            return res.status(401).json({ msg: "Invalid credentials" })
        }

    })
    
    }
    else
    {
        res.status(202).json({msg: 'user not found'});
    }
  
});




router.post('/',  async(req, res) => {
  var query = { email: req.body.email};
  const user_data =  await User.find(query);
  if(user_data.length==0)
  {
  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);
  // now we set user password to hashed password
  var password = await bcrypt.hash(req.body.password, salt);
  new User({
      name: req.body.name,
      email: req.body.email,
      password: password,
      otp_verified:'0'
      }).save(req.body)
      .then( user => { 
          jwt.sign({id:user.id}, config.get('jwtsecret'), {expiresIn:3600},
          (err,token) =>{
           if(err) throw err;
           res.status(200).json({ 
            token:token,
            msg: 'User registered successfully' });
          }
          );
          
          
      }


      
      )
      .catch(err => res.status(400).json({ error: 'Unable to add this user' }));
      const sender = "<mern@24d9462a-79f6-45a9-b5d2-2455488a4c00.azurecomm.net>";
      const emailContent = {
        subject: "User Registration Successful",
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
  
    }
  else
  {
      res.status(202).json({msg: 'Sorry! This email already Registered'});
  }

});



// Login Via google

// @route GET api/users/login
router.post('/google-login', async(req, res) => {
  var query = { token: req.body};
  console.log(query);
  googleClient.verifyIdToken({idToken:req.body.token, audience:"102143246081-iqodvc2om9ecjrcgdecfindnmpicu06i.apps.googleusercontent.com"}).then(response=>{
  const {email_verified, name, email} = response.payload;
  if(email_verified)
  {
    
   User.findOne({email:email}).exec( async(err, user)=>{
if(err){
  console.log('email verified error'+email);
  return res.status(400).json({
    error:"Something went wrong"
  })
}
else
{
  if(user){
    console.log('second=>'+user);
    jwt.sign({id:user._id}, config.get('jwtsecret'), {expiresIn:3600},
         (err,token) =>{
          if(err) throw err;
          res.status(200).json({ 
           token:token,
           name:user.name,
           msg: 'Login success' });
         }
         );
  }
  else
  {
    console.log("here i am");
    const vv = email+config.get('jwtsecret');
    // generate salt to hash password
  const salt =  await bcrypt.genSalt(10);
  console.log(salt);
  // now we set user password to hashed password
  var password = await bcrypt.hash(vv, salt);
  console.log(password);
    
    let newUser = new User({name, email, password});
    newUser.save((err,data)=>{
      if(err){
        console.log('error number 2');
        return res.status(400).json({
          error:"Something went wrong"
        })
      }
      else
      {
        console.log('Here it is'+newUser);

        jwt.sign({id:newUser._id}, config.get('jwtsecret'), {expiresIn:3600},
         (err,token) =>{
          if(err) throw err;
          res.status(200).json({ 
           token:token,
           name:newUser.name,
           msg: 'Login success' });
         }
         );
      }  
    })

  }
}
   })
  }
  //console.log(response.payload);  
  });
  
});









// @route GET api/books/:id
// @description Update book
// @access Public
router.put('/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(user => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route GET api/books/:id
// @description Delete book by id
// @access Public
router.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, req.body)
    .then(user => res.json({ mgs: 'User entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a user' }));
});

module.exports = router;