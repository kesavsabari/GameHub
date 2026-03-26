const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const gameRoutes = require("./routes/gameRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
const PORT = 3000;

// local DB url for mongo
const mongoUrl = "mongodb://127.0.0.1:27017/gamehubstore";

// basic middlewares i need
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// connect to db
mongoose
  .connect(mongoUrl)
  .then(function () {
    console.log("MongoDB connected");
  })
  .catch(function (err) {
    console.log("MongoDB error:", err.message);
  });

app.use("/games", gameRoutes);
app.use("/orders", orderRoutes);

// homepage Route
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// start server here
app.listen(PORT, function () {
  console.log("Server is running on port " + PORT);
});
