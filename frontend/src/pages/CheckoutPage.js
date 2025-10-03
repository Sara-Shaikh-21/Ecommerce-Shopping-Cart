import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkoutCart } from "../services/api";
import Navbar from "../components/Navbar";

const CheckoutPage = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : [];
    });

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const handleCheckout = async () => {
        if (cart.length === 0) return alert("Cart is empty!");
        try {
            await checkoutCart(cart);
            alert("Your Transaction is Successful!");
            setCart([]);
            localStorage.removeItem("cart");
            navigate("/");
        } catch (err) {
            console.error(err);
            alert("Checkout failed. Try again.");
        }
    };

    return (
        <>
            <Navbar cart={cart} />
            <div style={{ padding: "30px", maxWidth: "500px", margin: "0 auto" }}>
                <h1 style={{ textAlign: "center", marginBottom: "20px" }}>🧾 Checkout</h1>

                {cart.length === 0 ? (
                    <p style={{ textAlign: "center", fontStyle: "italic" }}>Your cart is empty</p>
                ) : (
                    <div style={{ background: "#f9f9f9", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
                        {cart.map(item => (
                            <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
                                <span>{item.name}</span>
                                <span>${item.price * item.qty}</span>
                            </div>
                        ))}
                        <h3 style={{ textAlign: "right", marginTop: "10px" }}>Total: ${totalPrice}</h3>
                        <button
                            onClick={handleCheckout}
                            style={{ width: "100%", padding: "10px", cursor: "pointer", background: "#1976d2", color: "white", border: "none", borderRadius: "5px", fontWeight: "bold", marginTop: "10px" }}
                        >
                            Confirm & Pay
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default CheckoutPage;
