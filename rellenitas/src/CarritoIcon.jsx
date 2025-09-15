import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./CarritoIcon.css";

function CarritoIcon({ cart }) {
  return (
    <div className="carrito-icon">
      <Link to="/carrito">
        <FaShoppingCart size={28} />
        {cart.length > 0 && (
          <span className="carrito-count">{cart.length}</span>
        )}
      </Link>
    </div>
  );
}

export default CarritoIcon;
