const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const postRoutes = require("./routes/postRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const userRoutes = require('./routes/userRoutes')
const cors = require('cors')
const morgan = require('morgan');
dotenv.config({ path: "./config.env" });



const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors())
app.use(express.json());
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
  console.log("unhandled rejection shuting down...");
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
