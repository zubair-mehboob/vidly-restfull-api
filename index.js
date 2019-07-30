const express = require("express");
const genres = require("./routes/genres");
const home = require("./routes/home");
const customer = require("./routes/customer");
const movies = require("./routes/movies");
//console.log(genres);

const morgan = require("morgan");

const app = express();
app.use("/", home);
app.use(express.json());
app.use(morgan("tiny"));
app.use("/api/genres", genres);
app.use("/api/customers", customer);
app.use("/api/movies", movies);
//console.log(`Application Name ${config.get("name")}`);
//console.log(`Server Name ${config.get("mail.host")}`);
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to database.."))
  .catch(err => console.error(err.message));

//const port = process.env.PORT || 5000;

app.listen(5000);
