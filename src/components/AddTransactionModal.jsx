import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";

const emptyForm = {
  date: "",
  amount: "",
  category: "",
  type: "expense",
};

const AddTransactionModal = ({ onClose, editData }) => {
  const { transactions, setTransactions } = useApp();

  const [form, setForm] = useState(() =>
    editData
      ? {
          ...editData,
          amount: String(editData.amount),
        }
      : emptyForm
  );

  useEffect(() => {
    if (editData) {
      setForm({
        ...editData,
        amount: String(editData.amount),
      });
    } else {
      setForm(emptyForm);
    }
  }, [editData?.id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const amountNum = Number(form.amount);

    if (editData) {
      setTransactions(
        transactions.map((t) =>
          t.id === editData.id
            ? {
                ...form,
                id: t.id,
                amount: amountNum,
              }
            : t
        )
      );
    } else {
      const newTransaction = {
        id: Date.now(),
        ...form,
        amount: amountNum,
      };
      setTransactions([...transactions, newTransaction]);
    }

    onClose();
  };

  const isEdit = Boolean(editData);

  const inputClass =
    "w-full border dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none";

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center animate-fadeIn z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl w-80 space-y-3 shadow-xl"
      >
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">
          {isEdit ? "Edit Transaction" : "Add Transaction"}
        </h2>

        <input
          type="date"
          required
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className={`${inputClass} cursor-pointer`}
        />

        <input
          type="number"
          placeholder="Amount"
          required
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          className={inputClass}
        />

        <input
          type="text"
          placeholder="Category"
          required
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className={inputClass}
        />

        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className={`${inputClass} cursor-pointer`}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <div className="flex justify-end gap-2 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="text-sm cursor-pointer text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition"
          >
            Cancel
          </button>
          <button className="bg-blue-600 text-white px-3 py-1 rounded cursor-pointer hover:bg-blue-700 transition">
            {isEdit ? "Save" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTransactionModal;
