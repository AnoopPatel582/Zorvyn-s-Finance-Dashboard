import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useApp } from "../../context/AppContext";
import {
  formatChartAxisDate,
  formatChartTooltipDate,
} from "../../utils/dates";

const BalanceChart = () => {
  const { transactions } = useApp();
  if (!transactions.length) {
    return <p className="text-gray-500">No data available</p>;
  }

  const sorted = [...transactions].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  let runningBalance = 0;
  const chartData = sorted.map((t) => {
    if (t.type === "income") runningBalance += t.amount;
    else runningBalance -= t.amount;

    return {
      date: t.date,
      balance: runningBalance,
    };
  });

  const compactAxis = chartData.length > 16;
  const tickIndices = new Set([0, chartData.length - 1]);
  if (compactAxis) {
    const step = Math.ceil(chartData.length / 10);
    for (let i = 0; i < chartData.length; i += step) {
      tickIndices.add(i);
    }
  }
  const xAxisTicks = compactAxis
    ? [
        ...new Set(
          [...tickIndices]
            .sort((a, b) => a - b)
            .map((i) => chartData[i].date)
        ),
      ]
    : undefined;

  return (
    <div className="h-full">
      <h2 className="text-lg font-semibold mb-4">
        Balance Trend
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          data={chartData}
          margin={{ top: 8, right: 8, left: 0, bottom: 28 }}
        >
          <XAxis
            dataKey="date"
            ticks={xAxisTicks}
            interval={compactAxis ? undefined : 0}
            minTickGap={compactAxis ? 28 : undefined}
            tickFormatter={formatChartAxisDate}
            tick={{ fontSize: compactAxis ? 10 : 11 }}
            angle={compactAxis ? -30 : -35}
            textAnchor="end"
            height={compactAxis ? 44 : 48}
          />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip
            labelFormatter={(label) => formatChartTooltipDate(label)}
            formatter={(value) => [
              `₹ ${Number(value).toLocaleString("en-IN")}`,
              "Balance",
            ]}
          />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BalanceChart;
