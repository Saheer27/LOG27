"use client";

import { useLogData } from "../../context/LogDataContext";
import { getTodaysDate } from "../../constants/DateConstants";
import {
  useCategoryLookups,
  filterLogsByDate,
  splitIncomeExpense,
  formatMonth,
} from "../../utils/logUtils";
import PieCharts from "../../components/charts/PieCharts";
import EmptyMsg from "../../components/layouts/EmptyMsg";

export default function Dashboard() {
  const { logData } = useLogData();
  const { categoryLookup, paymentMethodLookup } = useCategoryLookups();
  const pickedDateValue = getTodaysDate();
  const dailyLogs = filterLogsByDate(logData, pickedDateValue ?? "", "day");
  const { expenseAmount, incomeAmount } = splitIncomeExpense(dailyLogs);
  const sliceLatestLogs = logData.slice(0, 3);

  const groupedByCurrentMonth: Record<
    string,
    { expenses: Record<string, number>; incomes: Record<string, number> }
  > = {};

  const today = new Date();
  const currentMonth = String(today.getMonth() + 1).padStart(2, "0");
  const currentYear = today.getFullYear();
  const latestMonth = `${currentYear}-${currentMonth}`;

  logData.forEach((item) => {
    const itemDate = new Date(item.date);
    const itemMonth = String(itemDate.getMonth() + 1).padStart(2, "0");
    const itemYear = itemDate.getFullYear();
    const itemMonthKey = `${itemYear}-${itemMonth}`;

    if (itemMonthKey === latestMonth) {
      if (!groupedByCurrentMonth[latestMonth]) {
        groupedByCurrentMonth[latestMonth] = { expenses: {}, incomes: {} };
      }

      const key = categoryLookup[item.category] || item.category;

      if (item.logType === "Expense") {
        groupedByCurrentMonth[latestMonth].expenses[key] =
          (groupedByCurrentMonth[latestMonth].expenses[key] || 0) +
          Number(item.amount);
      }

      if (item.logType === "Income") {
        groupedByCurrentMonth[latestMonth].incomes[key] =
          (groupedByCurrentMonth[latestMonth].incomes[key] || 0) +
          Number(item.amount);
      }
    }
  });

  const groupedMonthsArray = Object.entries(groupedByCurrentMonth).map(
    ([latestMonth, { expenses, incomes }]) => {
      const expensePie = Object.entries(expenses)
        .filter(([, value]) => value > 0)
        .map(([cat, value]) => ({
          name: cat,
          value: Number(value),
        }));

      const incomePie = Object.entries(incomes)
        .filter(([, value]) => value > 0)
        .map(([cat, value]) => ({
          name: cat,
          value: Number(value),
        }));

      const totalExpense = expensePie.reduce((acc, cur) => acc + cur.value, 0);
      const totalIncome = incomePie.reduce((acc, cur) => acc + cur.value, 0);

      return {
        latestMonth,
        expensePie,
        incomePie,
        totalExpense,
        totalIncome,
        balance: totalIncome - totalExpense,
      };
    }
  );

  return (
    <div className="w-full">
      <div className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-2xl shadow-lg p-8 mb-8 text-center">
        <h1 className="text-2xl md:text-3xl font-extrabold leading-snug">
          Don’t just track where your money goes
          <span className="text-yellow-300">
            {" "}
            — guide it where it should grow.
          </span>
        </h1>
      </div>

      {sliceLatestLogs && sliceLatestLogs.length > 0 ? (
        <>
          <h2 className="text-2xl font-semibold mb-4">{"Today's Summary"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center justify-between">
              <span className="text-lg font-bold text-gray-600">
                💸 Expense
              </span>
              <span className="text-2xl font-extrabold text-red-500">
                ₹{expenseAmount.reduce((a, b) => Number(a) + Number(b), 0)}
              </span>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center justify-between">
              <span className="text-lg font-bold text-gray-600">💰 Income</span>
              <span className="text-2xl font-extrabold text-green-500">
                ₹{incomeAmount.reduce((a, b) => Number(a) + Number(b), 0)}
              </span>
            </div>
          </div>

          <div className="shadow-lg rounded-2xl overflow-hidden bg-white mb-8 w-full">
            <h2 className="text-lg font-bold mb-4 p-4 bg-gray-50 border-b text-gray-700 flex items-center">
              📌 Latest Logs
            </h2>

            {/* Add horizontal scroll on small devices */}
            <div className="overflow-x-auto">
              <table className="min-w-full text-left border-collapse">
                <thead className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4 whitespace-nowrap">Date</th>
                    <th className="py-3 px-4 whitespace-nowrap">Category</th>
                    {/* <th className="py-3 px-4">Description</th> */}
                    <th className="py-3 px-4 whitespace-nowrap">Payment</th>
                    <th className="py-3 px-4 whitespace-nowrap">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {sliceLatestLogs.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-2 px-4 whitespace-nowrap text-sm">
                        {item.date.split("-").reverse().join("-")} {item.time}
                      </td>
                      <td className="py-2 px-4 text-sm">
                        {categoryLookup[item.category]}
                      </td>
                      {/* <td className="py-3 px-4 truncate max-w-[160px] sm:max-w-[280px] text-gray-600 text-sm">
                        {item.description || (
                          <span className="text-gray-400 italic">No description</span>
                        )}
                      </td> */}
                      <td className="py-2 px-4 text-sm whitespace-nowrap">
                        {paymentMethodLookup[item.paymentMethod]}
                      </td>
                      <td
                        className={`py-2 px-4 font-semibold text-sm whitespace-nowrap ${
                          item.logType === "Expense"
                            ? "text-red-500"
                            : "text-green-600"
                        }`}
                      >
                        {item.logType === "Expense" ? "-" : "+"}₹{item.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {groupedMonthsArray && groupedMonthsArray.length > 0 ? (
            <div className="space-y-8">
              {groupedMonthsArray.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-800">
                      Monthly Summary for {formatMonth(item.latestMonth)}
                    </h2>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-green-600 uppercase tracking-wide">
                              Income
                            </p>
                            <p className="text-2xl font-bold text-green-700 mt-1">
                              ₹{item.totalIncome.toLocaleString()}
                            </p>
                          </div>
                          <div className="h-12 w-12 bg-green-500 rounded-full flex items-center justify-center">
                            <svg
                              className="h-6 w-6 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 11l5-5m0 0l5 5m-5-5v12"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 border border-red-200 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-red-600 uppercase tracking-wide">
                              Expenses
                            </p>
                            <p className="text-2xl font-bold text-red-700 mt-1">
                              ₹{item.totalExpense.toLocaleString()}
                            </p>
                          </div>
                          <div className="h-12 w-12 bg-red-500 rounded-full flex items-center justify-center">
                            <svg
                              className="h-6 w-6 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 13l-5 5m0 0l-5-5m5 5V6"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`rounded-xl p-6 border hover:shadow-md transition-shadow ${
                          item.balance >= 0
                            ? "bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200"
                            : "bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p
                              className={`text-sm font-medium uppercase tracking-wide ${
                                item.balance >= 0
                                  ? "text-blue-600"
                                  : "text-orange-600"
                              }`}
                            >
                              Balance
                            </p>
                            <p
                              className={`text-2xl font-bold mt-1 ${
                                item.balance >= 0
                                  ? "text-blue-700"
                                  : "text-orange-700"
                              }`}
                            >
                              ₹{Math.abs(item.balance).toLocaleString()}
                            </p>
                          </div>
                          <div
                            className={`h-12 w-12 rounded-full flex items-center justify-center ${
                              item.balance >= 0
                                ? "bg-blue-500"
                                : "bg-orange-500"
                            }`}
                          >
                            <svg
                              className="h-6 w-6 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              {item.balance >= 0 ? (
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                                />
                              ) : (
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                                />
                              )}
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">
                          Status:{" "}
                          <span
                            className={`font-semibold ${
                              item.balance >= 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {item.balance >= 0 ? "Surplus" : "Deficit"}
                          </span>
                        </span>
                        <span className="text-gray-500">
                          Savings Rate:{" "}
                          {item.totalIncome > 0
                            ? ((item.balance / item.totalIncome) * 100).toFixed(
                                1
                              )
                            : 0}
                          %
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 p-3 text-ce">
                    {item.expensePie.length > 0 && (
                      <div
                        className={`flex-1 ${
                          item.incomePie.length === 0 ? "max-w-xl" : ""
                        }`}
                      >
                        <PieCharts
                          title="Expense Chart"
                          values={item.expensePie}
                        />
                      </div>
                    )}

                    {item.incomePie.length > 0 && (
                      <div
                        className={`flex-1 ${
                          item.expensePie.length === 0 ? "max-w-xl" : ""
                        }`}
                      >
                        <PieCharts
                          title="Income Chart"
                          values={item.incomePie}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyMsg message="Get started by adding your current month's first expense or income." />
          )}
        </>
      ) : (
        <EmptyMsg message="Get started by adding your first expense or income." />
      )}
    </div>
  );
}
