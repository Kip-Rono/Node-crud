/**
 * Controllers handle routes
 * render views, and manipulate data to views
 **/
const bodyParser = require('body-parser');
//data - fetch from datastore
const data = [
    {car: 'BMW X1'},{car: 'Audi R8'}, {car: 'Mercedes Benz C180'},
];
const urlEncodedParser = bodyParser.urlencoded({extended: false});

module.exports = function (app) {
    //setup all request handlers
    //index page
    app.get('/', function (req, res) {
        //render the view index.ejs
        res.render('index')
    });
    //handle get request - to do page
    app.get('/showroom', function (req, res) {
        //render the view showroom_list.ejs
        res.render('showroom_list', {cars: data})
    });

    //handle post request - pass in request data to have access to it
    app.post('/add/car', urlEncodedParser, function (req, res) {
        //add body parser middleware
        //push data to our cars list array called data
        data.push(req.body);
        res.json(data);
    });

    //handle delete request
    app.delete('/to-do', function (req, res) {

    });
}