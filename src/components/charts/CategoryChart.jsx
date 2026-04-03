import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";
  import { useApp } from "../../context/AppContext";
  
  const COLORS = ["#3b82f6", "#ef4444", "#22c55e", "#f59e0b", "#8b5cf6"];
  
  const CategoryChart = () => {
    const { transactions } = useApp();
  
    // Filter only expenses
    const expenses = transactions.filter((t) => t.type === "expense");
    if (expenses.length === 0) {
        return <p className="text-gray-500">No data available</p>;
    }
    // Group by category
    const categoryMap = {};
  
    expenses.forEach((t) => {
      if (!categoryMap[t.category]) {
        categoryMap[t.category] = 0;
      }
      categoryMap[t.category] += t.amount;
    });
  
    const chartData = Object.keys(categoryMap).map((key) => ({
      name: key,
      value: categoryMap[key],
    }));
  
    return (
      <div className="h-full">
        <h2 className="text-lg font-semibold mb-4">
          Spending Breakdown
        </h2>
  
        <ResponsiveContainer width="100%" height="90%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
            >
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  export default CategoryChart;