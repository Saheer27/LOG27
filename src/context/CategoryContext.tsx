"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Category, CategoryContextType } from "../types/category";
import {
  defaultExpenseCategories,
  defaultIncomeCategories,
  defaultPaymentMethods,
} from "../constants/CategoryConstants";

const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined
);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {

  const [expenseCategories, setExpenseCategories] = useState<Category[]>([]);
  const [incomeCategories, setIncomeCategories] = useState<Category[]>([]);

  const [editButton, setEditButton] = useState(true);
  const [saveButton, setSaveButton] = useState(false);
  const [deleteButton, setDeleteButton] = useState(false);
  const [isButtonDisable, setIsButtonDisable] = useState(true);

  useEffect(() => {
    const storedExpenses = localStorage.getItem("expenseCategories");
    const storedIncome = localStorage.getItem("incomeCategories");

    setExpenseCategories(
      storedExpenses ? JSON.parse(storedExpenses) : defaultExpenseCategories
    );
    setIncomeCategories(
      storedIncome ? JSON.parse(storedIncome) : defaultIncomeCategories
    );
  }, []);

  useEffect(() => {
    if (expenseCategories.length > 0) {
      localStorage.setItem(
        "expenseCategories",
        JSON.stringify(expenseCategories)
      );
    }
  }, [expenseCategories]);

  useEffect(() => {
    if (incomeCategories.length > 0) {
      localStorage.setItem(
        "incomeCategories",
        JSON.stringify(incomeCategories)
      );
    }
  }, [incomeCategories]);

  const addCategory = (value: string, categoryType: string) => {
    const capitalized = value
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    if (categoryType === "ExpenseCategory") {
      setExpenseCategories((prev) => [...prev, { value, label: capitalized }]);
    } else {
      setIncomeCategories((prev) => [...prev, { value, label: capitalized }]);
    }
  };

  const editCategory = (
    value: string,
    newLabel: string,
    categoryType: string
  ) => {
    if (categoryType === "ExpenseCategory") {
      setExpenseCategories((prev) =>
        prev.map((item) =>
          item.value === value ? { value: newLabel, label: newLabel } : item
        )
      );
    } else {
      setIncomeCategories((prev) =>
        prev.map((item) =>
          item.value === value ? { value: newLabel, label: newLabel } : item
        )
      );
    }
  };

  const deleteCategory = (value: string, categoryType: string) => {
    if (categoryType === "ExpenseCategory") {
      setExpenseCategories((prev) =>
        prev.filter((item) => item.value !== value)
      );
    } else {
      setIncomeCategories((prev) =>
        prev.filter((item) => item.value !== value)
      );
    }
  };

  const handleSaveCategory = () => {
    setIsButtonDisable(true);
    setEditButton(true);
    setDeleteButton(false);
    setSaveButton(false);
  };

  const handleEditCategory = () => {
    setIsButtonDisable(false);
    setEditButton(false);
    setDeleteButton(true);
    setSaveButton(true);
  };

  return (
    <CategoryContext.Provider
      value={{
        expenseCategories,
        incomeCategories,
        editCategory,
        deleteCategory,
        addCategory,
        handleSaveCategory,
        handleEditCategory,
        isButtonDisable,
        editButton,
        saveButton,
        deleteButton,
        defaultPaymentMethods,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context)
    throw new Error("useCategory must be used within CategoryProvider");
  return context;
};
