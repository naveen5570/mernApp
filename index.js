const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const routeTasks = require('./src/routes/tasks');



app.get('/this-test',function(req, res, ){
 console.log('test'); 
});

// Stripe routes
const striperoutes = require('./routes/stripe-route');

// routes
const requests = require('./routes/api/Req');
const applications = require('./routes/api/Application');
const books = require('./routes/api/books');
const users = require('./routes/api/Users');
const pages = require('./routes/api/Page');
const Professionals = require('./routes/api/Professionals');
const admins = require('./routes/api/Admin');
const services = require('./routes/api/Services');


// French Routes
const requests_fr = require('./routes/api/fr/Req');
const applications_fr = require('./routes/api/fr/Application');
const users_fr = require('./routes/api/fr/Users');
const pages_fr = require('./routes/api/fr/Page');
const Professionals_fr = require('./routes/api/fr/Professionals');
const admins_fr = require('./routes/api/fr/Admin');
const services_fr = require('./routes/api/fr/Services');




app.use(bodyParser.json());

app.use('/api/tasks', routeTasks, (req, res) => res.sendStatus(401));
app.use('/api/books', books);
app.use('/api/users', users);
app.use('/api/admin', admins);
app.use('/api/professionals', Professionals);
app.use('/api/requests', requests);
app.use('/api/applications', applications);
app.use('/api/stripe', striperoutes);
app.use('/api/pages', pages);
app.use('/api/services', services);


// French Routes Use

app.use('/api/fr/tasks', routeTasks, (req, res) => res.sendStatus(401));
app.use('/api/fr/users', users_fr);
app.use('/api/fr/admin', admins_fr);
app.use('/api/fr/professionals', Professionals_fr);
app.use('/api/fr/requests', requests_fr);
app.use('/api/fr/applications', applications_fr);
app.use('/api/fr/pages', pages_fr);
app.use('/api/fr/services', services_fr);



app.use(express.static('./client/build'));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build",     
  "index.html"));
});






app.set('port', process.env.PORT || 5000);

console.log(`listening on ${port}`);