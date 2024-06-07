import { useState, useEffect } from "react";
import { getTransactions, addTransaction, updateTransaction, deleteTransaction } from "../services/api";
import AddTransaction from "./AddTransaction";

const Dashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [editFormData, setEditFormData] = useState({ type: '', amount: '', category: '' });

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const { data } = await getTransactions();
                setTransactions(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchTransactions();
    }, []);

    const handleAddTransaction = async (transaction) => {
        try {
            const { data } = await addTransaction(transaction);
            setTransactions([...transactions, data]);
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditClick = (transaction) => {
        setEditingTransaction(transaction._id);
        setEditFormData({ type: transaction.type, amount: transaction.amount, category: transaction.category });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSaveEdit = async (id) => {
        try {
            const { data } = await updateTransaction(id, editFormData);
            setTransactions(transactions.map((transaction) => (transaction._id === id ? data : transaction)));
            setEditingTransaction(null);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteTransaction = async (id) => {
        try {
            await deleteTransaction(id);
            setTransactions(transactions.filter((transaction) => transaction._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Dashboard</h2>
            <AddTransaction onAddTransaction={handleAddTransaction}></AddTransaction>
            <ul>
                {transactions.map((transaction) => (
                    <li key={transaction._id}>
                        {editingTransaction === transaction._id ? (
                            <>
                                <input
                                    type="text"
                                    name="type"
                                    value={editFormData.type}
                                    onChange={handleEditChange}
                                />
                                <input
                                    type="number"
                                    name="amount"
                                    value={editFormData.amount}
                                    onChange={handleEditChange}
                                />
                                <input
                                    type="text"
                                    name="category"
                                    value={editFormData.category}
                                    onChange={handleEditChange}
                                />
                                <button onClick={() => handleSaveEdit(transaction._id)}>Save</button>
                                <button onClick={() => setEditingTransaction(null)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                {transaction.type} - {transaction.amount} - {transaction.category}
                                <button onClick={() => handleEditClick(transaction)}>Edit</button>
                                <button onClick={() => handleDeleteTransaction(transaction._id)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Dashboard;
