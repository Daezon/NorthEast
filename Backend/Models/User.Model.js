const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const moment = require("moment-timezone");
// const datetoday = moment.tz(Date.now(),"Asia/Manila");

const UsersSchema = new Schema({
  FullName: {
    type: String,
    required: true,
    min: 5,
  },
  Address: {
    type: String,
    required: true,
  },
  ContactNumber: {
    type: String,
    required: true,
    max: 10,
  },
  Email: {
    type: String,
    required: true,
    max: 8,
  },
  Password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  Notification: [
    {
      Title: {
        type: String,
      },
      Message: {
        type: String,
      },
      Date: {
        type: String,
      },
    },
  ],
});
const Users = mongoose.model('Users', UsersSchema);
module.exports = Users;
