import axios from "axios";

const API_URL = "https://vepay-admin-backend-production.up.railway.app/api/faqs";

export const getFaqs = async () => {
    const res = await axios.get(API_URL);
    return res.data;
};

export const addFaq = async (faq) => {
    const res = await axios.post(API_URL, faq);
    return res.data;
};

export const updateFaq = async (id, faq) => {
    const res = await axios.put(`${API_URL}/${id}`, faq);
    return res.data;
};

export const deleteFaq = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};
