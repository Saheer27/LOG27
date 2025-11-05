import TransactionSummary from "../layouts/TransactionSummary";
import Button from "../ui/Button";
import { useLogData } from "../../context/LogDataContext";
import { ReportType } from "../../types/data";
import {
  useCategoryLookups,
  filterLogsByDate,
  splitIncomeExpense,
} from "../../utils/logUtils";
import { dailyTableHeaders } from "../../constants/DateConstants";
import EmptyMsg from "../../components/layouts/EmptyMsg";

const DailyReport: React.FC<ReportType> = ({ pickedDateValue }) => {
  const { logData, deleteLogData } = useLogData();
  const { categoryLookup, paymentMethodLookup } = useCategoryLookups();

  const dailyLogs = filterLogsByDate(logData, pickedDateValue ?? "", "day");
  const { expenseAmount, incomeAmount } = splitIncomeExpense(dailyLogs);

  return (
    <>
      {dailyLogs && dailyLogs.length > 0 ? (
        <div className="grid grid-cols-1 gap-8">
          <TransactionSummary
            expenseAmount={expenseAmount}
            incomeAmount={incomeAmount}
          />
          <div className=" w-full bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center flex-wrap">
              <h2 className="text-lg font-semibold text-gray-800">
                Daily Transactions
              </h2>
              <p className="text-sm text-gray-500">
                {dailyLogs.length} record{dailyLogs.length > 1 && "s"}
              </p>
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
                  {dailyLogs.map((item, index) => (
                    <tr
                      key={index}
                      className={`transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-indigo-50`}
                    >
                      <td className="py-3 px-5 whitespace-nowrap text-gray-800">
                        {item.time}
                      </td>
                      <td className="py-3 px-5 whitespace-nowrap">
                        {categoryLookup[item.category] || item.category}
                      </td>
                      <td className="py-3 px-5 truncate max-w-[180px] md:max-w-[350px] text-gray-600">
                        {item.description || (
                          <span className="text-gray-400 italic">
                            No description
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-5 whitespace-nowrap">
                        {paymentMethodLookup[item.paymentMethod] ||
                          item.paymentMethod}
                      </td>
                      <td
                        className={`py-3 px-5 font-semibold whitespace-nowrap ${
                          item.logType === "Expense"
                            ? "text-red-500"
                            : "text-green-600"
                        }`}
                      >
                        {item.logType === "Expense" ? "-" : "+"} ₹
                        {Number(item.amount).toLocaleString()}
                      </td>

                      <td className="py-3 px-5 text-right">
                        <Button
                          className="bg-red-500 hover:bg-red-600 transition-all text-white px-3 py-1.5 rounded-lg text-sm shadow-sm"
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
        <EmptyMsg message="Get started by adding your first expense or income." />
      )}
    </>
  );
};

export default DailyReport;
