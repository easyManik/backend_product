const express = require("express");
const router = express.Router();
const productController = require("../controller/product");

router
  .get("/", productController.getProduct)
  .get("/:id", productController.getProductDetail)
  .post("/", productController.addProduct)
  .put("/:id", productController.updateProduct);

module.exports = router;
