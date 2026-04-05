import { formatTableDate } from "../../utils/dates";

const TransactionTable = ({ data, onDelete, onEdit, isAdmin }) => {
  if (data.length === 0) {
    return (
      <p className="text-gray-500 dark:text-gray-400 text-center py-4">
        No transactions found
      </p>
    );
  }

  return (
    <>
      {/* ── Mobile: Card layout (hidden on md+) ── */}
      <div className="md:hidden flex flex-col gap-2">
        {data.map((t) => (
          <div
            key={t.id}
            className="border border-gray-100 dark:border-gray-700 rounded-lg p-3 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            {/* Top row: date + category | amount */}
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-gray-400 dark:text-gray-500">{formatTableDate(t.date)}</p>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-100 mt-0.5">{t.category}</p>
              </div>
              <div className="text-right">
                <span
                  className={`text-sm font-semibold ${
                    t.type === "income" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                  }`}
                >
                  ₹ {t.amount.toLocaleString("en-IN")}
                </span>
                <p className="text-xs text-gray-400 dark:text-gray-500 capitalize mt-0.5">{t.type}</p>
              </div>
            </div>

            {/* Admin actions */}
            {isAdmin && (
              <div className="flex gap-2 mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                <button
                  onClick={() => onEdit(t)}
                  className="flex-1 bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700 transition text-xs font-medium cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(t.id)}
                  className="flex-1 bg-red-600 text-white py-1.5 rounded hover:bg-red-700 transition text-xs font-medium cursor-pointer"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Desktop: Table layout (hidden below md) ── */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-sm text-gray-500 dark:text-gray-400 border-b dark:border-gray-700">
              <th className="py-2">Date</th>
              <th>Category</th>
              <th>Type</th>
              <th className="text-right">Amount</th>
            </tr>
          </thead>

          <tbody>
            {data.map((t) => (
              <tr key={t.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/40">
                <td className="py-2 text-gray-700 dark:text-gray-300">{formatTableDate(t.date)}</td>
                <td className="text-gray-700 dark:text-gray-300">{t.category}</td>
                <td className="capitalize text-gray-700 dark:text-gray-300">{t.type}</td>
                <td className="text-right">
                  <div className="flex justify-end items-center gap-2">
                    <span
                      className={`font-medium ${
                        t.type === "income" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      ₹ {t.amount.toLocaleString("en-IN")}
                    </span>

                    {isAdmin && (
                      <>
                        <button
                          onClick={() => onEdit(t)}
                          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition text-sm cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onDelete(t.id)}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition text-sm cursor-pointer"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TransactionTable;