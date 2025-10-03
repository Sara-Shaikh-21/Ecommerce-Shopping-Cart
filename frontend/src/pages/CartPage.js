import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const CartPage = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    const updateQty = (id, qty) => {
        if (qty < 1) return;
        setCart(cart.map(item => item.id === id ? { ...item, qty } : item));
    };

    const removeItem = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    return (
        <>
            <Navbar cart={cart} />
            <div style={{ padding: "30px", maxWidth: "600px", margin: "0 auto" }}>
                <h1 style={{ textAlign: "center", marginBottom: "20px" }}>🛒 Your Cart</h1>
                <Link to="/" style={{ display: "inline-block", marginBottom: "20px", textDecoration: "none", color: "#1976d2", fontWeight: "bold" }}>
                    ← Back to Home
                </Link>

                {cart.length === 0 ? (
                    <p style={{ textAlign: "center", fontStyle: "italic" }}>Cart is empty</p>
                ) : (
                    <div style={{ background: "#f9f9f9", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
                        {cart.map((item) => (
                            <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                                <span>{item.name}</span>
                                <div>
                                    <button onClick={() => updateQty(item.id, item.qty - 1)} style={{ marginRight: "5px" }}>−</button>
                                    <strong>{item.qty}</strong>
                                    <button onClick={() => updateQty(item.id, item.qty + 1)} style={{ marginLeft: "5px" }}>+</button>
                                </div>
                                <span>${item.price * item.qty}</span>
                                <button onClick={() => removeItem(item.id)} style={{ marginLeft: "10px", color: "red", fontWeight: "bold", border: "none", background: "transparent", cursor: "pointer" }}>
                                    Remove
                                </button>
                            </div>
                        ))}
                        <h3 style={{ textAlign: "right", marginTop: "10px" }}>Total: ${totalPrice}</h3>
                        <button
                            onClick={() => navigate("/checkout")}
                            style={{ width: "100%", padding: "10px", cursor: "pointer", background: "#1976d2", color: "white", border: "none", borderRadius: "5px", fontWeight: "bold", marginTop: "10px" }}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartPage;
