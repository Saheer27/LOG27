"use client";

import React, { useState, useRef } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Select from "../../components/ui/Select";
import CategoryModal from "../../components/modals/CategoryModal";
import { useRouter } from "next/navigation";
import { useCategory } from "../../context/CategoryContext";
import ErrorMsg from "../../components/layouts/ErrorMsg";
import { useLogData } from "../../context/LogDataContext";
import { getTodaysDate } from "../../constants/DateConstants";

export default function NewLogs() {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const { expenseCategories, incomeCategories, defaultPaymentMethods } =
    useCategory();
  const [categoryType, setCategoryType] = useState("Expense");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const { setLogData } = useLogData();

  const formDetails = [
    {
      htmlFor: "date",
      labelName: "Enter Date:",
      type: "date",
      id: "date",
      name: "date",
      placeholder: "Date",
      max: getTodaysDate(),
    },
    {
      htmlFor: "amount",
      labelName: "Enter Amount:",
      type: "number",
      id: "amount",
      name: "amount",
      placeholder: "Amount",
    },
    {
      name: "logType",
    },
    {
      htmlFor: "category",
      labelName: "Category:",
      id: "category",
      name: "category",
    },
    {
      htmlFor: "paymentMethod",
      labelName: "Payment Method:",
      id: "paymentMethod",
      name: "paymentMethod",
    },
    {
      htmlFor: "description",
      labelName: "Enter Description (optional):",
      type: "text",
      id: "description",
      name: "description",
      placeholder: "Description",
    },
  ];

  const options = [
    { value: "view_summary", label: "View Summary" },
    { value: "edit_category", label: "Edit Category" },
  ];

  const handleSubOptionsChange = (value: string) => {
    if (value === "view_summary") {
      router.push("/reports");
    } else if (value === "edit_category") {
      setShowCategoryModal(true);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};

    const formData = new FormData(e.currentTarget);
    const validationArray: { name: string; labelName: string }[] = [
      { name: "date", labelName: "Date" },
      { name: "amount", labelName: "Amount" },
      { name: "logType", labelName: "Log type" },
      { name: "category", labelName: "Category" },
      { name: "paymentMethod", labelName: "Payment Method" },
    ];

    validationArray.forEach((field) => {
      let value = formData.get(field.name)?.toString().trim();
      if (field.name === "amount" && value) {
        value = value.replace(/^0+/, "") || "0";
        formData.set(field.name, value);
      }

      if (!value) {
        newErrors[field.name] = `${field.labelName} is required`;
      } else if (field.name === "amount" && Number(value) <= 0) {
        newErrors[field.name] = `${field.labelName} must be greater than zero`;
      }
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const data = Object.fromEntries(formData.entries());
    const date = new Date();
    const time = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const id = { id: Date.now().toString(), time, ...data };
    const existingLogs = JSON.parse(localStorage.getItem("newLog") || "[]");
    existingLogs.unshift(id);
    localStorage.setItem("newLog", JSON.stringify(existingLogs));
    setLogData(existingLogs);
    formRef.current?.reset();
    setErrors({});
  };

  return (
    <>
      {showCategoryModal && (
        <CategoryModal onClose={() => setShowCategoryModal(false)} />
      )}
      <div className="">
        <div className="h-auto py-4 grid grid-cols-1 sm:grid-cols-2 gap-6 my-3">
          {options.map((option, index) => (
            <Button
              key={index}
              type="button"
              id={option.value}
              name={option.value}
              className="bg-indigo-500 text-white rounded-lg p-4 hover:bg-indigo-600 transition duration-300"
              value={option.label}
              onClick={() => handleSubOptionsChange(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 my-3">
          <div className="flex justify-center items-center bg-white rounded-2xl shadow-2xl p-4">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="m-4 w-full max-w-md"
            >
              <h1 className="font-bold my-2">Add New Log</h1>
              {formDetails.map((item, index) => (
                <div key={index}>
                  <label
                    htmlFor={item.htmlFor}
                    className="text-indigo-600 font-semibold"
                  >
                    {item.labelName}
                  </label>

                  {item.name === "category" || item.name === "paymentMethod" ? (
                    <Select
                      id={item.id}
                      name={item.name}
                      className={`border border-gray-300 rounded-lg p-2 ${
                        errors[item.name] ? "" : "mb-4"
                      } w-full`}
                      options={
                        item.name === "category"
                          ? categoryType === "Expense"
                            ? expenseCategories
                            : incomeCategories
                          : defaultPaymentMethods
                      }
                      placeholder={
                        item.name === "category"
                          ? "Select Category"
                          : "Select Payment method"
                      }
                    />
                  ) : item.name === "logType" ? (
                    <>
                      <div className="flex items-center space-x-4">
                        <Input
                          type="radio"
                          id="addExpense"
                          name="logType"
                          value="Expense"
                          className="hidden peer/expense"
                          onChange={(e) => {
                            setCategoryType(e.target.value);
                          }}
                        />
                        <label
                          htmlFor="addExpense"
                          className={`${
                            errors[item.name] ? "" : "mb-4"
                          } cursor-pointer bg-white w-1/2 text-center text-black shadow-2xl border border-1 rounded-lg p-2 hover:bg-red-600 hover:text-white transition duration-300 peer-checked/expense:bg-red-900 peer-checked/expense:text-white`}
                        >
                          Expense
                        </label>
                        <Input
                          type="radio"
                          id="addIncome"
                          name="logType"
                          value="Income"
                          className="hidden peer/income"
                          onChange={(e) => {
                            setCategoryType(e.target.value);
                          }}
                        />
                        <label
                          htmlFor="addIncome"
                          className={`${
                            errors[item.name] ? "" : "mb-4"
                          } cursor-pointer bg-white w-1/2 text-center text-black shadow-2xl border border-1 rounded-lg p-2 hover:bg-green-600 hover:text-white transition duration-300 peer-checked/income:bg-green-900 peer-checked/income:text-white`}
                        >
                          Income
                        </label>
                      </div>
                    </>
                  ) : (
                    <Input
                      type={item.type}
                      id={item.id}
                      name={item.name}
                      defaultValue={item.name === "date" ? getTodaysDate() : ""}
                      className={`border border-gray-300 rounded-lg p-2 ${
                        errors[item.name] ? "" : "mb-4"
                      } w-full`}
                      placeholder={item.placeholder}
                      max={item.max}
                    />
                  )}
                  <ErrorMsg errors={errors} name={item.name} />
                </div>
              ))}

              <div className="flex items-center mb-4 space-x-4">
                <Button
                  type="submit"
                  id="addExpense"
                  name="addExpense"
                  className="bg-indigo-500 w-64 text-white rounded-lg p-2 hover:bg-indigo-600 transition duration-300"
                  value="Add Expense"
                >
                  Add
                </Button>
                <Button
                  type="reset"
                  id="resetExpense"
                  name="resetExpense"
                  className="bg-gray-400 w-48 text-white rounded-lg p-2 hover:bg-gray-500 transition duration-300"
                  value="Reset"
                  onClick={() => {
                    setErrors({});
                    formRef.current?.reset();
                  }}
                >
                  Reset
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
