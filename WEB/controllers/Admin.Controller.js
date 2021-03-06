const fetch = require("node-fetch");
const URI = "https://api.northeastcarcare.me/api";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

//Render
exports.renderAddProduct = async (req, res) => {
  res.render("admin/AdminAddproduct", {
    layout: "admin/AdminAddproduct",
  });
};

exports.renderAddService = async (req, res) => {
  res.render("admin/AdminAddservice", {
    layout: "admin/AdminAddservice",
  });
};

exports.AdminSchedules = async (req, res) => {
  res.render("admin/AdminSchedules", {
    layout: "admin/AdminSchedules",
  });
};

exports.AdminArchive = async (req, res) => {
  res.render("admin/AdminArchive", {
    layout: "admin/AdminArchive",
  });
};

exports.AdminHome = async (req, res) => {
  res.render("admin/AdminHome", {
    layout: "admin/AdminHome",
  });
};

exports.AdminProducts = async (req, res) => {
  res.render("admin/AdminProducts", {
    layout: "admin/AdminProducts",
  });
};

exports.AdminRequest = async (req, res) => {
  res.render("admin/AdminRequest", {
    layout: "admin/AdminRequest",
  });
};

exports.AdminServices = async (req, res) => {
  res.render("admin/AdminServices", {
    layout: "admin/AdminServices",
  });
};

exports.AdminUserAccount = async (req, res) => {
  res.render("admin/AdminUserAccount", {
    layout: "admin/AdminUserAccount",
  });
};

exports.Updateproduct = async (req, res) => {
  res.render("admin/Updateproduct", {
    layout: "admin/Updateproduct",
  });
};

exports.Updateservice = async (req, res) => {
  res.render("admin/Updateservice", {
    layout: "admin/Updateservice",
  });
};

// //Add Service
exports.AdminAddService = async (req, res) => {
  try {
    console.log(req.file);
    console.log(req.body);
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        responseType: "json",
      },
      body: JSON.stringify({
        Servicename: req.body.Servicename,
        image_service: req.file.path,
        hourClient: req.body.hourClient,
        minuteClient: req.body.minuteClient,
      }),
    };

    const response = await fetch(`${URI}/addservice`, options);
    const resData = await response.json();

    console.log("result:", resData);
    if (response.status === 200) {
      res.redirect("/Admin/Services");
      // res.render('admin/AdminServices', {
      //   layout: 'admin/AdminServices',
      //   resData: resData,
      //   sucess: true,
      // });
    } else {
      res.redirect("/Admin/Services");
      // // res.render('admin/AdminServices', {
      // //   layout: 'admin/AdminServices',
      // //   resData: resData,
      // //   sucess: false,
      // });
    }
  } catch (error) {
    console.log(error);
  }
};
//Add Service End

// //Add Product
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
      res.redirect("/Admin/Products");
      // res.render('admin/AdminProducts', {
      //   layout: 'admin/AdminProducts',
      //   resData: resData,
      //   sucess: true,
      // });
    } else {
      res.redirect("/Admin/Products");
      // res.render('admin/AdminProducts', {
      //   layout: 'admin/AdminProducts',
      //   resData: resData,
      //   sucess: false,
      // });
    }
  } catch (error) {
    console.log(error);
  }
};
//Add Product End

//Displaying Image Service Start
exports.AdminServices = async (req, res) => {
  // const adminId = req.cookies.adminId;
  // console.log(adminId);
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
  console.log(resData.data);
  const { Servicename, Time, Image } = resData.data;
  res.render("admin/AdminServices", {
    layout: "admin/AdminServices",
    resData: resData,
  });
};
//Displaying Image Service End

//Displaying Image Product Start
exports.AdminProducts = async (req, res) => {
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
  // console.log(resData);
  const { Productname, Image, Price } = resData.data;
  res.render("admin/AdminProducts", {
    layout: "admin/AdminProducts",
    resData: resData,
  });
};
//Displaying Image Service End

//display Request
exports.AdminRequest = async (req, res) => {
  const userId = req.cookies.userId;
  const token = req.cookies.authToken;
  const options = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
      responseType: "json",
    },
  };

  const response = await fetch(`${URI}/pending`, options);
  const resData = await response.json();
  const data = resData.data;

  let newDatas = [];
  for (let i = 0; i < data.length; i++) {
    const cart = data[i].cart;
    const services = [];
    for (let x = 0; x < cart.length; x++) {
      services.push(cart[x].serviceName);
    }
    newDatas.push({
      ...data[i],
      services: services,
    });
  }

  // console.log("resData", newDatas)

  res.render("admin/AdminRequest", {
    layout: "admin/AdminRequest",
    resData: newDatas,
  });
};
//end

