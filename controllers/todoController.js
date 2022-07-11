/**
 * Controllers handle routes
 * render views, and manipulate data to views
 **/
//mongoose package to connect and interact with db
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://show_mgdb_aws:RWy2QdTgJUsowMZM@showroom-aws.tzvlc.mongodb.net/?retryWrites=true&w=majority&&ssl=true')
    .then(() => console.log('DB Connection was Successful'))
    .catch(e => console.log(e));

//create schemas - blueprints for data
const carSchema = new mongoose.Schema({
    //declare what car items are to look like
    car: String
});

//create car model and base it on schema
const Car = mongoose.model('Car', carSchema); //'Car' model name stored as collection in mongodb basing it on 'carSchema' schema
// const carOne = Car({car: 'Mercedes Benz C180'}).save(function(error){
//     if(error) throw error;
//     console.log('Car Added Successfully');
// })

const bodyParser = require('body-parser');

//data - fetch from datastore
// let data = [
//     {car: 'BMW X1'},{car: 'Audi R8'}, {car: 'Mercedes Benz C180'},
// ];
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
        //render the view showroom_list.ejs and get data from mongodb and pass it to view
        Car.find({}, function (error, data) {
            if (error) throw error;
            res.render('showroom_list', {cars: data})
        })

    });

    //handle post request - pass in request data to have access to it
    app.post('/add/car', urlEncodedParser, function (req, res) {
        //body parser middleware - get data from view and pass it to mongodb
        //push data to our cars list array called data
        const newCar = Car(req.body).save(function (error, data) {
            if (error) throw error;
            res.json(data);
        });
    });

    //handle delete request
    app.delete('/delete/car/:car', function (req, res) {
        //delete requested item from db
        //if false filters from array
        //replace hyphen - with space (url comes with -)
        Car.find({car: req.params.car.replace(/\-/g, " ")}).remove(function (error, data) {
            if (error) throw error;
            res.json(data)
        });
    });
}