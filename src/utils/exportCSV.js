export const exportToCSV = (data) => {
    if (!data.length) return;
  
    const headers = ["Date", "Category", "Type", "Amount"];
  
    const rows = data.map((t) => [
      t.date,
      t.category,
      t.type,
      t.amount,
    ]);
  
    const csvContent =
      [headers, ...rows]
        .map((row) => row.join(","))
        .join("\n");
  
    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });
  
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
        "download",
        `transactions-${new Date().toISOString().slice(0,10)}.csv`
      );
  
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };