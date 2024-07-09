const express = require("express");

const router = express.Router();

//simple get request
router.get("/", (req, res, next) => {
  res.status(200).json({
    Message: "Get request from products",
  });
});

// specific get product request
router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  if (id === "newProduct") {
    res.status(200).json({
      Message: "You got a new product",
      Id: id,
    });
  } else {
    res.status(200).json({
      Message: "Old product it is",
      Id: id,
    });
  }
});

// simple post request
router.post("/", (req, res, next) => {
  const productData = {
    productName: req.body.pName,
    productPrice: req.body.pPrice,
  };
  res.status(200).json({
    Message: "Post request from products",
    productData: productData,
  });
});

//specific post product request

router.post("/:productId", (req, res, next) => {
  const id = req.params.productId;
  res.status(200).json({
    Message: `Post request to  ${id} done`,
  });
});

//simple delete
router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;
  res.status(200).json({
    Message: `${id} product deleted`,
  });
});

//patch
router.patch("/:productId", (req, res, next) => {
  const id = req.params.productId;
  res.status(200).json({
    Message: `${id} product updated`,
  });
});

module.exports = router;
