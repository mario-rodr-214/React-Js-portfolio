var mongoose = require('mongoose');
//const Slot = require('../models/Slot');

const Schema = mongoose.Schema;
ObjectId = mongoose.Schema.Types.ObjectId;

const slotSchema = new Schema({
  slot_time: String,
  slot_date: String,
  created_at: Date
});


const Slot = mongoose.model('Slot', slotSchema);
const appointmentSchema = new Schema({
  id: ObjectId,
  name: String,
  email: String,
  phone: Number,
  slots: { type: ObjectId, ref: 'Slot' },
  created_at: Date
});

const Appointment = mongoose.model('Appointments', appointmentSchema);
module.exports = {Appointment, Slot} ;





