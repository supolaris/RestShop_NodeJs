const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const ProductSchema = require("../models/products");

//simple get request
router.get("/", (req, res, next) => {
  ProductSchema.find()
    .exec()
    .then((docs) => {
      console.log(docs);
      if (docs) {
        res.status(200).json(docs);
      } else {
        res.status(404);
        res.json({
          Message: "No products data found",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// specific get product request
router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  ProductSchema.findById(id)
    .exec()
    .then((doc) => {
      console.log("Data from mongoDb Atlas Database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404);
        res.json({
          Message: "No valid entry found again given id",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// simple post request
router.post("/", (req, res, next) => {
  const product = new ProductSchema({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.ProductName,
    price: req.body.ProductPrice,
  });
  product
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        Message: "Post request from products",
        CreatedProduct: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
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
  ProductSchema.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      res.status(500).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

//patch
router.patch("/:productId", (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  ProductSchema.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
