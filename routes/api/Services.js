// routes/api/books.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const config = require('config');
const multer = require('multer');
const jwt = require('jsonwebtoken');
// Load Book model
//const Book = require('../../models/Book');
const Service = require('../../models/Service');
const auth = require('../../middleware/auth');

const storage = multer.diskStorage({
distination:function(req,file,cb){
  cb(null, 'client/img/services');
  
},
filename:function(req,file,cb){
  cb(null, uuid.v4()+'-'+Date.now()+path.extname(file.originalname));
}
});

const fileFilter = (req,file,cb)=>{
const allowedFileTypes = ['image/jpeg','image/jpg','image/png'];
if(allowedFileTypes.includes(file.mimetype)){
 cb(null,true); 
}  
else
{
  cb(null,false);
}
}

let upload = multer({storage, fileFilter});
// @route GET api/books
// @description Get all books
// @access Public
router.get('/', (req, res) => {
  console.log('services selected');
  Service.find()
    .then(services => res.json(services))
    .catch(err => res.status(404).json({ noservicesfound: 'No Services found' }));
});

// @route GET api/books/:id
// @description Get single book by id
// @access Public
router.get('/get-service/:id', (req, res) => {
  Service.findById(req.params.id)
    .then(service => res.json(service))
    .catch(err => res.status(404).json({ noservicesfound: 'No User found' }));
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




router.post('/create', function(req,res){

    //console.log('tttt');
    
    new Service({
          name: req.body.name,
          description: req.body.description
          
      }).save(function(err,doc){
      if(err)res.json(err);
      else res.json({ msg: 'Service Created Successfully' });
        
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
router.delete('/delete-service/:id', (req, res) => {
  Service.findByIdAndRemove(req.params.id, req.body)
    .then(data => res.json({ msg: 'Service deleted successfully' }))
    .catch(err => res.status(404).json({ message: 'No such a Service' }));
});



router.post('/update-service', (req, res) => {
  console.log('update');
  var myquery = { _id: req.body.id }; 
var newvalues = { $set: {name:req.body.name, description:req.body.description} }; 
Service.updateOne(myquery, newvalues, function(err1, res1){
if(err1) throw err1;
else res.json({ msg: 'Service details updated' });

});
});

module.exports = router;