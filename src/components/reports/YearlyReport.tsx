"use client";

import PieCharts from "../charts/PieCharts";
import { useLogData } from "../../context/LogDataContext";
import { useCategoryLookups, splitIncomeExpense } from "../../utils/logUtils";
import TransactionSummary from "../layouts/TransactionSummary";
import EmptyMsg from "../../components/layouts/EmptyMsg";

export default function YearlyReport() {
  const { logData } = useLogData();
  const { categoryLookup } = useCategoryLookups();

  const groupedByYear: Record<
    string,
    { expenses: Record<string, number>; incomes: Record<string, number> }
  > = {};

  logData.forEach((item) => {
    const date = new Date(item.date);
    const year = date.getFullYear();

    if (!groupedByYear[year]) {
      groupedByYear[year] = { expenses: {}, incomes: {} };
    }

    if (item.logType === "Expense") {
      const key = categoryLookup[item.category] || item.category;
      groupedByYear[year].expenses[key] =
        (groupedByYear[year].expenses[key] || 0) + Number(item.amount);
    }

    if (item.logType === "Income") {
      const key = categoryLookup[item.category] || item.category;
      groupedByYear[year].incomes[key] =
        (groupedByYear[year].incomes[key] || 0) + Number(item.amount);
    }
  });

  const groupedYearsArray = Object.entries(groupedByYear).map(
    ([year, { expenses, incomes }]) => {
      const expensePie = Object.entries(expenses).map(([cat, value]) => ({
        name: cat,
        value,
      }));

      const incomePie = Object.entries(incomes).map(([cat, value]) => ({
        name: cat,
        value,
      }));

      const totalExpense = expensePie.reduce((acc, cur) => acc + cur.value, 0);
      const totalIncome = incomePie.reduce((acc, cur) => acc + cur.value, 0);

      return {
        year,
        expensePie,
        incomePie,
        totalExpense,
        totalIncome,
        balance: totalIncome - totalExpense,
      };
    }
  );

  const sortedYearsArray = [...groupedYearsArray].sort(
    (a, b) => Number(b.year) - Number(a.year)
  );

  const { expenseAmount, incomeAmount } = splitIncomeExpense(logData);

  return (
    <>
      {sortedYearsArray && sortedYearsArray.length > 0 ? (
        <div className="grid grid-cols-1 gap-8">
          <TransactionSummary
            expenseAmount={expenseAmount}
            incomeAmount={incomeAmount}
          />
          {sortedYearsArray.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold mb-6 text-center">
                Yearly Breakdown for {item.year}
              </h2>

              <div className="flex flex-col md:flex-row flex-wrap gap-8 justify-center">
                {item.expensePie.length > 0 && (
                  <div className="flex flex-col items-center justify-start flex-1 w-full md:w-auto max-w-full md:max-w-lg">
                    <div className="w-full" style={{ height: "auto" }}>
                      <PieCharts
                        title="Expense Chart"
                        values={item.expensePie}
                      />
                    </div>
                  </div>
                )}

                <div className="flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 border border-gray-200 rounded-2xl shadow-md p-6 w-full md:max-w-xs transition-transform hover:scale-[1.02] hover:shadow-lg">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2 w-full text-center">
                    Summary
                  </h3>
                  <ul className="w-full space-y-3">
                    <li className="flex justify-between text-gray-700">
                      <span className="font-medium">Income</span>
                      <span className="font-bold text-green-600">
                        ₹{item.totalIncome.toLocaleString()}
                      </span>
                    </li>
                    <li className="flex justify-between text-gray-700">
                      <span className="font-medium">Expense</span>
                      <span className="font-bold text-red-600">
                        ₹{item.totalExpense.toLocaleString()}
                      </span>
                    </li>
                    <li className="flex justify-between text-gray-800 border-t border-gray-200 pt-3">
                      <span className="font-semibold">Balance</span>
                      <span
                        className={`font-bold text-lg ${
                          item.balance >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {`${item.balance < 0 ? "-" : ""}₹${Math.abs(
                          item.balance
                        ).toLocaleString()}`}
                      </span>
                    </li>
                  </ul>
                </div>

                {item.incomePie.length > 0 && (
                  <div className="flex flex-col items-center justify-start flex-1 w-full md:w-auto max-w-full md:max-w-lg">
                    <div className="w-full" style={{ height: "auto" }}>
                      <PieCharts title="Income Chart" values={item.incomePie} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyMsg message="Get started by adding your first expense or income." />
      )}
    </>
  );
}
