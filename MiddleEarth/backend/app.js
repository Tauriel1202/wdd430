const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Char = require("./models/char");
const app = express();

const dotenv = require("dotenv");
const { ObjectId } = require("mongodb");
const Enemy = require("./models/enemy");
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
  console.log("B: ", req.body);
  const char = new Char({
    id: req.body.id,
    charId: req.body.charId,
    imgUrl: req.body.imgUrl,
    land: req.body.land,
    name: req.body.name,
    role: req.body.role,
    species: req.body.species,
  });
  console.log(char);
  char.save().then((result) => {
    console.log("R: ", result);
    res.status(201).json({ message: "Char added! 💩", cId: result._id });
  });
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

app.put("/chars/:charId", (req, res, next) => {
  // console.log("PUT ID: ", req.params.charId);
  // // Char.findOne({charId: req.params.charId}).then((char)=>{
  const char = new Char({
    _id: req.body.id,
    charId: req.body.charId,
    imgUrl: req.body.imgUrl,
    land: req.body.land,
    name: req.body.name,
    role: req.body.role,
    species: req.body.species,
  });
  Char.deleteOne({ charId: req.params.charId }).then(() => {
    Char.updateOne({ charId: req.params.charId, char }).then((result) => {
      //   console.log("Update in progress: ", result);
      //   // char.();
      //   // })
      char.save(result);
      res.status(200).json({ message: "Char Updated!" });
    });
  });
});

app.delete("/chars/:charId", (req, res, next) => {
  // Char.deleteOne({id: req.params.id}).then(() => {
  //   console.log("💩", req.params.id)
  //   // console.log(`Char ${req.params.id} was deleted!`)
  //   res.status(200).json({message: 'Char deleted!'})
  // })
  console.log("A:  ", req.params.charId, "END");
  Char.findOne({ charId: req.params.charId }).then((char) => {
    Char.deleteOne({ charId: req.params.charId }).then(() => {
      console.log("💩💩💩💩💩💩💩" + req.params.charId);
      res.status(204).json({
        message: "Char deleted! 💩💩💩",
      });
    });
  });
});

//Enemy paths
app.get("/enemies", (req, res, next) => {
  Enemy.find().then((data) => {
    console.log(data);
    res.status(200).json({
      message: "Enemies fetched!",
      enemies: data,
    });
  });
});

app.post("/enemies", (req, res, next) => {
  console.log("Enemy App.post Body:", req.body);
  const enemy = new Enemy({
    id: req.body.id,
    enemyId: req.body.enemyId,
    imgUrl: req.body.imgUrl,
    land: req.body.land,
    name: req.body.name,
    role: req.body.role,
    species: req.body.species,
  });
  console.log(enemy);

  enemy.save().then((result) => {
    console.log("R: ", result);
    res.status(201).json({ message: "Enemy found! 💩", eId: result._id });
  });
});

app.put("/enemies/:enemyId", (req, res, next) => {
  const enemy = new Enemy({
    _id: req.body.id,
    enemyId: req.body.enemyId,
    imgUrl: req.body.imgUrl,
    land: req.body.land,
    name: req.body.name,
    role: req.body.role,
    species: req.body.species,
  });
  Enemy.deleteOne({ enemyId: req.params.enemyId }).then(() => {
    Enemy.updateOne({ enemyId: req.body.enemyId }).then((result) => {
      enemy.save(result);
      res.status(200).json({ message: "Enemy updated!" });
    });
  });
});

app.delete("/enemies/:enemyId", (req, res, next) => {
  console.log("App delete:", req.params.enemyId);
  Enemy.findOne({ enemyId: req.params.enemyId }).then(() => {
    Enemy.deleteOne({ enemyId: req.params.enemyId }).then(() => {
      res.status(204).json({ message: "Enemy defeated!" });
    });
  });
});

module.exports = app;
