const DiceRoll = ({ result }) => {
  return (
    <div className="dice-roll">
      <p>You rolled: <strong>{result.roll}</strong></p>
      <p>{result.win ? "🎉 You won!" : "😞 You lost!"}</p>
    </div>
  );
};

export default DiceRoll;
