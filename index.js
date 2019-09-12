require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;

const app = express();

// Setup databse connection
mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MLAB_URI, {
    useNewUrlParser: true
  })
  .then(
    () => {
      console.log("Databse is now connected");
    },
    err => {
      console.log("Cannot connect to databse " + err);
    }
  );

// CORS & body parse middleware
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

//Error handling middleware
app.get("*", (req, res) => {
  res.status(404);
  res.send("Sorry the page you're looking for does not exist!");
});

app.listen(PORT, () => {
  console.log("App now listening on port: ", PORT);
});
