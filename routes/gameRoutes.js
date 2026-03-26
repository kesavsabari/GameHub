const express = require("express");
const router = express.Router();
const Game = require("../models/Game");

// get stuff from DB
router.get("/", async function (req, res) {
  try {
    const gameList = await Game.find();
    res.json(gameList);
  } catch (error) {
    res.status(500).json({ message: "Could not get games" });
  }
});

// add new game here
router.post("/", async function (req, res) {
  try {
    const bodyData = req.body;
    const gameName = bodyData.name;
    const gamePrice = bodyData.price;
    const gamePlatform = bodyData.platform;

    if (gameName == "" || gamePrice == "" || gamePlatform == "") {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const newGame = new Game({
      name: gameName,
      price: gamePrice,
      platform: gamePlatform
    });

    // save game in DB maybe
    const savedGame = await newGame.save();
    res.status(201).json(savedGame);
  } catch (error) {
    res.status(400).json({ message: "Could not add game" });
  }
});

module.exports = router;
