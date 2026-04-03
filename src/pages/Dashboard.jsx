import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useApp } from "../context/AppContext";
import SummaryCard from "../components/cards/SummaryCard";
import BalanceChart from "../components/charts/BalanceChart";
import CategoryChart from "../components/charts/CategoryChart";
import Insights from "../components/insights/Insights";
import FilterBar from "../components/transactions/FilterBar";
import TransactionTable from "../components/transactions/TransactionTable";

const Dashboard = () => {
    const { transactions } = useApp();
    const [filteredData, setFilteredData] = useState(transactions);
    useEffect(() => {
        setFilteredData(transactions);
    }, [transactions]);
    const handleSearch = (value) => {
        const filtered = transactions.filter((t) =>
            t.category.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredData(filtered);
    };

    const handleFilter = (type) => {
        if (type === "all") {
            setFilteredData(transactions);
        } else {
            setFilteredData(
                transactions.filter((t) => t.type === type)
            );
        }
    };

    const totalIncome = transactions
        .filter((t) => t.type === "income")
        .reduce((acc, t) => acc + t.amount, 0);

    const totalExpense = transactions
        .filter((t) => t.type === "expense")
        .reduce((acc, t) => acc + t.amount, 0);

    const balance = totalIncome - totalExpense;

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-6">

            {/* Navbar */}
            <div>
                <h1 className="text-2xl font-semibold text-gray-800">
                    Overview
                </h1>
                <p className="text-sm text-gray-500 mb-2">
                    Track your financial activity and insights
                </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <SummaryCard
                    title="Total Balance"
                    amount={balance}
                    color="text-blue-600"
                />
                <SummaryCard
                    title="Income"
                    amount={totalIncome}
                    color="text-green-600"
                />
                <SummaryCard
                    title="Expenses"
                    amount={totalExpense}
                    color="text-red-600"
                />
            </div>

            {/* Rest remains same */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-4">
                    Spending Analytics
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
                    <div className="bg-white p-4 rounded-xl shadow h-72 border border-gray-100">
                        <BalanceChart />
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow h-72 border border-gray-100">
                        <CategoryChart />
                    </div>
                </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow mb-8 border border-gray-100">
                <Insights />
            </div>

            <div className="bg-white p-4 rounded-xl shadow border">
                <h2 className="text-lg font-semibold mb-4">
                    Recent Transactions
                </h2>

                <FilterBar
                    onSearch={handleSearch}
                    onFilter={handleFilter}
                />

                <TransactionTable data={filteredData} />
            </div>

        </div>
    );
};

export default Dashboard;