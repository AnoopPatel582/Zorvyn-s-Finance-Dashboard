import { createContext, useContext, useState, useEffect } from "react";
import { transactionsData } from "../data/mockData";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [transactions, setTransactions] = useState([]);
    useEffect(() => {
        const stored = localStorage.getItem("transactions");

        if (stored && JSON.parse(stored).length > 0) {
            setTransactions(JSON.parse(stored));
        } else {
            setTransactions(transactionsData);
        }
    }, []);

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }, [transactions]);

    return (
        <AppContext.Provider value={{ transactions, setTransactions }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);