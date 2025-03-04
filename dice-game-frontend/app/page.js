"use client";

import { useState } from "react";
import axios from "axios";
import BetInput from "../components/BetInput";
import DiceRoll from "../components/DiceRoll";
import Balance from "../components/Balance";
import "../styles/styles.css";

export default function Page() {
  const [balance, setBalance] = useState(1000);
  const [betAmount, setBetAmount] = useState(0);
  const [rollOver, setRollOver] = useState(50.5);
  const [multiplier, setMultiplier] = useState(2.0);
  const [winChance, setWinChance] = useState(49.5);
  const [result, setResult] = useState(null);
  const [rolling, setRolling] = useState(false);
  const [mode, setMode] = useState("manual"); // Manual or Auto mode

  const handleRoll = async () => {
    if (betAmount <= 0 || betAmount > balance) {
      alert("Invalid bet amount!");
      return;
    }

    setRolling(true);
    try {
      const res = await axios.post("http://localhost:3000/roll-dice", { bet: betAmount });
      const { roll, win, newBalance } = res.data;

      setResult({ roll, win });
      setBalance(newBalance);
    } catch (error) {
      console.error("Error rolling dice", error);
    }
    setRolling(false);
  };

  return (
    <div className="game-container">
      {/* Mode Switch: Manual / Auto */}
      <div className="mode-switch">
        <button className={mode === "manual" ? "active" : ""} onClick={() => setMode("manual")}>
          Manual
        </button>
        <button className={mode === "auto" ? "active" : ""} onClick={() => setMode("auto")}>
          Auto
        </button>
      </div>

      <div className="bet-section">
        <label>Bet Amount</label>
        <div className="bet-input">
          <input type="number" value={betAmount} onChange={(e) => setBetAmount(Number(e.target.value))} />
          <span className="currency">₹</span>
          <button onClick={() => setBetAmount(betAmount / 2)}>½</button>
          <button onClick={() => setBetAmount(betAmount * 2)}>2×</button>
        </div>
      </div>

      <div className="bet-section">
        <label>Profit on Win</label>
        <div className="bet-input">
          <input type="number" value={(betAmount * multiplier - betAmount).toFixed(2)} readOnly />
          <span className="currency">₹</span>
        </div>
      </div>

      <button className="bet-btn" onClick={handleRoll} disabled={rolling}>
        {rolling ? "Rolling..." : "Bet"}
      </button>

      {/* Dice Roll Result */}
      {result && <DiceRoll result={result} />}

      {/* Slider UI */}
      <div className="slider-container">
        <input
          type="range"
          min="0"
          max="100"
          value={rollOver}
          onChange={(e) => setRollOver(Number(e.target.value))}
        />
        <div className="roll-box">{rollOver.toFixed(2)}</div>
      </div>

      {/* Betting Controls */}
      <div className="controls">
        <div>
          <label>Multiplier</label>
          <input type="number" value={multiplier} onChange={(e) => setMultiplier(Number(e.target.value))} />
        </div>
        <div>
          <label>Roll Over</label>
          <input type="number" value={rollOver} onChange={(e) => setRollOver(Number(e.target.value))} />
        </div>
        <div>
          <label>Win Chance</label>
          <input type="number" value={winChance} onChange={(e) => setWinChance(Number(e.target.value))} />
        </div>
      </div>
    </div>
  );
}
