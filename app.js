const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const postRoutes = require('./routes/postRoutes')
const employeeRoutes = require('./routes/employeeRoutes')
dotenv.config({ path: "./config.env" });

const app = express();
app.use(express.json());

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);


app.use('/api/posts', postRoutes)
app.use('/api/employees', employeeRoutes)


mongoose
  .connect(DB)
  .then(() => {
    console.log("Db conection successful!");
  })
  .catch((err) => console.log(err));



app.listen(process.env.PORT, () => {});
