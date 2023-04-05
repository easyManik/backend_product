-- Active: 1675061093747@@pijardb-do-user-13063919-0.b.db.ondigitalocean.com@25060@blanya-easy
CREATE TABLE products(
    id INT PRIMARY KEY,
    productid VARCHAR(25),
    productname VARCHAR(30),
    amount VARCHAR(25),
    customername VARCHAR(30),
    status INT,
    transactiondate VARCHAR(30),
    createby VARCHAR(30),
    createon VARCHAR(30)
);

INSERT INTO product (id, productID, productName, amount, customerName, transactionDate, createBy, createOn, status) values (
    '122', '2', '3', '4', '5', '6', '7', '8', '9'
)