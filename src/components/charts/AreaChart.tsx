'use client';

import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
// import { AreaChartsProps } from '../../types/charts';

export default function AreaChartComponent() {
  const data = [
    { name: "Jan", expense: 4000, income: 2400, amt: 5400 },
    { name: "Feb", expense: 3000, income: 1398, amt: 2210 },
    { name: "Mar", expense: 2000, income: 9800, amt: 2290 },
    { name: "Apr", expense: 2780, income: 3908, amt: 2000 },
    { name: "May", expense: 1890, income: 4800, amt: 2181 },
    { name: "Jun", expense: 2390, income: 3800, amt: 2500 },
    { name: "Jul", expense: 3490, income: 4300, amt: 2100 },
    { name: "Aug", expense: 3490, income: 4300, amt: 2100 },
    { name: "Sep", expense: 3490, income: 4300, amt: 2100 },
    { name: "Oct", expense: 3490, income: 4300, amt: 2100 },
    { name: "Nov", expense: 3490, income: 4300, amt: 2100 },
    { name: "Dec", expense: 3490, income: 4300, amt: 2100 }

  ];

  return (
    <>
      <h3 className="text-xl font-bold mb-4">Area Chart</h3>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsAreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff0426ff" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ff0426ff" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area type="monotone" dataKey="expense" stroke="#ff0426ff" fillOpacity={1} fill="url(#colorUv)" />
            <Area type="monotone" dataKey="income" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
          </RechartsAreaChart>
        </ResponsiveContainer>
      </div>
    </>

  );
}
