const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Char = require("./models/char");
const app = express();

const dotenv = require("dotenv");
const { ObjectId } = require("mongodb");
dotenv.config();

mongoose.connect(process.env.MONGO_URI);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

app.post("/chars", (req, res, next) => {
  const char = new Char({
    id: req.body.id,
    imgUrl: req.body.imgUrl,
    land: req.body.land,
    name: req.body.name,
    role: req.body.role,
    species: req.body.species,
  });
  console.log(char);
  char.save();
  res.status(201).json({ message: "Char added! 💩" });
});

app.get("/chars", (req, res, next) => {
  Char.find().then((data) => {
    console.log(data);
    res.status(200).json({
      message: "Chars fetched!",
      chars: data,
    });
  });
});

app.delete("/chars/:id", (req, res, next) => {
  // Char.deleteOne({id: req.params.id}).then(() => {
  //   console.log("💩", req.params.id)
  //   // console.log(`Char ${req.params.id} was deleted!`)
  //   res.status(200).json({message: 'Char deleted!'})
  // })

  Char.findOne({ id: req.params.id }).then((char) => {
    Char.deleteOne({ id: req.params.id }).then((res) => {
      res.status(204).json({
        message: "Char deleted! 💩💩💩",
      });
    });
  });
});

module.exports = app;
