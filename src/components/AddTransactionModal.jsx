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

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center animate-fadeIn">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl w-80 space-y-3"
      >
        <h2 className="font-semibold">
          {isEdit ? "Edit Transaction" : "Add Transaction"}
        </h2>

        <input
          type="date"
          required
          value={form.date}
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
          className="w-full border p-2 rounded cursor-pointer"
        />

        <input
          type="number"
          placeholder="Amount"
          required
          value={form.amount}
          onChange={(e) =>
            setForm({ ...form, amount: e.target.value })
          }
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Category"
          required
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
          className="w-full border p-2 rounded"
        />

        <select
          value={form.type}
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
            {isEdit ? "Save" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTransactionModal;
