export const getTodaysDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

export const getCurrentMonth = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

export const getFullYear = (item:Date)=> {
    const itemYear = item.getFullYear();
    return itemYear;
}

export const getMonth = (item:Date)=> {
    const itemMonth = String(item.getMonth() + 1).padStart(2, "0");
    return itemMonth;
}

export const getDate = (item:Date)=> {
    const itemDay = String(item.getDate()).padStart(2, "0");
    return itemDay;
}

export const getYearsList = () => {
const startDate = 2025;
const endDate = 1990;

const yearOptions = [];

for (let i = startDate; i >= endDate; i--) {
  yearOptions.push({ label: i.toString(), value: i.toString() });
}
return yearOptions;
};

export const getMonthsList: string[] = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export const dailyTableHeaders: string[] = ["Date", "Category", "Description", "Payment Method", "Amount", "Action"];

export const monthlyTableHeaders: string[] = ["Months", "Income", "Expense", "Balance", "Transaction", "Action"];

export const Colors = [
  '#8884d8', // purple
  '#82ca9d', // green
  '#ffc658', // yellow
  '#ff8042', // orange
  '#8dd1e1', // light blue
  '#d0ed57', // lime
  '#a4de6c', // light green
  '#d88884', // salmon
  '#aa46be', // violet
  '#f47c7c', // pinkish red
  '#ffbb28', // amber
  '#00bfae', // teal
  '#ff6f91', // coral
  '#2b1d81ff', // slate blue
  '#ff9f1c', // bright orange
];
