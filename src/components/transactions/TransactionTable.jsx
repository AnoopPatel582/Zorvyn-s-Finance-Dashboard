const TransactionTable = ({ data, onDelete, onEdit, isAdmin }) => {
    if (data.length === 0) {
      return (
        <p className="text-gray-500 text-center py-4">
          No transactions found
        </p>
      );
    }
  
    return (
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-sm text-gray-500 border-b">
              <th className="py-2">Date</th>
              <th>Category</th>
              <th>Type</th>
              <th className="text-right">Amount</th>
            </tr>
          </thead>
  
          <tbody>
            {data.map((t) => (
              <tr key={t.id} className="border-b hover:bg-gray-50">
                <td className="py-2">{new Date(t.date).toLocaleDateString("en-IN")}</td>
                <td>{t.category}</td>
                <td className="capitalize">{t.type}</td>
                {/* <td
                  className={`text-right font-medium ${
                    t.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  ₹ {t.amount.toLocaleString("en-IN")}
                </td> */}
                <td className="text-right flex justify-end gap-2">
  <span
    className={`font-medium ${
      t.type === "income" ? "text-green-600" : "text-red-600"
    }`}
  >
    ₹ {t.amount.toLocaleString("en-IN")}
  </span>

  {isAdmin && (
    <>
      <button
        onClick={() => onEdit(t)}
        className="text-blue-500 text-sm"
      >
        Edit
      </button>

      <button
        onClick={() => onDelete(t.id)}
        className="text-red-500 text-sm"
      >
        Delete
      </button>
    </>
  )}
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default TransactionTable;