//display Schedules
exports.AdminSchedules = async (req, res) => {
  const options = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
      responseType: "json",
    },
  };
  const response = await fetch(`${URI}/approve`, options);
  const resData = await response.json();
  const data = resData.data;

  let newDatas = [];
  for (let i = 0; i < data.length; i++) {
    const cart = data[i].cart;
    const services = [];
    for (let x = 0; x < cart.length; x++) {
      services.push(cart[x].serviceName);
    }
    newDatas.push({
      ...data[i],
      services: services,
    });
  }

  res.render("admin/AdminSchedules", {
    layout: "admin/AdminSchedules",
    resData: newDatas,
  });
};
//end

// GETHOME
exports.AdminHome = async (req, res) => {
  const userId = req.cookies.userId;
  const token = req.cookies.authToken;
  const options = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
      responseType: "json",
    },
  };

  const response = await fetch(`${URI}/done`, options);
  const resData = await response.json();
  const data = resData.data;

  let newDatas = [];
  for (let i = 0; i < data.length; i++) {
    const cart = data[i].cart;
    const services = [];
    for (let x = 0; x < cart.length; x++) {
      services.push(cart[x].serviceName);
    }
    newDatas.push({
      ...data[i],
      services: services,
    });
  }

  res.render("admin/AdminHome", {
    layout: "admin/AdminHome",
    resData: newDatas,
  });
};
// GETHOME END

//display Archive
exports.AdminArchive = async (req, res) => {
  const userId = req.cookies.userId;
  const token = req.cookies.authToken;
  const options = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
      responseType: "json",
    },
  };

  const response = await fetch(`${URI}/archieve`, options);
  const resData = await response.json();
  const data = resData.data;

  let newDatas = [];
  for (let i = 0; i < data.length; i++) {
    const cart = data[i].cart;
    const services = [];
    for (let x = 0; x < cart.length; x++) {
      services.push(cart[x].serviceName);
    }
    newDatas.push({
      ...data[i],
      services: services,
    });
  }

  res.render("admin/AdminArchive", {
    layout: "admin/AdminArchive",
    resData: newDatas,
  });
};
//end

//display Useraccounts
exports.AdminUserAccount = async (req, res) => {
  const options = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
      responseType: "json",
    },
  };
  const response = await fetch(`${URI}/users`, options);
  const resData = await response.json();
  console.log(resData);
  const {
    FullName,
    Gender,
    Age,
    CarMilage,
    ContactNumber,
    Services,
    CarandModel,
    Day,
    Time,
    RequestType,
  } = resData.data;
  res.render("admin/AdminUserAccount", {
    layout: "admin/AdminUserAccount",
    resData: resData,
  });
};
//end

//Update Image Product

exports.imageUpdateproduct = async (req, res) => {
  const image = req.body;
  console.log(image);
  const Product_id = req.body.Product_id;
  console.log(Product_id);
  const options = {
    method: "PUT",
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

  const response = await fetch(`${URI}/product/update/${Product_id}`, options);
  const resData = await response.json();
  console.log(resData);

  if (response.status === 200) {
    res.redirect("/Admin/Products");
    // res.render('admin/AdminProducts', {
    //   layout: 'admin/AdminProducts',
    //   resData: resData,
    //   sucess: true,
    // });
  } else {
    res.redirect("/Admin/Products");
    // res.render('admin/AdminProducts', {
    //   layout: 'admin/AdminProducts',
    //   resData: resData,
    //   sucess: false,
  }
};

//end update product

//Update Image Service

exports.imageUpdateservice = async (req, res) => {
  const image = req.body;
  console.log(image);
  const Service_id = req.body.Service_id;
  console.log(Service_id);
  const options = {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
      responseType: "json",
    },
    body: JSON.stringify({
      Servicename: req.body.Servicename,
      image_service: req.file.path,
      Time: req.body.Time,
    }),
  };

  const response = await fetch(`${URI}/service/update/${Service_id}`, options);
  const resData = await response.json();
  console.log(resData);

  if (response.status === 200) {
    res.redirect("/Admin/Services");
    // res.render('admin/Updateservice', {
    //   layout: 'admin/Updateservice',
    //   resData: resData,
    //   sucess: true,
    // });
  } else {
    res.redirect("/Admin/Services");
    // res.render('admin/Updateservice', {
    //   layout: 'admin/Updateservice',
    //   resData: resData,
    //   sucess: false,
  }
};

//end Service product
