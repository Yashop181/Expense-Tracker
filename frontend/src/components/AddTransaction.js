import { useState } from "react";

const AddTransaction = ({ onAddTransaction }) => {
    const [formData, setFormData] = useState({ type: '', amount: '', category: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddTransaction(formData);
        setFormData({ type: '', amount: '', category: '' });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="type"
                    placeholder="Type"
                    value={formData.type}
                    onChange={handleChange}
                    autoComplete="type"
                />
                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={formData.amount}
                    onChange={handleChange}
                    autoComplete="amount"
                />
                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleChange}
                    autoComplete="category"
                />
                <button type="submit">Add Transaction</button>
            </form>
        </div>
    );
};

export default AddTransaction;
