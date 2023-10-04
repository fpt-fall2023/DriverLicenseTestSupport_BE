const express = require("express");
const morgan = require("morgan");
const userRoute = require("./routes/userRouter");
const createError = require("http-errors");

const app = express();

// 1) Middleware
app.use(morgan("dev"));
app.use(express.json());

// 2) Router
app.use("/users", userRoute);

// 3) Global Error Handling
app.use((req, res, next) => {
  next(createError.NotFound("This route does not exists"));
});

app.use((error, req, res, next) => {
  res.json({
    error: {
      status: error.status || 500,
      message: error.message,
    },
  });
});

module.exports = app;
