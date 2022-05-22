const Users = require('../Models/User.Model');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//register
exports.addUser = async (req, res) => {
  try {
    const find = await Users.find({ Email: req.body.Email });

    const validationSchema = Joi.object({
      FullName: Joi.string().min(4).required(),
      Address: Joi.string().min(5).required(),
      ContactNumber: Joi.string().length(11).required(),
      Email: Joi.string().min(8).required().email(),
      Password: Joi.string()
        .required()
        .pattern(new RegExp('^([A-Z])(?=.*?[a-z])(?=.*?[0-9]).{7,}$')),
    });

    const { error } = validationSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //salt and hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.Password, salt);

    //search if email is already in use
    if (find.length >= 1) {
      return res.status(403).send({ message: 'Email is already existing' });
    } else {
      const user = new Users({
        FullName: req.body.FullName,
        Address: req.body.Address,
        ContactNumber: req.body.ContactNumber,
        Email: req.body.Email,
        Password: hashedPassword,
      });

      const saveUser = await user.save();
      // res.send({
      //   user: user._id,
      //   message: `${req.body.FullName} is successfully created.`,
      // });
      return res.status(200).send({
        message: 'Successfully Created!',
        status: 200,
        data: saveUser,
      });
    }
  } catch (err) {
    return res.status(400).send(err.message);
  }
};
//login
exports.userLogin = async (req, res) => {
  try {
    const validation = Joi.object({
      Email: Joi.string().required().min(2),
      Password: Joi.string().required(),
    });

    // Request Validations
    const { error } = validation.validate(req.body);
    if (error)
      return res.status(400).send({
        message: error.details[0].message,
        statusCode: 400,
      });

    // Check if email exists
    const User = await Users.findOne({ Email: req.body.Email });
    if (!User)
      return res.status(404).send({
        message: `User not found`,
        statusCode: 404,
      });

    // Check if password valid
    const validPass = await bcrypt.compare(req.body.Password, User.Password);
    if (!validPass)
      return res.status(403).send({
        message: ` Incorrect Email or password`,
        statusCode: 403,
      });

    // Create and assign token
    const payload = {
      _id: User._id,
      username: User.username,
      role: User.role,
    };

    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1d',
    });

    return res.status(200).header('authToken', token).send({
      token: token,
      _id: User._id,
      logged_in: 'Yes',
      message: `User verified`,
      statusCode: 200,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err.message, statusCode: 400 });
  }
};

//get user by id
exports.getUserInfo = async (req, res) => {
  try {
    const getInfo = await Users.findById(req.params._id);
    return res
      .status(200)
      .json({ message: 'User Retrived', data: getInfo, statusCode: 200 });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err.message, statusCode: 400 });
  }
};
//get all user
exports.getUsers = async (req, res) => {
  try {
    const User = await Users.find();
    return res
      .status(200)
      .json({ data: User, message: 'Get Users', status: 200 });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: 400 });
  }
};
//update user
exports.updateUser = async (req, res) => {
  try {
    const validationSchema = Joi.object({
      FullName: Joi.string().min(4).required(),
      Address: Joi.string().min(5).required(),
      Password: Joi.string()
        .required()
        .pattern(new RegExp('^([A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')),
    });
    const { error } = validationSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.Password, salt);
    const updateUser = await Users.updateMany(
      { _id: req.params.User_id },
      {
        FullName: req.body.FullName,
        Address: req.body.Address,
        Password: hashedPassword,
      }
    );
    return res
      .status(200)
      .json({ data: updateUser, message: 'User Updated', status: 200 });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: 400 });
  }
};

//notifAccept
exports.notificationAccept = async (req, res) => {
  try {
    const id = req.params._id;
    const url = await axios.get(`http://localhost:8080/api/getRequest/${id}`);
    console.log(url.data.data);
    const result = url.data.data;
    const userID = result.ClientID;
    const titleResult = result.Services;
    const dayResult = result.Day;
    const timeResult = result.Time;
    const clientResult = result.FullName;
    console.log(userID);
    // const requestTypeResult = result.RequestType;
    const RequestTypeStats = 'Accepted';
    const message = `Your Request ${titleResult} on ${dayResult} ${timeResult} has been ${RequestTypeStats}`;

    const updateReq = await RequestService.updateOne(
      { _id: id },
      {
        RequestType: RequestTypeStats,
      }
    );

    const date = mydate('full', '/');
    await Users.findOneAndUpdate(
      {
        _id: userID,
      },
      {
        $addToSet: {
          Notification: [
            {
              Title: titleResult,
              Message: message,
              Date: date,
              reqType: RequestTypeStats,
            },
          ],
        },
      }
    );
    return res.status(200).json({ message: 'Notification Sent!', status: 200 });
  } catch (error) {
    console.log(error);
  }
};

//notificationDecline
exports.notificationDecline = async (req, res) => {
  try {
    const id = req.params._id;
    const url = await axios.get(`http://localhost:8080/api/getRequest/${id}`);
    console.log(url.data.data);
    const result = url.data.data;
    const userID = result.ClientID;
    const titleResult = result.Services;
    const dayResult = result.Day;
    const timeResult = result.Time;
    // const clientResult = result.FullName;
    console.log(userID);
    // const requestTypeResult = result.RequestType;
    const RequestTypeStats = 'Decline';
    const message = `Your Request ${titleResult} on ${dayResult} ${timeResult} has been ${RequestTypeStats}`;

    const updateReq = await RequestService.updateOne(
      { _id: id },
      {
        RequestType: RequestTypeStats,
      }
    );

    const date = mydate('full', '/');
    await Users.findOneAndUpdate(
      {
        _id: userID,
      },
      {
        $addToSet: {
          Notification: [
            {
              Title: titleResult,
              Message: message,
              Date: date,
              reqType: RequestTypeStats,
            },
          ],
        },
      }
    );
    return res.status(200).json({ message: 'Notification Sent!', status: 200 });
  } catch (error) {
    console.log(error);
  }
};

