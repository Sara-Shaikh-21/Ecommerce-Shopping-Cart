import React, { useState, useEffect } from "react";
import ProductGrid from "../components/ProductGrid";
import Navbar from "../components/Navbar";
import { fetchProducts } from "../services/api";

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <Navbar cart={cart} />
            <div style={{ padding: "30px", maxWidth: "1200px", margin: "0 auto" }}>
                <h1 style={{ textAlign: "center", marginBottom: "20px" }}>🛒 Products</h1>
                <ProductGrid products={products} cart={cart} setCart={setCart} />
            </div>
        </>
    );
};

export default HomePage;
