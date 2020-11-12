const express = require("express");
require("dotenv").config();
const app = express();

app.get("/", (req, res) => {
  res.send("hello from kamlesh js");
});

const port = process.env.port || 8000;

app.listen(port, (req, res) => {
  console.log(`server started on ${port}`);
});
