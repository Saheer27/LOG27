"use client";
import React, { useState } from "react";
import Input from "../../components/ui/Input";
import DailyReport from "../../components/reports/DailyReport";
import MonthlyReport from "../../components/reports/MonthlyReport";
import YearlyReport from "../../components/reports/YearlyReport";
import Button from "../../components/ui/Button";
import { getTodaysDate } from "../../constants/DateConstants";
import NewLogBtn from "../../components/layouts/NewLogBtn";

export default function Reports() {
  const DatePickerModes = ["day", "month", "year"] as const;
  type DatePickerMode = (typeof DatePickerModes)[number];
  const [viewType, setViewType] = useState<DatePickerMode>("day");
  const [pickedDate, setPickedDate] = useState<string>(getTodaysDate());
  const [pickedMonth, setPickedMonth] = useState<string>("");

  return (
    <>
      <div className="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-sm border border-gray-200 mb-8">
        <div className="flex justify-between items-center mb-5">
          {DatePickerModes.map((mode) => (
            <Button
              key={mode}
              className={`flex-1 mx-1 py-2.5 rounded-lg font-medium transition-all ${
                viewType === mode
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
              onClick={() => setViewType(mode)}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </Button>
          ))}
        </div>
        <div className="transition-all duration-300">
          {viewType === "day" && (
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-2">
                Select Date
              </label>
              <Input
                type="date"
                className="border border-gray-300 focus:border-indigo-500 focus:ring-indigo-200 rounded-lg p-2.5 w-full shadow-sm outline-none transition-all"
                value={pickedDate}
                max={getTodaysDate()}
                onChange={(e) => setPickedDate(e.target.value)}
              />
            </div>
          )}
          {viewType === "month" && (
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-2">
                Select Month
              </label>
              <Input
                type="month"
                className="border border-gray-300 focus:border-indigo-500 focus:ring-indigo-200 rounded-lg p-2.5 w-full shadow-sm outline-none transition-all"
                value={pickedMonth}
                onChange={(e) => setPickedMonth(e.target.value)}
              />
            </div>
          )}

          <NewLogBtn />
        </div>
      </div>
      <div className="max-w-6xl mx-auto">
        {viewType === "day" && <DailyReport pickedDateValue={pickedDate} />}
        {viewType === "month" && (
          <MonthlyReport
            pickedDateValue={pickedMonth}
            setPickedMonth={setPickedMonth}
          />
        )}
        {viewType === "year" && <YearlyReport />}
      </div>
    </>
  );
}
