const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  Clientid: {
    type: String,
  },
  FullName: {
    type: String,
    min: 5,
  },
  CarMileage: {
    type: String,
  },
  cart: [
    {
      Clientid: String,
      serviceName: String,
      serviceTime: String,
      serviceImage: String,
      carttype: String,
    }
  ],
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
  duration: {
    type: String,
  },
  time: {
    type: String,
  },
  RequestType: {
    type: String,
  },
});
const Booking = mongoose.model("booking", bookingSchema);
module.exports = Booking;
