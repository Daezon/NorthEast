const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  FullName: {
    type: String,

    min: 5,
  },

  CarMileage: {
    type: String,
  },

  ContactNumber: {
    type: Number,
    min: 10,
  },
  CarandModel: {
    type: String,
  },

  Schedule: {
    type: Number,
  },

  ScheduleDate: {
    type: String,
  },

  RequestType: {
    type: String,
  },
  cart: [String],
});
const Booking = mongoose.model("booking", bookingSchema);
module.exports = Booking;
