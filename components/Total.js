import "font-awesome/css/font-awesome.min.css";

export const Total = (props) => {
  const money = Math.floor(
    props.items.reduce((prev, curr) => prev + curr.amount * curr.price, 0)
  );
  return (
    <div className="total">
      {money > 0 ? <p>Total: {money} $</p> : <p>Your cart is empty!</p>}
    </div>
  );
};
