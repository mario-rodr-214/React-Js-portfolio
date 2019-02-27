const { Appointment, Slot } = require("../models/Appointment");
const Nexmo = require("nexmo");
var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get("/appointments", function(req, res) {
  /*   Appointment.find(
    { name: "Ashley Perez" },
    { _id: 1, name: 1, email: 1, slots: 1 }
  ).exec((err, appointments) => res.json(appointments));
 */
  var query = req.query.name;
  Appointment.find(
    { name: req.query.name },
    { _id: 1, name: 1, email: 1, slots: 1 }
  ).then(appointments => {
    res.json(appointments);
  });
});

router.get("/appointments/byEmailandDate", function(req, res) {
  var reqeustQuery = {
    email: req.query.email,
    slot_date: req.query.slot_date
  };
  var e = req.query.email;
  console.log("e ", reqeustQuery.email);

  Appointment.find({ e }).then(appointments => {
    if (!appointments) {
      console.log("email not found");
      return res.status(404).json({
        email: "Not found in database"
      });
    }

    Appointment.find({})
      .where("email")
      .equals(e)
      .exec((err, appointments) =>
        res.json(appointments.forEach(function(item) {}))
      );
  });
});

router.post("/createAppointment", function(req, res) {
  var requestBody = req.body;

  var newslot = new Slot({
    slot_time: req.body.slot_time,
    slot_date: req.body.slot_date,
    created_at: Date.now()
  });
  newslot.save();
  var newappointment = new Appointment({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    slots: newslot._id
  });
  const nexmo = new Nexmo({
    apiKey: "9b6971d2",
    apiSecret: "XGWZl3ik8Uf5EOZQ"
  });
  let msg =
    req.body.name +
    " " +
    "this message is to confirm your appointment at" +
    " " +
    req.body.slot_time +
    " on " +
    req.body.slot_date;

  // and saves the record to
  // the data base
  newappointment.save((err, saved) => {
    // Returns the saved appointment
    // after a successful save
    Appointment.find({ _id: saved._id })
      .populate("slots")
      .exec((err, appointment) => res.json(appointment));
  });
  const from = 16415838732; //owner number
  const to = 12147189746; //number from person making appointment

  nexmo.message.sendSms(from, to, msg, (err, responseData) => {
    if (err) {
      console.log(err);
    } else {
      console.dir(responseData);
    }
  });
});

module.exports = router;
