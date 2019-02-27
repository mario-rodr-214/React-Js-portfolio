
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var User = require('../models/User');
const app = express();

const passport = require('passport');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
//var config = require('../config');
//var VerifyToken = require('./VerifyToken');
const logger = require("morgan");
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');


//Takes users information - name, email, and password. 
//Password is immediately hashed. 

router.post('/register', function (req, res) {

    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({
        email: req.body.email
    }).then(user => {
        if (user) {
            return res.status(400).json({
                email: 'Email already exists'
            });
        }
        else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,

            });

            bcrypt.genSalt(10, (err, salt) => {
                if (err) console.error('There was an error', err);
                else {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) console.error('There was an error', err);
                        else {
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    res.json(user)
                                });
                        }
                    });
                }
            });
        }
    });
});



router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email })
        .then(user => {
            if (!user) {
                errors.email = 'User not found'
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar
                        }
                        jwt.sign(payload, 'secret', {
                            expiresIn: 3600
                        }, (err, token) => {
                            if (err) console.error('There is some error in token', err);
                            else {
                                res.json({
                                    success: true,
                                    token: `Bearer ${token}`
                                });
                            }
                        });
                    }
                    else {
                        errors.password = 'Incorrect Password';
                        return res.status(400).json(errors);
                    }
                });
        });
});

router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});

module.exports = router;

/* // RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {
    User.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
});
 */


//var $ = require('jquery');

//var http = require('http');
//var  haversine = require('s-haversine');


//var googleMapsClient = require('@google/maps').createClient({
//    key: 'AIzaSyAKNBB8vVvdbaL1tGDXit8a7xeJyIfFYCk'
//});
//
//// CREATES A NEW USER
//router.post('/', function (req, res) {
//    User.create({
//        name: req.body.name,
//        email : req.body.email,
//        password : req.body.password
//        ///latlon
//        
//        //LatLng: req.body.LatLng,
//        //lat: req.body.lat,
//       // lon: req.body.lon
//
//    },
//
//       function (err, user) {
//            if (err) return res.status(500).send("There was a problem adding the information to the database.");
//            res.status(200).send(response.json.results);
//           //get elevation from json response
//           var elevationStr = response.json.results[0].elevation;
//           console.log(elevationStr);
//
//        });
//});
//// RETURNS ALL THE USERS IN THE DATABASE
//router.get('/', function (req, res) {
//    User.find({}, function (err, users) {
//        if (err) return res.status(500).send("There was a problem finding the users.");
//        res.status(200).send(users);
//    });
//
//});
//
//// GETS A SINGLE USER FROM THE DATABASE
///*
//router.get('/:id', function (req, res) {
//    User.findById(req.params.id, function (err, user) {
//        if (err) return res.status(500).send("There was a problem finding the user.");
//        if (!user) return res.status(404).send("No user found.");
//        res.status(200).send(user);
//
//
//    });
//});
//*/
//
//
//
//
///*//get elevation of user by get id
//router.get('/:id', function (req, res) {
//
//    User.googleMapsClient.elevation({
//        locations: {
//        lat: user.id.lat,
//        lng: user.id.lon
//}
//
//},  (err, response) => {
//    if (!err && response.status === 200) {
//        return response.json.results
//    }
//        console.log(response);
//})
//});*/
//
//
//
//
//
//
//
//// DELETES All USER FROM THE DATABASE
//router.delete('/:id', function (req, res) {
//    User.findByIdAndRemove(req.params.id, function (err, user) {
//        if (err) return res.status(500).send("There was a problem deleting the user.");
//        res.status(200).send("User "+ user.name +" was deleted.");
//    });
//});
//
//// UPDATES A SINGLE USER IN THE DATABASE
//router.put('/:id', function (req, res) {
//    
//    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
//        if (err) return res.status(500).send("There was a problem updating the user.");
//        res.status(200).send(user);
//    });
//});
//
//
///*
//router.get('/:id',function (req,res) {
//
//    User.findById(req.params.id, function (err, user) {
//
//
//        console.log("User : " + user.name );
//        var lat = user.lat;
//
//        console.log("lat : " + user.lat);
//        var lon = user.lon;
//
//        console.log("lon : " + lon);
//
//        // now we use the templating capabilities of express and call our template to render the view, and pass a few parameters to it
//        res.render("index.ejs", {lat: lat, lon: lon});
//
//    })
//    });
//*/

//router
//module.exports = router;

