"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { PieChartsProps } from "../../types/charts";
import { Colors } from "../../constants/DateConstants";
import { shuffle } from "../../utils/logUtils";

export default function PieCharts(props: PieChartsProps) {
  const colors = shuffle(Colors);

  return (
    <div className="flex flex-col items-center w-full">
      <h3 className="text-lg font-semibold mb-3 text-center">
        {props?.title ?? ""}
      </h3>

      {/* ✅ Chart container only */}
      <div className="w-full" style={{ height: "300px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={props.values}
              cx="50%"
              cy="50%"
              outerRadius="70%"
              dataKey="value"
              nameKey="name"
            >
              {props.values.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value: number, name: string) => [`₹${value}`, name]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* ✅ Legend completely outside chart (auto grows) */}
      <div
        className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4 w-full px-2"
      >
        {props.values.map((entry, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: colors[index % colors.length] }}
            ></span>
            <span className="text-sm text-gray-800 truncate max-w-[120px] sm:max-w-[160px] md:max-w-[200px]">
              {entry.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
