require("dotenv").config();
const express = require("express");
const cors = require("cors");
const createError = require("http-errors");
const morgan = require("morgan");
const helmet = require("helmet");
const mainRouter = require("./src/router/product");

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use("/", mainRouter);

app.all("*", (req, res, next) => {
  next(new createError.NotFound());
});

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.use((err, req, res, next) => {
  const messError = err.message || "internal server error";
  const statusCode = err.status || 500;

  res.status(statusCode).json({
    message: messError,
  });
});

app.listen(port, () => {
  console.log(`app running at http://localhost:${port}`);
});
