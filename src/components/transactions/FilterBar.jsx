import { useState } from "react";

const FilterBar = ({
  onSearch,
  onFilter,
  onCategoryFilter,
  onSort,
  categories = [],
}) => {
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
        className="p-2 border rounded-lg cursor-pointer"
      >
        <option value="all">All</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <select
        onChange={(e) => onCategoryFilter(e.target.value)}
        className="p-2 border rounded-lg cursor-pointer"
      >
        <option value="all">All Categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <select
        onChange={(e) => onSort(e.target.value)}
        className="p-2 border rounded-lg cursor-pointer"
      >
        <option value="latest">Latest</option>
        <option value="amountHigh">Amount High → Low</option>
        <option value="amountLow">Amount Low → High</option>
      </select>

    </div>
  );
};

export default FilterBar;
