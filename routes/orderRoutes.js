const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// get orders listtt
router.get("/", async function (req, res) {
  try {
    // newest first i think
    const gamesList = await Order.find().sort({ orderDate: -1 });
    res.json(gamesList);
  } catch (error) {
    res.status(500).json({ message: "Could not get orders" });
  }
});

// Save order
router.post("/", async function (req, res) {
  try {
    const bodyInfo = req.body;

    const orderData = new Order({
      gameName: bodyInfo.gameName,
      gamePrice: bodyInfo.gamePrice,
      platform: bodyInfo.platform
    });

    // save order stuff in db
    const savedOrder = await orderData.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: "Could not save order" });
  }
});

module.exports = router;
