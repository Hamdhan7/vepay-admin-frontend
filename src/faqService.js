const API_URL = "vepay-admin-backend-production.up.railway.app:8080/api/faqs"; // Adjust if deployed

export const getFaqsByCategory = async (category) => {
    const response = await fetch(`${API_URL}/${encodeURIComponent(category)}`);
    return response.json();
};

export const addFaq = async (faq) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(faq),
    });
    return response.json();
};

export const updateFaq = async (id, updatedFaq) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFaq),
    });
    return response.json();
};

export const deleteFaq = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};
