const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const postRoutes = require("./routes/postRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require('express-mongo-sanitize')
// const xss = require('xss-clean')
const hpp = require('hpp')
dotenv.config({ path: "./config.env" });

const app = express();

// 1) GLOBAL MIDDLEWARES
//security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limit request from same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "To many requests from this IP, please try again in an hour!",
});

app.use("/api", limiter);

app.use(cors());

// Body pareser, reading data from body into req.body
app.use(express.json());

// Data sanitization againist NoSQL query injection
app.use(mongoSanitize())
// Data sanitizition againist XSS ----

// Prevent parameter polution
app.use(hpp())

// serving static files
app.use(express.static(`${__dirname}/public`));

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

app.use("/api/posts", postRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/user", userRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`cant find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

mongoose
  .connect(DB)
  .then(() => {
    console.log("Db conection successful!");
  })
  .catch((err) => console.log(err));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  req.requestTime = new Date().toISOString();
  next();
});

const server = app.listen(process.env.PORT, () => {});

process.on("unhandledException", (err) => {
  console.log(err.name, err.message);
  console.log("unhandled exeption shuting down...");
  server.close(() => {
    process.exit(1);
  });
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("unhandled rejection shuting down...");
  server.close(() => {
    process.exit(1);
  });
});
