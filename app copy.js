const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const userRoutes = require("./routes/user");

const app = express();

//middleware
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

//routes middleware
// app.use("/api", userRoutes);

app.get("/test", (res, req) => {
  console.log("body: ");
});
//db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB CONNECTED"));

//

const port = process.env.port || 8000;

app.listen(port, (req, res) => {
  console.log(`server started on ${port}`);
});
