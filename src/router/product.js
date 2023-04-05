const express = require("express");
const router = express.Router();
const productController = require("../controller/product");
// const { protect, isSeller } = require('../middlewares/auth')
// const { hitCacheProductDetail, clearCacheProductDetail } = require('../middlewares/redis')

router
  .get("/", productController.getProduct)
  .get("/:id", productController.getProductDetail)
  .post("/", productController.addProduct)
  .put("/:id", productController.updateProduct);
//   .delete("/:id", productController.deleteProduct);

module.exports = router;
