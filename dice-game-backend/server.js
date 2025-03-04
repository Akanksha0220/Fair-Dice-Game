const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const crypto = require("crypto");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let userBalance = 1000;

// Default route to check if the server is running
app.get("/", (req, res) => {
    res.send("🎲 Dice Game API is running! Use POST /roll-dice to play.");
});

// Dice roll endpoint
app.post("/roll-dice", (req, res) => {
    const { bet } = req.body;
    if (bet > userBalance) return res.status(400).json({ error: "Insufficient balance" });

    const roll = Math.floor(Math.random() * 6) + 1;
    const win = roll >= 4;
    userBalance = win ? userBalance + bet : userBalance - bet;

    const hash = crypto.createHash("sha256").update(roll.toString()).digest("hex");

    res.json({ roll, win, newBalance: userBalance, hash });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
