
const express = require('express');

const app = express();

//setup template engine
app.set('view engine', 'ejs');

//middleware to serve static files
app.use(express.static('./public'));

//listen to port
app.listen(3000, function (){
    console.log('Listening on 3000');
})