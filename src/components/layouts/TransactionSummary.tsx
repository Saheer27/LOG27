import { TransactionSummaryType } from "../../types/data";

const TransactionSummary: React.FC<TransactionSummaryType> = ({
  expenseAmount,
  incomeAmount,
}) => {
  const expenseSum = Array.isArray(expenseAmount)
    ? expenseAmount.reduce((acc, curr) => Number(acc) + Number(curr), 0)
    : 0;

  const incomeSum = Array.isArray(incomeAmount)
    ? incomeAmount.reduce((acc, curr) => Number(acc) + Number(curr), 0)
    : 0;

  const balanceAmount = incomeSum - expenseSum;

  const expenseLen = Array.isArray(expenseAmount) ? expenseAmount.length : 0;
  const incomeLen = Array.isArray(incomeAmount) ? incomeAmount.length : 0;
  const totalTransactions = expenseLen + incomeLen;

  const items = [
    { title: "Income", value: incomeSum, color: "text-green-600" },
    { title: "Expense", value: expenseSum, color: "text-red-500" },
    {
      title: "Balance",
      value: balanceAmount,
      color: balanceAmount >= 0 ? "text-green-600" : "text-red-500",
    },
    {
      title: "Transactions",
      value: totalTransactions,
      color: "text-indigo-600",
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto mt-4">
      <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">
        Transaction Summary
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-2">
        {items.map((item, index) => {
          const isCurrency = item.title !== "Transactions";
          const valueDisplay = isCurrency
            ? `${
                item.value < 0
                  ? "-₹" + Math.abs(item.value).toLocaleString("en-IN")
                  : "₹" + item.value.toLocaleString("en-IN")
              }`
            : item.value;

          return (
            <div
              key={index}
              className="bg-white shadow-lg rounded-2xl py-6 px-4 flex flex-col justify-center items-center text-center hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 w-full"
            >
              <h3 className="text-gray-500 text-sm sm:text-base font-medium uppercase tracking-wide mb-1">
                {item.title}
              </h3>

              <p
                className={`text-xl sm:text-2xl font-bold ${item.color} text-center break-all leading-tight w-full`}
              >
                {valueDisplay}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TransactionSummary;
