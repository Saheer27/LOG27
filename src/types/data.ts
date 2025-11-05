export type LogDataContextValue = {
  id?: string | number;
  time: string;
  date: string;
  amount: number;
  logType: "Income" | "Expense";
  category: string;
  paymentMethod: string;
  description?: string;
};

export type LogDataContextType = {
  logData: LogDataContextValue[];
  setLogData: React.Dispatch<React.SetStateAction<LogDataContextValue[]>>;
  deleteLogData: (id: string) => void;
};

export type ReportType = {
  pickedDateValue?: string;
};

export type MonthlyReportType = {
  pickedDateValue?: string;
  setPickedMonth?: React.Dispatch<React.SetStateAction<string>>;
};

export type BreakDownReportType = {
  pickedDateValue?: string;
  setSelectedMonth?: React.Dispatch<React.SetStateAction<string>>;
  setPickedMonth?: React.Dispatch<React.SetStateAction<string>>;
};

export type TransactionSummaryType = {
  expenseAmount?: number[];
  incomeAmount?: number[];
};