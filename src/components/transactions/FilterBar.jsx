import { useState } from "react";

const FilterBar = ({ onSearch, onFilter }) => {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    onSearch(value);
  };

  return (
    <div className="flex flex-col md:flex-row gap-3 mb-4">

      {/* Search */}
      <input
        type="text"
        placeholder="Search transactions..."
        value={search}
        onChange={handleSearch}
        className="flex-1 p-2 border rounded-lg outline-none"
      />

      {/* Filter */}
      <select
        onChange={(e) => onFilter(e.target.value)}
        className="p-2 border rounded-lg"
      >
        <option value="all">All</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

    </div>
  );
};

export default FilterBar;