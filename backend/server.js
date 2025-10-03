const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

// Load products from JSON file
const productsFile = path.join(__dirname, "data.json");
let products = [];

// Read file on startup
try {
    const data = fs.readFileSync(productsFile, "utf-8");
    products = JSON.parse(data);
    console.log(`✅ Loaded ${products.length} products from products.json`);
} catch (err) {
    console.error("❌ Failed to load products.json", err);
    products = [];
}

// Root route
app.get("/", (req, res) => {
    res.send("Server is working!");
});

// GET /products -> return list of products
app.get("/api/products", (req, res) => {
    res.json(products);
});

// POST /checkout -> receive cart
app.post("/api/checkout", (req, res) => {
    const { cart } = req.body;
    console.log("🛒 Order received:", cart);

    res.json({ success: true, message: "Checkout successful!" });
});

app.listen(PORT, () => console.log(`🚀 Backend running at http://localhost:${PORT}`));
