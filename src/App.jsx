import { useState, useEffect } from "react";
import { getFaqsByCategory, updateFaq, addFaq, deleteFaq } from "./faqService";
import './index.css'

const categories = [
    { name: "Invoice Financing", value: "Invoice Financing FAQ's" },
    { name: "Business Funding", value: "Business Funding FAQ's" },
    { name: "Invest with VePay", value: "Invest with VePay FAQ's" },
];

function App() {
    const [selectedCategory, setSelectedCategory] = useState(categories[0].value);
    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
        fetchFaqs();
    }, [selectedCategory]);

    const fetchFaqs = async () => {
        const data = await getFaqsByCategory(selectedCategory);
        setFaqs(data);
    };

    const handleEdit = async (id, field, value) => {
        const updatedFaqs = faqs.map((faq) =>
            faq._id === id ? { ...faq, [field]: value } : faq
        );
        setFaqs(updatedFaqs);
        await updateFaq(id, { [field]: value });
    };

    const handleAdd = async () => {
        const newFaq = { question: "New Question", answer: "New Answer", category: selectedCategory };
        const addedFaq = await addFaq(newFaq);
        setFaqs([...faqs, addedFaq]);
    };

    const handleDelete = async (id) => {
        await deleteFaq(id);
        setFaqs(faqs.filter((faq) => faq._id !== id));
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            {/* Navbar */}
            <nav className="bg-white p-4 fixed top-0 left-0 w-full flex justify-between items-center z-10">
                <h1 className="text-xl font-bold text-gray-800">FAQs</h1>
                <div className="space-x-4">
                    {categories.map((cat) => (
                        <button
                            key={cat.value}
                            onClick={() => setSelectedCategory(cat.value)}
                            className={`px-4 py-2 rounded ${
                                selectedCategory === cat.value
                                    ? "bg-blue-950 text-white"
                                    : "bg-gray-200 hover:bg-gray-300"
                            }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </nav>

            {/* Main Content */}
            <div className="flex-grow flex justify-center px-4 mt-20 w-full">
                <div className="w-full max-w-[1440px] p-6 bg-white rounded-lg">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">{selectedCategory}</h2>
                    <div className="flex justify-end mb-4">
                        <button
                            onClick={handleAdd}
                            className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-950"
                        >
                            Add FAQ
                        </button>
                    </div>

                    {/* FAQ Table */}
                    <div className="overflow-x-auto w-full">
                        <table className="w-full border-collapse border border-blue-400">
                            <thead>
                            <tr className="bg-blue-100">
                                <th className="border p-3 text-left">Question</th>
                                <th className="border p-3 text-left">Answer</th>
                                <th className="border p-3 text-left">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {faqs.length > 0 ? (
                                faqs.map((faq) => (
                                    <tr key={faq._id} className="border">
                                        <td className="border p-3">
                                            <input
                                                type="text"
                                                className="w-full p-2 border rounded"
                                                value={faq.question}
                                                onChange={(e) => handleEdit(faq._id, "question", e.target.value)}
                                            />
                                        </td>
                                        <td className="border p-3">
                                            <input
                                                type="text"
                                                className="w-full p-2 border rounded"
                                                value={faq.answer}
                                                onChange={(e) => handleEdit(faq._id, "answer", e.target.value)}
                                            />
                                        </td>
                                        <td className="border p-3">
                                            <button
                                                onClick={() => handleDelete(faq._id)}
                                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="border p-3 text-center" colSpan="3">
                                        No FAQs available.
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
