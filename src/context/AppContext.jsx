import { createContext, useContext, useState, useEffect } from "react";
import { transactionsData } from "../data/mockData";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [transactions, setTransactions] = useState([]);
    const [role, setRole] = useState("viewer");
    const [darkMode, setDarkMode] = useState(
        () => localStorage.getItem("darkMode") === "true"
    );

    // Transactions — seed from mock if nothing stored
    useEffect(() => {
        const stored = localStorage.getItem("transactions");
        if (stored && JSON.parse(stored).length > 0) {
            setTransactions(JSON.parse(stored));
        } else {
            setTransactions(transactionsData);
        }
    }, []);

    // Persist transactions
    useEffect(() => {
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }, [transactions]);

    // Apply / remove .dark class on <html> and persist preference
    useEffect(() => {
        localStorage.setItem("darkMode", darkMode);
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    const toggleDarkMode = () => setDarkMode((prev) => !prev);

    return (
        <AppContext.Provider
            value={{ transactions, setTransactions, role, setRole, darkMode, toggleDarkMode }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);