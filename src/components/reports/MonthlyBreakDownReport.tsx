import { BreakDownReportType } from "../../types/data";
import { useLogData } from "../../context/LogDataContext";
import {
  useCategoryLookups,
  formatMonth,
  filterLogsByDate,
  splitIncomeExpense,
} from "../../utils/logUtils";
import Button from "../ui/Button";
import TransactionSummary from "../layouts/TransactionSummary";
import { dailyTableHeaders } from "../../constants/DateConstants";
import EmptyMsg from "../../components/layouts/EmptyMsg";

const MonthlyBreakDownReport: React.FC<BreakDownReportType> = ({
  pickedDateValue,
  setSelectedMonth,
  setPickedMonth,
}) => {
  const { logData, deleteLogData } = useLogData();
  const { categoryLookup, paymentMethodLookup } = useCategoryLookups();

  const monthlyLogs = filterLogsByDate(logData, pickedDateValue ?? "", "month");
  const { expenseAmount, incomeAmount } = splitIncomeExpense(monthlyLogs);

  return (
    <>
      {monthlyLogs.length > 0 ? (
        <div className="grid grid-cols-1 gap-8">
          <TransactionSummary
            expenseAmount={expenseAmount}
            incomeAmount={incomeAmount}
          />
          <div className=" w-full bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 flex justify-between items-center flex-wrap">
              <h2 className="text-lg font-semibold text-gray-800">
                Breakdown for{" "}
                <span className="text-indigo-600">
                  {pickedDateValue ? formatMonth(pickedDateValue) : "N/A"}
                </span>
              </h2>
              <Button
                className="bg-gray-100 text-gray-800 hover:bg-gray-200 px-4 py-2 rounded-lg shadow-sm transition-all font-medium"
                name="BackToMonthly"
                onClick={() => {
                  setSelectedMonth?.("");
                  setPickedMonth?.("");
                }}
              >
                ← Back
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm md:text-base text-gray-700">
                <thead className="bg-gray-100">
                  <tr>
                    {dailyTableHeaders.map((header, index) => (
                      <th
                        key={index}
                        className={`py-3 px-5 ${
                          header === "Action"
                            ? "text-center w-[120px]"
                            : "text-left"
                        }`}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {monthlyLogs.map((item, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-indigo-50 transition-colors`}
                    >
                      <td className="py-3 px-5 whitespace-nowrap">
                        {item.date.split("-").reverse().join("-")} {item.time}
                      </td>
                      <td className="py-3 px-5">
                        {categoryLookup[item.category] || item.category}
                      </td>
                      <td className="py-3 px-5 truncate max-w-[180px] md:max-w-[350px] text-gray-600">
                        {item.description || (
                          <span className="text-gray-400 italic">
                            No description
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-5">
                        {paymentMethodLookup[item.paymentMethod] ||
                          item.paymentMethod}
                      </td>
                      <td
                        className={`py-3 px-5 font-medium ${
                          item.logType === "Expense"
                            ? "text-red-500"
                            : "text-green-600"
                        }`}
                      >
                        {item.logType === "Expense" ? "-" : "+"} ₹
                        {item.amount.toLocaleString()}
                      </td>
                      <td className="py-3 px-5 text-center">
                        <Button
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm shadow-sm transition-all"
                          name="deleteDailyReport"
                          onClick={() => deleteLogData(String(item.id))}
                        >
                          Delete
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
        <div className="text-center mt-8">
          <Button
            className="mt-1 bg-gray-100 text-gray-800 hover:bg-gray-200 px-4 py-2 rounded-lg shadow-sm transition-all font-medium"
            name="BackToMonthly"
            onClick={() => {
              setSelectedMonth?.("");
              setPickedMonth?.("");
            }}
          >
            ← Back
          </Button>
          <EmptyMsg message="No data found for the selected month. Try another period." />
        </div>
      )}
    </>
  );
};

export default MonthlyBreakDownReport;
