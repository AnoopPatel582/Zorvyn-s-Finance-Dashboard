import { useState, useEffect, useMemo } from "react";
import { useApp } from "../context/AppContext";
import SummaryCard from "../components/cards/SummaryCard";
import BalanceChart from "../components/charts/BalanceChart";
import CategoryChart from "../components/charts/CategoryChart";
import Insights from "../components/insights/Insights";
import FilterBar from "../components/transactions/FilterBar";
import TransactionTable from "../components/transactions/TransactionTable";
import RoleSwitcher from "../components/RoleSwitcher";
import AddTransactionModal from "../components/AddTransactionModal";
import { exportToCSV } from "../utils/exportCSV";

const getPageNumbers = (currentPage, totalPages) => {
    if (totalPages <= 5) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pageSet = new Set([1, totalPages, currentPage]);
    if (currentPage > 1) pageSet.add(currentPage - 1);
    if (currentPage < totalPages) pageSet.add(currentPage + 1);

    const sorted = [...pageSet].sort((a, b) => a - b);

    const result = [];
    for (let i = 0; i < sorted.length; i++) {
        if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
            result.push("...");
        }
        result.push(sorted[i]);
    }
    return result;
};

const Dashboard = () => {
    const { transactions, setTransactions, role, darkMode, toggleDarkMode } = useApp();
    const [filteredData, setFilteredData] = useState(transactions);
    const [showModal, setShowModal] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 10;

    const categoryOptions = useMemo(() => {
        const set = new Set(transactions.map((t) => t.category));
        return [...set].sort();
    }, [transactions]);

    useEffect(() => {
        setFilteredData(transactions);
        setCurrentPage(1);
    }, [transactions]);

    const handleSearch = (value) => {
        const filtered = transactions.filter((t) =>
            t.category.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredData(filtered);
        setCurrentPage(1);
    };

    const handleFilter = (type) => {
        if (type === "all") {
            setFilteredData(transactions);
        } else {
            setFilteredData(
                transactions.filter((t) => t.type === type)
            );
        }
        setCurrentPage(1);
    };

    const totalIncome = transactions
        .filter((t) => t.type === "income")
        .reduce((acc, t) => acc + t.amount, 0);

    const totalExpense = transactions
        .filter((t) => t.type === "expense")
        .reduce((acc, t) => acc + t.amount, 0);

    const balance = totalIncome - totalExpense;

    const handleDelete = (id) => {
        setTransactions(transactions.filter((t) => t.id !== id));
    };

    const handleCategoryFilter = (category) => {
        if (category === "all") {
            setFilteredData(transactions);
        } else {
            setFilteredData(
                transactions.filter((t) => t.category === category)
            );
        }
        setCurrentPage(1);
    };

    const handleSort = (type) => {
        const sorted = [...filteredData];

        if (type === "latest") {
            sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else if (type === "amountHigh") {
            sorted.sort((a, b) => b.amount - a.amount);
        } else {
            sorted.sort((a, b) => a.amount - b.amount);
        }

        setFilteredData(sorted);
        setCurrentPage(1);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingTransaction(null);
    };

    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-6 transition-colors duration-300">
            <div className="flex items-start justify-between mb-2">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                        Overview
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        Track your financial activity and insights
                    </p>
                    <RoleSwitcher />
                </div>

                {/* Dark mode toggle */}
                <button
                    onClick={toggleDarkMode}
                    title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    className="mt-1 p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer text-lg leading-none"
                >
                    {darkMode ? "☀️" : "🌙"}
                </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 ">
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
            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-4 dark:text-gray-100">
                    Spending Analytics
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
                    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm h-72 border border-gray-100 dark:border-gray-700 hover:shadow-md transition">
                        <BalanceChart />
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm h-72 border border-gray-100 dark:border-gray-700 hover:shadow-md transition">
                        <CategoryChart />
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm mb-8 border border-gray-100 dark:border-gray-700 hover:shadow-md transition">
                <Insights />
            </div>

            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition">
                <h2 className="text-lg font-semibold mb-4 dark:text-gray-100">
                    Recent Transactions
                </h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => exportToCSV(filteredData)}
                        className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-900 transition text-sm mb-2 cursor-pointer"
                    >
                        Export CSV
                    </button>

                    {role === "admin" && (
                        <button
                            onClick={() => {
                                setEditingTransaction(null);
                                setShowModal(true);
                            }}
                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition text-sm cursor-pointer mb-2"
                        >
                            + Add
                        </button>
                    )}
                </div>
                {showModal && (
                    <AddTransactionModal
                        onClose={closeModal}
                        editData={editingTransaction}
                    />
                )}
                <FilterBar
                    onSearch={handleSearch}
                    onFilter={handleFilter}
                    onCategoryFilter={handleCategoryFilter}
                    onSort={handleSort}
                    categories={categoryOptions}
                />

                <TransactionTable
                    data={paginatedData}
                    isAdmin={role === "admin"}
                    onDelete={handleDelete}
                    onEdit={(t) => {
                        setEditingTransaction(t);
                        setShowModal(true);
                    }}
                />

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filteredData.length)} of {filteredData.length}
                        </p>
                        <div className="flex items-center gap-1">
                            {/* Prev */}
                            <button
                                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-1 rounded text-sm border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
                            >
                                ← Prev
                            </button>

                            {/* Large screen: windowed page numbers with ellipsis */}
                            <div className="hidden sm:flex items-center gap-1">
                                {getPageNumbers(currentPage, totalPages).map((item, idx) =>
                                    item === "..." ? (
                                        <span key={`ellipsis-${idx}`} className="px-2 text-gray-400 dark:text-gray-500 text-sm select-none">
                                            …
                                        </span>
                                    ) : (
                                        <button
                                            key={item}
                                            onClick={() => setCurrentPage(item)}
                                            className={`px-3 py-1 rounded text-sm border transition cursor-pointer ${
                                                item === currentPage
                                                    ? "bg-gray-800 text-white border-gray-800 dark:bg-gray-200 dark:text-gray-900 dark:border-gray-200"
                                                    : "border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                            }`}
                                        >
                                            {item}
                                        </button>
                                    )
                                )}
                            </div>

                            {/* Small screen: compact "Page X of Y" */}
                            <span className="sm:hidden text-sm text-gray-600 dark:text-gray-400 px-2 whitespace-nowrap">
                                Page {currentPage} of {totalPages}
                            </span>

                            {/* Next */}
                            <button
                                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 rounded text-sm border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
                            >
                                Next →
                            </button>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
};

export default Dashboard;
