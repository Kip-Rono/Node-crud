//import express module
var express = require('express');
var todoController = require('./controllers/todoController');


//fire up express - invoke function
var app = express();

//set up template engine
app.set('view engine', 'ejs');

//serve up static files using express static
app.use(express.static('./public')); //used on every route put as url

//fire controllers
todoController(app);

//listen to port
app.listen(3000, function (){
    console.log('Listening on port 3000');
});

