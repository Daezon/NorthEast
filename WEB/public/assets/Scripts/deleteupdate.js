function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

//Delete Service
function Deletedetails(event) {
  // event.preventDefault();
  console.log(getCookie("authToken"));
  const Service_id = event.target.id.value;
  (async () => {
    try {
      const baseURL = await fetch(
        `http://localhost:8080/api/service/delete/${Service_id}`,
        { method: "DELETE", headers: { Authorization: getCookie("authToken") } }
      );
      const result = await baseURL.json();
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  })();
}

//Delete Product
function DeleteProduct(event) {
  // event.preventDefault();
  console.log(getCookie("authToken"));
  const Product_id = event.target.id.value;
  (async () => {
    try {
      const baseURL = await fetch(
        `http://localhost:8080/api/product/delete/${Product_id}`,
        { method: "DELETE", headers: { Authorization: getCookie("authToken") } }
      );
      const result = await baseURL.json();
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  })();
}

const updateConfirm = async (event) => {
  // console.log('nanayko');
  event.preventDefault();

  const text = document.getElementById("Productname").value;

  const productId = document.getElementById("ProductID").value;

  const price = document.getElementById("Price").value;

  const image = document.getElementById("ImageFile").value;
  console.log(image);
  try {
    const baseURL = await fetch(
      `http://localhost:8080/api/product/update/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          responseType: "json",
        },
        body: JSON.stringify({
          Productname: text,
          Image: image,
          Price: price,
        }),
      }
    );
    const result = await baseURL.json();
    console.log(result.data);
  } catch (error) {
    console.log(error);
  }
};

//Accept Request
const Acceptrequest = async (event) => {
  //   event.preventDefault();
  console.log(getCookie("authToken"));
  const requestID = event.target.id.value;
  try {
    const baseURL = await fetch("http://localhost:8080/api/updateRequest", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: getCookie("authToken"),
      },
      body: JSON.stringify({
        requestID: requestID,
        RequestType: "Accept",
      }),
    });
    const result = await baseURL.json();
    console.log(result.data);
  } catch (error) {
    console.log(error);
  }
};

//Decline Request
const Declinerequest = async (event) => {
  //   event.preventDefault();
  console.log(getCookie("authToken"));
  const requestID = event.target.id.value;
  try {
    const baseURL = await fetch("http://localhost:8080/api/updateRequest", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: getCookie("authToken"),
      },
      body: JSON.stringify({
        requestID: requestID,
        RequestType: "Decline",
      }),
    });
    const result = await baseURL.json();
    console.log(result.data);
  } catch (error) {
    console.log(error);
  }
};

//Donerequest
const Donerequest = async (event) => {
  //   event.preventDefault();
  console.log(getCookie("authToken"));
  const requestID = event.target.id.value;
  try {
    const baseURL = await fetch("http://localhost:8080/api/updateRequest", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: getCookie("authToken"),
      },
      body: JSON.stringify({
        requestID: requestID,
        RequestType: "Done",
      }),
    });
    const result = await baseURL.json();
    console.log(result.data);
  } catch (error) {
    console.log(error);
  }
};

//Cancelledrequest
const Cancelledrequest = async (event) => {
  //   event.preventDefault();
  console.log(getCookie("authToken"));
  const requestID = event.target.id.value;
  try {
    const baseURL = await fetch("http://localhost:8080/api/updateRequest", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: getCookie("authToken"),
      },
      body: JSON.stringify({
        requestID: requestID,
        RequestType: "Cancelled",
      }),
    });
    const result = await baseURL.json();
    console.log(result.data);
  } catch (error) {
    console.log(error);
  }
};

// Get Service Details
function GetService(event) {
  event.preventDefault();
  // console.log(getCookie('authToken'));
  const Service_id = event.target.idOne.value;
  // console.log(event.target);
  (async () => {
    try {
      const baseURL = await fetch(
        `http://localhost:8080/api/services/${Service_id}`,
        { method: "GET", headers: { Authorization: getCookie("authToken") } }
      );
      const result = await baseURL.json();

      // console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  })();
}

const updateServiceConfirm = async (event) => {
  // console.log();
  event.preventDefault();

  const text = document.getElementById("Servicename").value;

  const serviceId = document.getElementById("ServiceID").value;

  const time = document.getElementById("Time").value;

  const image = document.getElementById("ImageFile").value;
  console.log(image);
  try {
    const baseURL = await fetch(
      `http://localhost:8080/api/service/update/${serviceId}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          responseType: "json",
        },
        body: JSON.stringify({
          Servicename: text,
          Image: image,
          Time: time,
        }),
      }
    );
    const result = await baseURL.json();
    console.log(result.data);
  } catch (error) {
    console.log(error);
  }
};

// addToCArt
const addCartBtn = async (event) => {
  event.preventDefault;
  const token = await req.cookies.authToken;

  const baseURL = await fetch(
    `http://localhost:8080/api/services/${Service_id}`,
    {
      method: "POST",
      headers: {
        authToken: token,
        "Content-type": "application/json",
        Accept: "application/json",
        responseType: "json",
      },
      body: JSON.stringify({
        Clientid: req.User._id,
        serviceName: serviceurl.data.data.Servicename,
        serviceTime: serviceurl.data.data.Time,
        serviceImage: serviceurl.data.data.Image,
        carttype: OnCart,
      }),
    }
  );
  const result = await baseURL.json();
  console.log(result.data);
};
