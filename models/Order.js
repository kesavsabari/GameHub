const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  gameName: {
    type: String,
    required: true
  },
  gamePrice: {
    type: Number,
    required: true
  },
  platform: {
    type: String,
    required: true
  },
  orderDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", orderSchema);
