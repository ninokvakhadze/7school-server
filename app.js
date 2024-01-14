const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const postRoutes = require("./routes/postRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
dotenv.config({ path: "./config.env" });

const app = express();
app.use(express.json());

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

app.use("/api/posts", postRoutes);
app.use("/api/employees", employeeRoutes);

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

const server = app.listen(process.env.PORT, () => {});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log('unhandled rejection shuting dow...')
  server.close(()=>{
    process.exit(1)
  })
});
