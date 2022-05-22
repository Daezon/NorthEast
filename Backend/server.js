console.clear();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const multer = require("multer");

// Routes
const UserRoute = require("./Routes/User.Routes");
const ServiceRoute = require("./Routes/Services.Routes");
const SendrequestRoute = require("./Routes/Sendrequest.Routes");
const ProductRoute = require("./Routes/Product.Routes");
const FeedbackRoute = require("./Routes/Feedback.Routes");
const CartRoute = require("./Routes/Cart.Routes");
const BookingRoute = require("./Routes/Booking.Routes");

const app = express();
const dbURI = process.env.dbURI;
const PORT = process.env.PORT;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Routes Middlewares
app.use("/api", UserRoute);
app.use("/api", ServiceRoute);
app.use("/api", SendrequestRoute);
app.use("/api", ProductRoute);
app.use("/api", FeedbackRoute);
app.use("/api", CartRoute);
app.use("/api", BookingRoute);

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

mongoose.connect(dbURI, options).then((res) => {
  console.log("Connected to", res.connections[0].name);
  app.listen(PORT, () => {
    console.log(`CasaServer is running on port ${PORT}`);
  });
});

//upload image

// const imageStorage = multer.diskStorage({
//   destination:(req , file, cb) => {
//     cb(null, './images')
//   },
//   filename: (req, file, cb)=>{
//     cb(null, file.originalname);
//   },
// });
// const upload = multer({storage:imageStorage });

// app.post("/single", upload.single("image"),(req,
//   res)=>{
//     console.log(req.file);
//     res.send("Gumana")
//   });
