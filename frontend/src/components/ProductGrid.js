import React from "react";

const ProductGrid = ({ products, cart, setCart }) => {
    const addToCart = (product) => {
        const existing = cart.find((item) => item.id === product.id);
        if (existing) {
            setCart(
                cart.map((item) =>
                    item.id === product.id ? { ...item, qty: item.qty + 1 } : item
                )
            );
        } else {
            setCart([...cart, { ...product, qty: 1 }]);
        }
    };

    if (!Array.isArray(products)) return <p>Loading products...</p>;

    return (
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
            {products.map((p) => {
                const existing = cart.find((item) => item.id === p.id);
                const qty = existing ? existing.qty : 0;

                return (
                    <div key={p.id} style={{
                        border: "1px solid #eee",
                        padding: "15px",
                        width: "200px",
                        borderRadius: "10px",
                        textAlign: "center",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                        transition: "transform 0.2s",
                    }}
                        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
                        <img src={p.imageUrl} alt={p.name} style={{ width: "150px", height: "150px", marginBottom: "10px", objectFit: "cover", borderRadius: "8px" }} />
                        <h3 style={{ margin: "10px 0", fontSize: "18px" }}>{p.name}</h3>
                        <p style={{ fontWeight: "bold", margin: "5px 0" }}>${p.price}</p>
                        <button
                            onClick={() => addToCart(p)}
                            style={{
                                padding: "8px 15px",
                                cursor: "pointer",
                                background: "#1976d2",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                fontWeight: "bold"
                            }}
                        >
                            Add {qty > 0 && `(${qty})`}
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

export default ProductGrid;
