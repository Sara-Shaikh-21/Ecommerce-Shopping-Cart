import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaHome } from "react-icons/fa"; // Home and Cart icons

const Navbar = ({ cart }) => {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

    return (
        <nav style={{
            padding: "15px 30px",
            background: "#1976d2",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
        }}>
            <Link
                to="/"
                style={{
                    color: "white",
                    textDecoration: "none",
                    fontWeight: "bold",
                    fontSize: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                }}
            >
                <FaHome color="white" /> E-commerce Shopping Cart
            </Link>

            <Link
                to="/cart"
                style={{
                    color: "white",
                    textDecoration: "none",
                    fontSize: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px"
                }}
            >
                <FaShoppingCart color="white" /> Cart ({totalItems})
            </Link>
        </nav>
    );
};

export default Navbar;
