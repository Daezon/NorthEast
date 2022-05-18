const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
  Commentatorid: {
    type: String,

  },
  Message: {
    type: String,

  },
  Date: {
    type: Number,
  },
});
const FeedBack = mongoose.model("Feedback", FeedbackSchema);
module.exports = FeedBack;