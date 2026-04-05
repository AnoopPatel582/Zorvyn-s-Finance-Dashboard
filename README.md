# Finance Dashboard

A personal finance tracking dashboard built with React, Vite, and Tailwind CSS. It provides a clear overview of income and expenses, interactive charts, smart insights, and a fully manageable transaction list — all in a clean, responsive interface.

---

## 🚀 Live Demo

**[https://zorvyn-s-finance-dashboard.vercel.app/](https://zorvyn-s-finance-dashboard.vercel.app/)**

Deployed on [Vercel](https://vercel.com). No login required — open the link and it works instantly.

---

## Table of Contents
- [Live Demo](#-live-demo)
- [Project Details](#project-details)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Features](#features)
- [Role-Based Access](#role-based-access)
- [Creative Additions](#creative-additions)
- [Challenges & Design Decisions](#challenges--design-decisions)

---

## Project Details

| Field       | Value                         |
|-------------|-------------------------------|
| Project     | Finance Dashboard             |
| Version     | 0.0.0                         |
| Framework   | React 19 + Vite 8             |
| Styling     | Tailwind CSS v4               |
| Charts      | Recharts                      |
| Module Type | ES Modules                    |

The dashboard is seeded with 34 realistic mock transactions spanning two months (March–April 2026) across categories like Salary, Freelance, Food, Rent, Transport, Shopping, Utilities, Healthcare, Entertainment, and Daily Use.

---

## Tech Stack

| Technology      | Purpose                              |
|-----------------|--------------------------------------|
| React 19        | UI framework                         |
| Vite 8          | Dev server and build tool            |
| Tailwind CSS v4 | Utility-first styling                |
| Recharts        | Line chart and pie chart             |
| React Context   | Global state (transactions + role)   |
| localStorage    | Client-side data persistence         |

---

## Project Structure

```
finance-dashboard/
├── public/
├── src/
│   ├── components/
│   │   ├── cards/
│   │   │   └── SummaryCard.jsx         # Balance / Income / Expense cards
│   │   ├── charts/
│   │   │   ├── BalanceChart.jsx         # Running balance line chart
│   │   │   └── CategoryChart.jsx        # Expense breakdown pie chart
│   │   ├── insights/
│   │   │   └── Insights.jsx             # Smart financial insight cards
│   │   ├── transactions/
│   │   │   ├── FilterBar.jsx            # Search, filter, category, and sort controls
│   │   │   └── TransactionTable.jsx     # Card layout (mobile) + table (desktop)
│   │   ├── AddTransactionModal.jsx      # Add / Edit transaction modal
│   │   └── RoleSwitcher.jsx             # Viewer / Admin role toggle
│   ├── context/
│   │   └── AppContext.jsx               # Global state provider
│   ├── data/
│   │   └── mockData.js                  # 34 seed transactions
│   ├── pages/
│   │   └── Dashboard.jsx                # Main page — layout, logic, pagination
│   ├── utils/
│   │   ├── dates.js                     # Date formatting helpers
│   │   └── exportCSV.js                 # CSV export utility
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

---

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/AnoopPatel582/Zorvyn-s-Finance-Dashboard
   cd finance-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173` by default.

4. **Build for production** *(optional)*
   ```bash
   npm run build
   ```

5. **Preview the production build** *(optional)*
   ```bash
   npm run preview
   ```

> **Note:** No environment variables, API keys, or backend setup is required. The app runs entirely in the browser using mock data and localStorage.

---

## Features

### 1. Summary Cards
Three cards at the top of the dashboard display key financial metrics calculated live from the transaction data:
- **Total Balance** — Net income minus total expenses
- **Total Income** — Sum of all income transactions
- **Total Expenses** — Sum of all expense transactions

All amounts are formatted in the Indian number system (e.g., ₹ 1,50,000).

### 2. Balance Trend Chart
A **line chart** (Recharts `LineChart`) that plots the running balance over time by processing transactions in chronological order. If the dataset is large (more than 16 entries), the X-axis automatically switches to a compact tick display with a reduced angle to prevent label overlap.

### 3. Spending Breakdown Chart
A **pie chart** (Recharts `PieChart`) that groups all expense transactions by category and shows each category's share of the total spend. Hovering a segment shows the exact amount in Indian format.

### 4. Insights Panel
Three auto-computed insight cards:
- **Highest Spending** — The category with the most total expense
- **Monthly Change** — Percentage change in spending compared to the previous month, with a ↑/↓ indicator
- **Observation** — A contextual smart message: highlights if spending has risen or fallen significantly (>20%), or names the top spending category otherwise

### 5. Transaction Filter Bar
The filter bar provides four independent controls:
- **Search** — Filters transactions in real time by category name (case-insensitive)
- **Type Filter** — All / Income / Expense dropdown
- **Category Filter** — Dynamically populated from all unique categories in the dataset
- **Sort** — Latest first / Amount High → Low / Amount Low → High

All filters work together. The transaction list updates immediately without any page reload.

### 6. Transaction Table / Card List
The transaction list renders differently depending on the screen size:
- **Desktop (`md` and above)** — A traditional table with Date, Category, Type, and Amount columns. Admin action buttons (Edit, Delete) appear inline in the Amount column.
- **Mobile (below `md`)** — A card-per-transaction layout where date, category, amount, and type are displayed in a clean two-column card. Admin Edit/Delete buttons appear as full-width stacked buttons inside the card, separated by a subtle divider line.

### 7. Add / Edit Transaction *(Admin only)*
A modal form (`AddTransactionModal`) allows admins to:
- **Add** a new transaction — requires date, amount, category, and type (expense/income)
- **Edit** any existing transaction — the form is pre-populated with the transaction's current data

On submission, the global transaction list is updated via React Context and immediately reflected across all charts, summary cards, and insights.

### 8. Delete Transaction *(Admin only)*
Each transaction in the table has a Delete button (visible only to admins) that removes it from the global state permanently (within the current session).

### 9. Export to CSV
A one-click **Export CSV** button downloads the currently filtered and visible transaction list (not necessarily all 34) as a `.csv` file named `transactions-YYYY-MM-DD.csv`. The export includes Date, Category, Type, and Amount columns.

### 10. Role-Based Access (Viewer / Admin)
A **RoleSwitcher** dropdown at the top of the dashboard toggles between two roles:
- **Viewer** — Can view all data, charts, and insights; can filter, search, sort, and export. Cannot add, edit, or delete transactions.
- **Admin** — Full access, including the Add button, Edit button, and Delete button on each transaction.

### 11. Data Persistence (localStorage)
Transaction data is persisted to the browser's `localStorage`. Any transactions added, edited, or deleted by an admin will survive a page refresh. If no stored data is found, the app seeds from the default mock dataset.

### 12. Dark Mode Toggle
A 🌙 / ☀️ toggle button in the top-right corner of the dashboard switches the entire interface between light and dark mode. The preference is saved to `localStorage` so it persists across page refreshes. Dark mode is implemented using Tailwind CSS v4's `@custom-variant` directive with the `.dark` class applied directly on the `<html>` element — every component, card, chart container, modal, input, and pagination control responds to it.

---

## Role-Based Access

| Action                    | Viewer | Admin |
|---------------------------|--------|-------|
| View dashboard            | ✅     | ✅    |
| Search / Filter / Sort    | ✅     | ✅    |
| Export CSV                | ✅     | ✅    |
| Add new transaction       | ❌     | ✅    |
| Edit existing transaction | ❌     | ✅    |
| Delete transaction        | ❌     | ✅    |

---

## Creative Additions

> The following features were **not part of the original project requirements**. They were added as self-initiated improvements to enhance usability and user experience.

### Pagination
With 34 transactions (and the ability to add more), displaying all rows at once can make the table hard to scan. To address this, client-side pagination was implemented directly in `Dashboard.jsx`:

- **10 rows per page** — a comfortable number for both desktop and mobile
- **Page resets to 1** automatically whenever the user searches, filters by type, filters by category, or changes the sort order — so results always start from the top
- **Windowed pagination with ellipsis** on medium and large screens — instead of showing all page number buttons at once, only the first page, last page, current page, and its immediate neighbors are shown. Gaps are represented with a `…` symbol (e.g., `1 … 3 4 5 … 10`). This keeps the pagination bar compact regardless of how many pages exist.
- **"Page X of Y" display** on small (mobile) screens — numbered buttons are hidden entirely and replaced with a simple text indicator between the Prev and Next buttons, saving horizontal space.

### Dark Mode Toggle
A full dark mode was added across every component in the app. Implementation details:
- **Toggle button** (🌙 / ☀️) sits in the top-right of the dashboard header, accessible at all times
- **Preference persists** — stored in `localStorage` and restored on page load, so the user's chosen mode survives a refresh
- **Tailwind CSS v4 class-based dark mode** — uses `@custom-variant dark` in `index.css` so all `dark:` utility classes respond to the `.dark` class on `<html>`, toggled by the `AppContext`
- Every component is fully themed: summary cards, chart containers, insights cards, filter inputs, transaction table (both mobile card and desktop table layouts), modal form, role switcher, pagination controls, and section headings

---

## Challenges & Design Decisions

### Challenge 1 — Transaction Table Breaking on Mobile in Admin Mode

**Problem:** The original implementation used a single HTML `<table>` for all screen sizes. On desktop this worked well, but on mobile the table had five effective columns — Date, Category, Type, Amount, and two action buttons (Edit + Delete) crammed into the last cell. The date field wrapped across multiple lines, category and type text collided, and the action buttons overflowed off-screen, making the admin view unusable on small devices.

**Decision:** Rather than trying to patch the table layout with overflow scroll (which still feels poor on mobile), we adopted the industry-standard **responsive dual-layout pattern**:
- On `md` and above: the original `<table>` is shown (`hidden md:block`)
- Below `md`: a **card layout** is shown instead (`md:hidden`), where each transaction is its own card with a clean two-row layout and full-width admin buttons underneath

This required no changes to the data flow — `TransactionTable` still receives the same `data`, `isAdmin`, `onEdit`, and `onDelete` props. Only the rendering is different per breakpoint.

### Challenge 2 — All Page Numbers Showing in Pagination

**Problem:** The initial pagination implementation rendered one button for every page number using `Array.from({ length: totalPages }, ...)`. With the current 34 transactions and 10 per page this gives 4 buttons — manageable, but as users add transactions, this list grows unbounded. On mobile, even 4-5 page buttons alongside "Prev" and "Next" was already visually crowded.

**Decision:** We introduced a `getPageNumbers()` helper function that implements a **windowed pagination strategy**:
- Always include page `1`, the last page, the current page, and its direct neighbors
- Insert `"..."` string tokens wherever there are numeric gaps in the sequence
- If total pages ≤ 5, all numbers are shown directly with no ellipsis
- On screens below `sm`, page number buttons are hidden entirely and replaced with the text `Page X of Y` between the Prev/Next buttons

---

*Built with React + Vite + Tailwind CSS + Recharts.*
