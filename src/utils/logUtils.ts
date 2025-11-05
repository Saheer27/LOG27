import { useCategory } from "../context/CategoryContext";
import { getMonthsList } from "../constants/DateConstants";
import { LogDataContextValue } from "../types/data";

export const useCategoryLookups = () => {
  const { expenseCategories, incomeCategories, defaultPaymentMethods } = useCategory();

  const categoryLookup: Record<string, string> = [
    ...expenseCategories,
    ...incomeCategories,
  ].reduce((acc, cat) => {
    acc[cat.value] = cat.label;
    return acc;
  }, {} as Record<string, string>);

  const paymentMethodLookup: Record<string, string> =
    defaultPaymentMethods.reduce((acc, method) => {
      acc[method.value] = method.label;
      return acc;
    }, {} as Record<string, string>);

  return { categoryLookup, paymentMethodLookup };
};

export const formatMonth = (monthString: string) => {
  const [year, month] = monthString.split("-");
  const monthIndex = parseInt(month, 10) - 1;
  return `${getMonthsList[monthIndex]} ${year}`;
};

export const filterLogsByDate = (
  logData: LogDataContextValue[],
  pickedDate: string,
  mode: "day" | "month" | "year"
) => {
  return logData.filter((item) => {
    const itemDateObj = new Date(item.date);
    const year = itemDateObj.getFullYear();
    const month = String(itemDateObj.getMonth() + 1).padStart(2, "0");
    const day = String(itemDateObj.getDate()).padStart(2, "0");

    if (mode === "day") return `${year}-${month}-${day}` === pickedDate;
    if (mode === "month") return `${year}-${month}` === pickedDate;
  });
};

export const splitIncomeExpense = (logData: LogDataContextValue[]) => {
  const expenseAmount: number[] = [];
  const incomeAmount: number[] = [];

  logData.forEach((item) => {
    if (item.logType === "Expense") {
      expenseAmount.push(item.amount);
    } else {
      incomeAmount.push(item.amount);
    }
  });

  return { expenseAmount, incomeAmount };
};

export const shuffle = (arr: string[]) =>
  [...arr].sort(() => Math.random() - 0.5);

