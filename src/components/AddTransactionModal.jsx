import { useState } from "react";
import { useApp } from "../context/AppContext";

const AddTransactionModal = ({ onClose }) => {
  const { transactions, setTransactions } = useApp();

  const [form, setForm] = useState({
    date: "",
    amount: "",
    category: "",
    type: "expense",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      id: Date.now(),
      ...form,
      amount: Number(form.amount),
    };

    setTransactions([...transactions, newTransaction]);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center animate-fadeIn">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl w-80 space-y-3"
      >
        <h2 className="font-semibold">Add Transaction</h2>

        <input
          type="date"
          required
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
          className="w-full border p-2 rounded cursor-pointer"
        />

        <input
          type="number"
          placeholder="Amount"
          required
          onChange={(e) =>
            setForm({ ...form, amount: e.target.value })
          }
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Category"
          required
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
          className="w-full border p-2 rounded"
        />

        <select
          onChange={(e) =>
            setForm({ ...form, type: e.target.value })
          }
          className="w-full border p-2 rounded cursor-pointer"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="text-sm cursor-pointer"
          >
            Cancel
          </button>
          <button className="bg-blue-600 text-white px-3 py-1 rounded cursor-pointer hover:bg-blue-700 transition">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTransactionModal;