const mongoose = require("mongoose");
const Game = require("./models/Game");

const mongoUrl = "mongodb://127.0.0.1:27017/gamehubstore";

const sampleGames = [
  { name: "EA FC 26", price: 60, platform: "Steam" },
  { name: "Cyberpunk 2077", price: 49.99, platform: "Steam" },
  { name: "Elden Ring", price: 59.99, platform: "Steam" },
  { name: "Forza Horizon 5", price: 39.99, platform: "PC" },
  { name: "God of War Ragnarok", price: 69.99, platform: "PS5" },
  { name: "Red Dead Redemption 2", price: 29.99, platform: "Steam" },
  { name: "Spider-Man 2", price: 69.99, platform: "PS5" }
];

async function seedGames() {
  try {
    await mongoose.connect(mongoUrl);
    console.log("MongoDB connected");

    for (let i = 0; i < sampleGames.length; i++) {
      const game = sampleGames[i];
      const foundGame = await Game.findOne({
        name: game.name,
        platform: game.platform
      });

      if (!foundGame) {
        await Game.create(game);
        console.log("Added:", game.name);
      } else {
        console.log("Already there:", game.name);
      }
    }

    console.log("Seed finished");
    await mongoose.disconnect();
  } catch (error) {
    console.log("Seed error:", error.message);
  }
}

seedGames();
