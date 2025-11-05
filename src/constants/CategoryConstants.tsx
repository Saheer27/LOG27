import { Category } from "../types/category";

export const defaultExpenseCategories: Category[] = [
  { value: "food", label: "Food & Dining" },
  { value: "transportation", label: "Transportation" },
  { value: "entertainment", label: "Entertainment" },
  { value: "utilities", label: "Utilities" },
  { value: "rent", label: "Rent" },
  { value: "groceries", label: "Groceries" },
  { value: "healthcare", label: "Healthcare" },
  { value: "education", label: "Education" },
  { value: "subscriptions", label: "Subscriptions" },
  { value: "personal_care", label: "Personal Care" },
  { value: "travel", label: "Travel" },
  { value: "others", label: "Others" },
];

export const defaultIncomeCategories: Category[] = [
  { value: "salary", label: "Salary" },
  { value: "freelance", label: "Freelance / Side Income" },
  { value: "investment", label: "Investment Returns" },
  { value: "rental_income", label: "Rental Income" },
  { value: "gift", label: "Gifts & Bonuses" },
  { value: "others", label: "Other Income" },
];

export const defaultPaymentMethods: Category[] = [
  { value: "cash", label: "Cash" },
  { value: "card", label: "Credit/Debit Card" },
  { value: "upi", label: "UPI / QR Payment" },
  { value: "net_banking", label: "Net Banking" },
  { value: "wallet", label: "Wallet (Paytm, PhonePe, etc.)" },
  { value: "other", label: "Other" },
];
