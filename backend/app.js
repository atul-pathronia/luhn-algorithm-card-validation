const express = require("express");
const cardRouter = require("./router/cardRouter");
const cors = require("cors");

const app = express();

// cors
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// express middleware
app.use(express.json());

// Route
app.use("/", cardRouter);

// express error handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  err.message = err.message || "Internal Server Error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
