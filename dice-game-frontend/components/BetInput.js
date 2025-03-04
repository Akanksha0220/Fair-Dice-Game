const BetInput = ({ betAmount, setBetAmount }) => {
  return (
    <div className="bet-input">
      <label>Bet Amount:</label>
      <input
        type="number"
        value={betAmount}
        onChange={(e) => setBetAmount(parseFloat(e.target.value))}
      />
    </div>
  );
};

export default BetInput;
