const express = require("express");
const morgan = require("morgan");
const userRoute = require("./routes/userRouter");
const createError = require("http-errors");
const questionRoute = require("./routes/questionRouter");
const questionCategoryRoute = require("./routes/questionCategoryRouter");
const trafficSignCategoryRoute = require('./routes/trafficSignCategoryRouter');
const questionBankRoute = require('./routes/questionBankRouter');
const trafficSignRoute = require('./routes/trafficSignRouter')
const compression = require("compression");
const cors = require("cors");

const app = express();

// 1) Global Middleware
// Implement CORS
app.use(cors()); // Access-Control-Allow-Origin *
app.options("*", cors());
// Logging
app.use(morgan("dev"));

app.use(express.json());
app.use(compression())

// 2) Router
app.use("/api/v1/users", userRoute);
app.use("/api/v1/questions", questionRoute);
app.use("/api/v1/questions-category", questionCategoryRoute);
app.use("/api/v1/traffic-sign", trafficSignRoute)
app.use("/api/v1/traffic-sign-category", trafficSignCategoryRoute)
app.use("/api/v1/questions-bank", questionBankRoute)

// 3) Global Error Handling
app.use((req, res, next) => {
  // đây là Middleware, vì Middleware chỉ có 3 tham số
  next(createError.NotFound("This route does not exists"));
});

app.use((error, req, res, next) => {
  // hàm xử lý error cần 4 tham số
  const statusCode = error.status || 500;
  res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message: error.message || "Internal Server Error",
  });
});

module.exports = app;
