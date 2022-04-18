const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sendRequestSchema = new Schema({
  FullName: {
    type: String,
    required: true,
    min: 5,
  },
  CarMileage: {
    type: String,
    required: true,
  },
  ContactNumber: {
    type: Number,
    required: true,
    min: 10,
  },
  Services: {
    type: String,
    required: true,
  },
  CarandModel: {
    type: String,
    required: true,
  },
  Day: {
    type: String,
    required: true,
  },
  Time: {
    type: String,
    required: true,
  },
  RequestType: {
    type: String,
    required: true,
  },
});
const SendRequest = mongoose.model('SendRequest', sendRequestSchema);
module.exports = SendRequest;
