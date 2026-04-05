import { useApp } from "../../context/AppContext";

const Insights = () => {
  const { transactions } = useApp();

  const expenses = transactions.filter((t) => t.type === "expense");

  const categoryMap = {};
  expenses.forEach((t) => {
    categoryMap[t.category] =
      (categoryMap[t.category] || 0) + t.amount;
  });

  const categoryKeys = Object.keys(categoryMap);
  const highestCategory =
    categoryKeys.length > 0
      ? categoryKeys.reduce((a, b) =>
          categoryMap[a] > categoryMap[b] ? a : b
        )
      : null;

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
  const percentChangeNum =
    lastTotal === 0 ? 0 : (difference / lastTotal) * 100;
  const percentChangeDisplay = percentChangeNum.toFixed(1);

  let insightText = "Spending looks stable.";
  if (percentChangeNum > 20) {
    insightText = "Your spending increased significantly this month.";
  } else if (percentChangeNum < -20) {
    insightText = "Great job! You reduced spending this month.";
  } else if (highestCategory) {
    insightText = `Most of your expenses are in ${highestCategory}.`;
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 dark:text-gray-100">
        Insights
      </h2>
      <div className="grid md:grid-cols-3 gap-4">

        {/* Highest Category */}
        <div className="bg-white dark:bg-gray-700 p-4 rounded-xl shadow border dark:border-gray-600">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Highest Spending
          </p>
          <h3 className="text-lg font-semibold mt-2 dark:text-gray-100">
            {highestCategory || "N/A"}
          </h3>
        </div>

        {/* Monthly Comparison */}
        <div className="bg-white dark:bg-gray-700 p-4 rounded-xl shadow border dark:border-gray-600">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Monthly Change
          </p>
          <h3 className="text-lg font-semibold mt-2 dark:text-gray-100">
            {percentChangeDisplay}% {difference >= 0 ? "↑" : "↓"}
          </h3>
        </div>

        {/* Smart Insight */}
        <div className="bg-white dark:bg-gray-700 p-4 rounded-xl shadow border dark:border-gray-600">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Observation
          </p>
          <h3 className="text-sm mt-2 text-gray-700 dark:text-gray-300">
            {insightText}
          </h3>
        </div>

      </div>
    </div>
  );
};

export default Insights;
