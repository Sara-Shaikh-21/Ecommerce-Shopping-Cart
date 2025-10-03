import axios from "axios";

const API_URL = "http://localhost:5001/api";

export const fetchProducts = async () => {
    const res = await axios.get(`${API_URL}/products`);
    return res.data;
};

export const checkoutCart = async (cart) => {
    const res = await axios.post(`${API_URL}/checkout`, { cart });
    return res.data;
};
