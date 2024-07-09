const express = require("express");

const router = express.Router();

//get request
router.get("/", (req, res, next) => {
  res.status(200).json({
    Message: "Get response form orders",
  });
});

//post request
router.post("/", (req, res, next) => {
  res.status(200).json({
    Message: "Post response from orders",
  });
});

//delete request
router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;
  res.status(200).json({
    Message: `${id} order deleted`,
  });
});

//patch request
router.patch("/:productId", (req, res, next) => {
  const id = req.params.productId;
  res.status(200).json({
    Message: `${id} order updated`,
  });
});

module.exports = router;
