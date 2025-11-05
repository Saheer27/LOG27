import React, { useState, useEffect } from "react";
import { MonthlyReportType } from "../../types/data";
import { useLogData } from "../../context/LogDataContext";
import { monthlyTableHeaders } from "../../constants/DateConstants";
import MonthlyBreakDownReport from "./MonthlyBreakDownReport";
import Button from "../ui/Button";
import { formatMonth } from "../../utils/logUtils";
import EmptyMsg from "../../components/layouts/EmptyMsg";

const MonthlyReport: React.FC<MonthlyReportType> = ({
  pickedDateValue,
  setPickedMonth,
}) => {
  const { logData } = useLogData();
  const [selectedMonth, setSelectedMonth] = useState<string>(
    pickedDateValue ?? ""
  );

  useEffect(() => {
    setSelectedMonth(pickedDateValue ?? "");
  }, [pickedDateValue]);

  const groupedByMonth: Record<
    string,
    { income: number; expense: number; count: number }
  > = {};

  logData.forEach((item) => {
    const date = new Date(item.date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const key = `${year}-${month}`;

    if (!groupedByMonth[key]) {
      groupedByMonth[key] = { income: 0, expense: 0, count: 0 };
    }

    groupedByMonth[key].count += 1; // count this transaction

    if (item.logType === "Income") {
      groupedByMonth[key].income += Number(item.amount);
    } else {
      groupedByMonth[key].expense += Number(item.amount);
    }
  });

  const groupedMonthArray = Object.entries(groupedByMonth).map(
    ([month, { income, expense, count }]) => {
      return {
        month,
        income,
        expense,
        balance: income - expense,
        count,
      };
    }
  );

  const sortedMonthsArray = [...groupedMonthArray]
    .sort((a, b) => {
      const [yearA, monthA] = a.month.split("-").map(Number);
      const [yearB, monthB] = b.month.split("-").map(Number);
      if (yearA !== yearB) return yearA - yearB;
      return monthA - monthB;
    })
    .reverse();

  return (
    <>
      {sortedMonthsArray && sortedMonthsArray.length > 0 ? (
        <>
          {!selectedMonth ? (
            <div className="grid grid-cols-1 gap-8">
              <div className=" w-full bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center flex-wrap">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Monthly Summary
                  </h2>
                  <p className="text-sm text-gray-500">
                    {sortedMonthsArray.length} record
                    {sortedMonthsArray.length > 1 && "s"}
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm md:text-base text-gray-700">
                    <thead className="bg-gray-100">
                      <tr>
                        {monthlyTableHeaders.map((header, index) => (
                          <th
                            key={index}
                            className={`py-3 px-5 ${
                              header === "Action"
                                ? "text-center w-[140px]"
                                : "text-left"
                            }`}
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sortedMonthsArray.map((item, index) => (
                        <tr
                          key={index}
                          className={`transition-colors ${
                            index % 2 === 0 ? "bg-white" : "bg-gray-50"
                          } hover:bg-indigo-50`}
                        >
                          <td className="py-3 px-5 whitespace-nowrap text-gray-800">
                            {formatMonth(item.month)}
                          </td>
                          <td className="py-3 px-5 whitespace-nowrap text-green-600 font-semibold">
                            + ₹{Number(item.income).toLocaleString("en-IN")}
                          </td>
                          <td className="py-3 px-5 whitespace-nowrap text-red-500 font-semibold">
                            - ₹{Number(item.expense).toLocaleString("en-IN")}
                          </td>
                          <td
                            className={`py-3 px-5 font-semibold whitespace-nowrap ${
                              item.balance >= 0
                                ? "text-green-600"
                                : "text-red-500"
                            }`}
                          >
                            {item.balance >= 0 ? "+" : "-"} ₹
                            {Math.abs(item.balance).toLocaleString("en-IN")}
                          </td>
                          <td className="py-3 px-5 text-gray-700">
                            {item.count}
                          </td>
                          <td className="py-3 px-5 text-right">
                            <Button
                              className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white px-3 py-1.5 rounded-lg text-sm shadow-sm"
                              name="viewMonthlyReport"
                              onClick={() => setSelectedMonth(item.month)}
                            >
                              View Summary
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <MonthlyBreakDownReport
              pickedDateValue={selectedMonth}
              setSelectedMonth={setSelectedMonth}
              setPickedMonth={setPickedMonth}
            />
          )}
        </>
      ) : (
        <EmptyMsg message="No monthly summary available — add some transactions to view monthly insights." />
      )}
    </>
  );
};

export default MonthlyReport;
