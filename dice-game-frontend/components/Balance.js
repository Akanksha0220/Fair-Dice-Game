const Balance = ({ balance }) => {
  return (
    <div className="balance">
      💰 Balance: ₹{balance.toFixed(2)}
    </div>
  );
};

export default Balance;
