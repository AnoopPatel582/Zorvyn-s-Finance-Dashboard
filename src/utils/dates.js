/** Parse YYYY-MM-DD without UTC day-shift in local timezone */
export const parseISODate = (iso) =>
  new Date(iso.length === 10 ? `${iso}T12:00:00` : iso);

export const formatChartAxisDate = (iso) =>
  parseISODate(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });

export const formatChartTooltipDate = (iso) =>
  parseISODate(iso).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export const formatTableDate = (iso) =>
  parseISODate(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
