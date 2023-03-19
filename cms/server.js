// use ng serve in one terminal and node server.js in the other
// Get dependencies
var express = require("express");
var path = require("path");
var http = require("http");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// import the routing file to handle the default (index) route
var index = require("./server/routes/app");

// ... ADD CODE TO IMPORT YOUR ROUTING FILES HERE ...
const msgRoutes = require("./server/routes/msgs");
const contactRoutes = require("./server/routes/contacts");
const docRoutes = require("./server/routes/docs");

var app = express(); // create an instance of express
app.set("view engine", "mongoose");

const cors = require("cors");
app.use(cors());

const env = require("dotenv");
env.config();

// establish a connection to the mongo database
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO, { useNewUrlParser: true }, (err, res) => {
  if (err) {
    console.log(`❌⛔🚫Connection failed: ${err}❌⛔🚫`);
  } else {
    console.log("😀 Connected to database! 😀");
  }
});

// Tell express to use the following parsers for POST data
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());

app.use(logger("dev")); // Tell express to use the Morgan logger

// Add support for CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

// Tell express to use the specified director as the
// root directory for your web site
app.use(express.static(path.join(__dirname, "dist/cms")));

// Tell express to map the default route ('/') to the index route
app.use("/", index);

// ... ADD YOUR CODE TO MAP YOUR URL'S TO ROUTING FILES HERE ...
app.use(function (req, res, next) {
  res.render("index");
});

app.use("/messages", msgRoutes);
app.use("/contacts", contactRoutes);
app.use("/documents", docRoutes);

// Tell express to map all other non-defined routes back to the index page
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/cms/index.html"));
});

// Define the port address and tell express to use this port
const port = process.env.PORT || "3000" || "4200";
app.set("port", port);

// Create HTTP server.
const server = http.createServer(app);

// Tell the server to start listening on the provided port
server.listen(port, function () {
  console.log(`🎵 API listening on localhost: ${port} 🎵`);
});
