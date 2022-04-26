import "font-awesome/css/font-awesome.min.css";

export const Nav = (props) => {
  const count = props.items.reduce((prev, curr) => prev + curr.amount, 0);
  return (
    <div className="nav">
      <h3>{props.title}</h3>

      <span className="cart">
        <span className="count"> {count} </span>
        <i className="fa fa-shopping-cart" style={{ fontSize: "35px" }}></i>
      </span>
    </div>
  );
};
