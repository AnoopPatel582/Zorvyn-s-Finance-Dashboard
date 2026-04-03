import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";
  import { useApp } from "../../context/AppContext";
  
  const BalanceChart = () => {
    const { transactions } = useApp();
  
    // Convert data for chart
    let runningBalance = 0;
  
    const chartData = transactions.map((t) => {
      if (t.type === "income") runningBalance += t.amount;
      else runningBalance -= t.amount;
  
      return {
        date: t.date,
        balance: runningBalance,
      };
    });
  
    return (
      <div className="h-full">
        <h2 className="text-lg font-semibold mb-4">
          Balance Trend
        </h2>
  
        <ResponsiveContainer width="100%" height="90%">
          <LineChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#3b82f6"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  export default BalanceChart;