const SummaryCard = ({ title, amount, color }) => {
    return (
      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="text-sm text-gray-500">{title}</h3>
        <p className={`text-2xl font-semibold mt-2 ${color}`}>
          ₹ {amount.toLocaleString("en-IN")}
        </p>
      </div>
    );
  };
  
  export default SummaryCard;