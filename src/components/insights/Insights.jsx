import { useApp } from "../../context/AppContext";

const Insights = () => {
  const { transactions } = useApp();

  const expenses = transactions.filter((t) => t.type === "expense");

  // 🔹 Highest spending category
  const categoryMap = {};
  expenses.forEach((t) => {
    categoryMap[t.category] =
      (categoryMap[t.category] || 0) + t.amount;
  });

  const highestCategory = Object.keys(categoryMap).reduce(
    (a, b) => (categoryMap[a] > categoryMap[b] ? a : b),
    Object.keys(categoryMap)[0]
  );

  // 🔹 Monthly comparison
  const currentMonth = new Date().getMonth();
  const lastMonth = currentMonth - 1;

  let currentTotal = 0;
  let lastTotal = 0;

  expenses.forEach((t) => {
    const month = new Date(t.date).getMonth();

    if (month === currentMonth) currentTotal += t.amount;
    if (month === lastMonth) lastTotal += t.amount;
  });

  const difference = currentTotal - lastTotal;
  const percentChange =
    lastTotal === 0
      ? 0
      : ((difference / lastTotal) * 100).toFixed(1);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">
        Insights
      </h2>

      <div className="grid md:grid-cols-3 gap-4">

        {/* Highest Category */}
        <div className="bg-white p-4 rounded-xl shadow border">
          <p className="text-sm text-gray-500">
            Highest Spending
          </p>
          <h3 className="text-lg font-semibold mt-2">
            {highestCategory || "N/A"}
          </h3>
        </div>

        {/* Monthly Comparison */}
        <div className="bg-white p-4 rounded-xl shadow border">
          <p className="text-sm text-gray-500">
            Monthly Change
          </p>
          <h3 className="text-lg font-semibold mt-2">
            {percentChange}% {difference >= 0 ? "↑" : "↓"}
          </h3>
        </div>

        {/* Smart Insight */}
        <div className="bg-white p-4 rounded-xl shadow border">
          <p className="text-sm text-gray-500">
            Observation
          </p>
          <h3 className="text-sm mt-2 text-gray-700">
            You spent more on {highestCategory} this month.
          </h3>
        </div>

      </div>
    </div>
  );
};

export default Insights;