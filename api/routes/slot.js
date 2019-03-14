const { Appointment, Slot } = require("../models/Appointment");
const Nexmo = require("nexmo");
var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//ex. /retrieveSlots/findByDate/?slot_date=2018-2-1
router.get("/retrieveSlots/findByDate", function(req, res) {
  var slot_date = req.query.slot_date;
  console.log("slot date: ", slot_date);

  Slot.findOne({ slot_date }).then(slots => {
    if (!slots) {
      console.log("slot date not found");
      return res.status(404).json({
        slot_date: "Not found in database"
      });
    }
    Slot.find({})
      .where("slot_date")
      .equals(slot_date)
      .exec((err, slots) => res.json(slots));
  });
});

router.get("/retrieveSlots/byId", function(req, res) {
  var id = req.query._id;
  console.log("_id: ", id);

  Slot.findById(id).then(slots => {
    if (!slots) {
      console.log("id not found");
      return res.status(404).json({
        id: "Not found in database"
      });
    }
    Slot.find({})
      .where("_id")
      .equals(id)
      .exec((err, slots) => res.json(slots));
  });
});

router.get("/retrieveSlots/all", function(req, res) {
  // Returns all Slots
  Slot.find({}).exec((err, slots) => res.json(slots));
});

router.get("/retrieveSlots/create", function(req, res) {
  var requestBody = req.body;
  var newslot = new Slot({
    slot_time: requestBody.slot_time,
    slot_date: requestBody.slot_date,
    created_at: Date.now()
  });

  newslot.save((err, saved) => {
    Slot.findOne({ _id: saved._id }).exec((err, slot) => res.json(slot));
  });
  console.log("Slot created ");
});

/* const slotController = {
  create (req, res) {
    var requestBody = req.body;

    var newslot = new Slot ({
      slot_time: requestBody.slot_time,
      slot_date: requestBody.slot_date,
      created_at: Date.now()
    });
    newSlot.save((err, saved) => {
      //Returns the new slot
      //after a successful save
      Slot
        .findOne({_id: saved._id})
        .exec((err, slot) => res.json(slot));
    })
  },
  findByDate (req, res) {
    var slot_date = req.params.slot_date;
    console.log('slot date: ', slot_date);
    //slot_date = '2017-11-09';

    //Returns all slot with present date
    Slot.find({})
        .where('slot_date').equals(slot_date)
        .exec((err, slots) => res.json(slots));
  }
}; */

module.exports = router;
