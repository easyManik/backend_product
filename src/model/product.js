const client = require("../config/db");

const addProduct = ({
  id,
  productID,
  productName,
  amount,
  customerName,
  transactionDate,
  createBy,
  createOn,
  status,
}) => {
  console.log("adding some product");

  return new Promise((resolve, reject) =>
    client.query(
      `INSERT INTO products (id, productID, productName, amount, customerName, transactionDate, createBy, createOn, status) values (${id},'${productID}', '${productName}', '${amount}', '${customerName}', '${transactionDate}', '${createBy}', '${createOn}', ${status})`,
      (e, result) => {
        if (!e) {
          resolve(result);
        } else {
          reject(e);
        }
      }
    )
  );
};

const selectProduct = ({ limit, offset, sortby, sort, search }) => {
  return new Promise((resolve, reject) => {
    client.query(
      `SELECT * FROM products WHERE productName ILIKE'%${search}%' ORDER BY ${sortby} ${sort} LIMIT $1 OFFSET $2`,
      [limit, offset],
      (err, result) => {
        if (!err) {
          resolve(result.rows);
        } else {
          reject(new Error(err));
        }
      }
    );
  });
};

const updateProduct = ({
  productID,
  productName,
  amount,
  customerName,
  transactionDate,
  createBy,
  createOn,
  status,
  id,
}) => {
  return client.query(
    "UPDATE products SET productID = COALESCE($1, productID), productName = COALESCE($2, productName), amount = COALESCE($3, amount), customerName = COALESCE($4, customerName), transactionDate = COALESCE($5, transactionDate), createBy = COALESCE($6, createBy), createOn = COALESCE($7, createOn), status = COALESCE($8, status) WHERE id = $9",
    [
      productID,
      productName,
      amount,
      customerName,
      transactionDate,
      createBy,
      createOn,
      status,
      id,
    ]
  );
};

const getProductDetail = (id) => {
  console.log("searching detail ...");
  return new Promise((resolve, reject) =>
    client.query(`SELECT * FROM products WHERE id = $1`, [id], (e, result) => {
      if (!e) {
        resolve(result);
      } else {
        reject(e);
      }
    })
  );
};
const countProduct = () => {
  return new Promise((resolve, reject) => {
    client.query("SELECT COUNT(*) AS total FROM products", (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(new Error(err));
      }
    });
  });
};
module.exports = {
  getProductDetail,
  selectProduct,
  addProduct,
  updateProduct,
  countProduct,
};
