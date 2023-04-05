const createError = require("http-errors");
const errServ = new createError.InternalServerError();

const {
  getProductDetail,
  addProduct,
  updateProduct,
  selectProduct,
  countProduct,
} = require("../model/product");
const response = require("../helper/response");

module.exports.addProduct = async (req, res, next) => {
  try {
    const {
      id,
      productID,
      productName,
      amount,
      customerName,
      transactionDate,
      createBy,
      createOn,
      status,
    } = req.body;
    const data = {
      id,
      productID,
      productName,
      amount,
      customerName,
      transactionDate,
      createBy,
      createOn,
      status: status || 0,
    };
    await addProduct(data);

    response.response(res, data, 201, "Insert Data Success");
  } catch (e) {
    console.log("error", e);
    next(errServ);
  }
};

module.exports.updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const {
      productID,
      productName,
      amount,
      customerName,
      transactionDate,
      createBy,
      createOn,
      status,
    } = req.body;
    const data = {
      id,
      productID,
      productName,
      amount,
      customerName,
      transactionDate,
      createBy,
      createOn,
      status,
    };
    await updateProduct(data);
    response.response(res, data, 201, "update success");
  } catch (e) {
    console.log(e);
    next(errServ);
  }
};
module.exports.getProduct = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;

    const sortby = req.query.sortby || "id";
    const sort = req.query.sort || "";

    const search = req.query.search || "";

    const result = await selectProduct({
      limit,
      offset,
      sortby,
      sort,
      search,
    });

    const {
      rows: [count],
    } = await countProduct();
    const totalData = parseInt(count.total);
    const totalPage = Math.ceil(totalData / limit);

    const pagination = {
      currentPage: page,
      limit,
      totalData,
      totalPage,
      username: req.payload,
    };

    response.response(res, result, 200, "Get data success", pagination);
  } catch (error) {
    console.log(error);
    next(errServ);
  }
};

module.exports.getProductDetail = async (req, res, next) => {
  try {
    const id = req.params.id;
    const {
      rows: [product],
    } = await getProductDetail(id);
    // client.setEx(`product/${id}`, 60 * 60, JSON.stringify(product))

    response.response(res, product, 200, "Get data from database");
  } catch (error) {
    console.log(error);
    next(errServ);
  }
};
