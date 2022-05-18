const { response } = require("express");
const fetch = require("node-fetch");
const URI = "http://localhost:8080/api";
const { ms, s, m, h, d } = require("time-convert");

exports.register = async (req, res) => {
  res.render("customer/Register", {
    layout: "customer/Register",
  });
};

exports.index = async (req, res) => {
  res.render("customer/index", {
    layout: "customer/index",
  });
};

exports.customerServices = async (req, res) => {
  res.render("customer/customerServices", {
    layout: "customer/customerServices",
  });
};

exports.customerBooking = async (req, res) => {
  res.render("customer/customerBooking", {
    layout: "customer/customerBooking",
  });
};

exports.customerNotification = async (req, res) => {
  res.render("customer/customerNotification", {
    layout: "customer/customerNotification",
  });
};

exports.customerProducts = async (req, res) => {
  res.render("customer/customerProducts", {
    layout: "customer/customerProducts",
  });
};

exports.customerhome = async (req, res) => {
  res.render("customer/customerhome", {
    layout: "customer/customerhome",
  });
};

exports.condition = async (req, res) => {
  res.render("customer/condition", {
    layout: "customer/condition",
  });
};

exports.customerCart = async (req, res) => {
  res.render("customer/customerCart", {
    layout: "customer/customerCart",
  });
};
//register
exports.userregister = async (req, res) => {
  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
      responseType: "json",
    },
    body: JSON.stringify({
      FullName: req.body.FullName,
      Address: req.body.Address,
      ContactNumber: req.body.ContactNumber,
      Email: req.body.Email,
      Password: req.body.Password,
    }),
  };

  const response = await fetch(`${URI}/user/register`, options);
  const resData = await response.json();
  // console.log(resData);
  if (response.status == 200) {
    res.render("customer/Register", {
      layout: "customer/Register",
      resData: resData,
      success: true,
    });
  } else {
    res.render("customer/Register", {
      layout: "customer/Register",
      resData: resData,
      success: true,
    });
  }
};

