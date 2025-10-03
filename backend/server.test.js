const request = require("supertest");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const products = [
    { id: 1, name: "Laptop", price: 800, imageUrl: "https://via.placeholder.com/150" },
    { id: 2, name: "Headphones", price: 120, imageUrl: "https://via.placeholder.com/150" }
];

// Routes
app.get("/api/products", (req, res) => res.json(products));

app.post("/api/checkout", (req, res) => {
    const { cart } = req.body;
    if (!cart || cart.length === 0) {
        return res.status(400).json({ success: false, message: "Cart is empty" });
    }
    return res.status(200).json({ success: true, message: "Checkout successful!" });
});

// ------------------ TESTS ------------------

describe("API Endpoints", () => {
    it("GET /api/products → should return a list of products", async () => {
        const res = await request(app).get("/api/products");
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0]).toHaveProperty("id");
        expect(res.body[0]).toHaveProperty("name");
        expect(res.body[0]).toHaveProperty("price");
        expect(res.body[0]).toHaveProperty("imageUrl");
    });

    it("POST /api/checkout → should return success for valid cart", async () => {
        const cart = [{ id: 1, name: "Laptop", price: 800, quantity: 1 }];
        const res = await request(app).post("/api/checkout").send({ cart });

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe("Checkout successful!");
    });

    it("POST /api/checkout → should return error for empty cart", async () => {
        const res = await request(app).post("/api/checkout").send({ cart: [] });

        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe("Cart is empty");
    });
});
