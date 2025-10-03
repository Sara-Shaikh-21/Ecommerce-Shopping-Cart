const request = require("supertest");
const express = require("express");
const cors = require("cors");

// Import your products array or server code
const app = express();
app.use(cors());
app.use(express.json());

const products = [
    { id: 1, name: "Laptop", price: 800, imageUrl: "https://via.placeholder.com/150" },
    { id: 2, name: "Headphones", price: 120, imageUrl: "https://via.placeholder.com/150" }
];

app.get("/api/products", (req, res) => res.json(products));

describe("GET /api/products", () => {
    it("should return a list of products", async () => {
        const res = await request(app).get("/api/products");
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0]).toHaveProperty("id");
        expect(res.body[0]).toHaveProperty("name");
        expect(res.body[0]).toHaveProperty("price");
        expect(res.body[0]).toHaveProperty("imageUrl");
    });
});