//Log in
exports.userLogin = async (req, res) => {
  try {
    const idData = await req.body.emailLogIn;
    if (
      idData.includes("ragamatocram@gmail12544553.com") ||
      idData.includes("admin123@gmail.com")
    ) {
      const options = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          responseType: "json",
        },
        body: JSON.stringify({
          Email: req.body.emailLogIn,
          Password: req.body.passwordLogIn,
        }),
      };

      const response = await fetch(`${URI}/user/login`, options);
      const resData = await response.json();
      console.log(resData);
      if (response.status == 200) {
        res.cookie("authToken", resData.token, { maxAge: 24 * 60 * 60 * 1000 });
        res.cookie("adminId", resData._id, { maxAge: 24 * 60 * 60 * 1000 });
        res.render("admin/AdminHome", {
          layout: "admin/AdminHome",
          resData: resData,
          success: true,
          message: resData.message,
        });
      } else {
        res.render("customer/index", {
          layout: "customer/index",
          resData: resData,
          success: true,
        });
      }
    } else {
      const options = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          responseType: "json",
        },
        body: JSON.stringify({
          Email: req.body.emailLogIn,
          Password: req.body.passwordLogIn,
        }),
      };
      const response = await fetch(`${URI}/user/login`, options);
      const resData = await response.json();
      console.log(resData);
      if (response.status == 200) {
        res.cookie("authToken", resData.token, { maxAge: 24 * 60 * 60 * 1000 });
        res.cookie("userId", resData._id, { maxAge: 24 * 60 * 60 * 1000 });
        res.render("customer/customerhome", {
          layout: "customer/customerhome",
          resData: resData,
          success: true,
          message: resData.message,
        });
      } else {
        res.render("customer/index", {
          layout: "customer/index",
          resData: resData,
          success: true,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
// exports.userLogin = async (req, res) => {
//   const options = {
//     method: 'POST',
//     headers: {
//       'Content-type': 'application/json',
//       Accept: 'application/json',
//       responseType: 'json',
//     },
//     body: JSON.stringify({
//       Email: req.body.emailLogIn,
//       Password: req.body.passwordLogIn,
//     }),
//   };

//   const response = await fetch(`${URI}/user/login`, options);
//   const resData = await response.json();
//   //console.log(resData);
//   const token = await resData.token;
//   console.log(token);

//   if (response.status == 200) {
//     res.cookie('authToken', resData.token, { maxAge: 24 * 60 * 60 * 1000 });
//     res.cookie('userId', resData._id, { maxAge: 24 * 60 * 60 * 1000 });
//     res.render('customer/customerhome', {
//       layout: 'customer/customerhome',
//       resData: resData,
//       success: true,
//       message: resData.message,
//     });
//   } else {
//     res.render('customer/index', {
//       layout: 'customer/index',
//       resData: resData,
//       success: true,
//     });
//   }
// };

//Displaying Image Service Start
exports.customerServices = async (req, res) => {
  // const userId = req.cookies.userId;
  // console.log(userId);
  const options = {
    method: "GET",
    headers: {
      // Authorization: req.cookies.authToken,
      "Content-type": "application/json",
      Accept: "application/json",
      responseType: "json",
    },
  };
  const response = await fetch(`${URI}/services`, options);
  const resData = await response.json();
  console.log(resData);
  const { Servicename, Image, Time } = resData.data;
  res.render("customer/customerServices", {
    layout: "customer/customerServices",
    resData: resData,
  });
};
//Displaying Image Product End

//Displaying Image Product Start
exports.customerProducts = async (req, res) => {
  // const userId = req.cookies.userId;
  // console.log(userId);
  const options = {
    method: "GET",
    headers: {
      // Authorization: req.cookies.authToken,
      "Content-type": "application/json",
      Accept: "application/json",
      responseType: "json",
    },
  };
  const response = await fetch(`${URI}/product`, options);
  const resData = await response.json();
  console.log(resData);
  const { Productname, Image, Price } = resData.data;
  res.render("customer/customerProducts", {
    layout: "customer/customerProducts",
    resData: resData,
  });
};
//Displaying Image Service End

//Booking
exports.sendrequest = async (req, res) => {
  const token = await req.cookies.authToken;
  // console.log(req.cookies.authToken)
  const options = {
    method: "POST",
    headers: {
      authToken: token,
      "Content-type": "application/json",
      Accept: "application/json",
      responseType: "json",
    },
    body: JSON.stringify({
      FullName: req.body.FullName,
      CarMileage: req.body.CarMileage,
      ContactNumber: req.body.ContactNumber,
      CarandModel: req.body.CarandModel,
      RequestType: req.body.RequestType,
    }),
  };

  const response = await fetch(`${URI}/sendrequest`, options);
  const resData = await response.json();
  console.log(resData);

  if (response.status == 200) {
    res.render("customer/customerBooking", {
      layout: "customer/customerBooking",
      resData: resData,
      success: true,
    });
  } else {
    res.render("customer/customerBooking", {
      layout: "customer/customerBooking",
      resData: resData,
      success: true,
    });
  }
};
//End Booking

// //Update Product
exports.AdminAddProduct = async (req, res) => {
  try {
    const image = req.body;
    console.log(image);
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        responseType: "json",
      },
      body: JSON.stringify({
        Productname: req.body.Productname,
        image_product: req.file.path,
        Price: req.body.Price,
      }),
    };

    const response = await fetch(`${URI}/addproduct`, options);

    const resData = await response.json();

    console.log("result:", resData);
    if (response.status === 200) {
      res.render("admin/AdminProducts", {
        layout: "admin/AdminProducts",
        resData: resData,
        sucess: true,
      });
    } else {
      res.render("admin/AdminProducts", {
        layout: "admin/AdminProducts",
        resData: resData,
        sucess: false,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
//Add Product End

// //Displaying Image Service Start
// exports.customerBooking = async (req, res) => {
//   // const userId = req.cookies.userId;
//   // console.log(userId);
//   const options = {
//     method: "GET",
//     headers: {
//       // Authorization: req.cookies.authToken,
//       "Content-type": "application/json",
//       Accept: "application/json",
//       responseType: "json",
//     },
//   };
//   const response = await fetch(`${URI}/services`, options);
//   const resData = await response.json();
//   console.log(resData);
//   const { Servicename, Image, Time } = resData.data;
//   res.render("customer/customerBooking", {
//     layout: "customer/customerBooking",
//     resData: resData,
//   });
// };

// displayCart;
exports.customerCart = async (req, res) => {
  const userId = req.cookies.userId;
  const token = req.cookies.authToken;
  console.log(token);
  const options = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
      responseType: "json",
    },
  };
  const optionTwo = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      authToken: req.cookies.authToken,
      Accept: "application/json",
      responseType: "json",
    },
  };
  const response = await fetch(`${URI}/cart/${userId}`, options);
  const resData = await response.json();

  // {{{resDataTwo.data.}}}
  res.render("customer/customerCart", {
    layout: "customer/customerCart",
    resData: resData,
  });
};

// //addtocart
// exports.customerCart = async (req, res) => {
//   const token = await req.cookies.authToken;
//   // console.log(req.cookies.authToken)
//   const options = {
//     method: "POST",
//     headers: {
//       authToken: token,
//       "Content-type": "application/json",
//       Accept: "application/json",
//       responseType: "json",
//     },
//     body: JSON.stringify({
//       Clientid: req.User._id,
//       serviceName: serviceurl.data.data.Servicename,
//       serviceTime: serviceurl.data.data.Time,
//       serviceImage: serviceurl.data.data.Image,
//       carttype: carttype,
//     }),
//   };

//   const response = await fetch(`${URI}/cart/{Ser}`, options);
//   const resData = await response.json();
//   console.log(resData);

//   if (response.status == 200) {
//     res.render("customer/customerServices", {
//       layout: "customer/customerServices",
//       resData: resData,
//       success: true,
//     });
//   } else {
//     res.render("customer/customerServices", {
//       layout: "customer/customerServices",
//       resData: resData,
//       success: true,
//     });
//   }
// };
