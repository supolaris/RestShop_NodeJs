const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();

// importing apis form their files
const productsRoutes = require("./apis/products/products");
const ordersRoutes = require("./apis/orders/orders");

// using morgan package to log api details
app.use(morgan("dev"));
// using body-parser package to parse data and make it readable
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// adding routing and they are used as URLs
app.use("/products", productsRoutes);
app.use("/orders", ordersRoutes);

// specifying the urls acces (handling CORS error)
app.use((req, res, next) => {
  // allow all
  res.header("Access-Control-Allow-Origin", "*");
  //specifying the url/domain
  //res.header("Access-Control-Allow-Origin", "https://mydomainname.com ")

  //allow all
  //res.header("Access-Control-Allow-Header", "*");

  //allo spedific
  res.header(
    "Access-Contorl-Allow-Header",
    "Origin, X-Requested-Auth, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Method", "PUT, GET, POST, DELETE, PATCH");
    return res.status(200).json({});
  }
});

// after passing the products and orders and if no url match them then obviously there is something else
// handling errors

// handling 404 error (not found)
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

//handling other errors
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
