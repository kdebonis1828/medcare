"use client";
import { TrendingUp } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", appointments: 120, revenue: 2400 },
  { name: "Feb", appointments: 140, revenue: 3100 },
  { name: "Mar", appointments: 160, revenue: 3800 },
  { name: "Apr", appointments: 155, revenue: 3600 },
  { name: "May", appointments: 210, revenue: 4700 },
  { name: "Jun", appointments: 245, revenue: 5300 },
  { name: "Jul", appointments: 290, revenue: 6400 },
];

export const FinanceChart = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-[400px]">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-800">
            Monthly Performance
          </h2>
          <p className="text-sm font-medium text-slate-500">
            Patients treated vs Projected revenue
          </p>
        </div>
        <div className="flex items-center gap-1 text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm font-bold">
          <TrendingUp size={16} />
          <span>+21.5%</span>
        </div>
      </div>

      <div className="flex-1 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0047AB" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#0047AB" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E2E8F0"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #f1f5f9",
                boxShadow:
                  "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
                fontWeight: "bold",
              }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#0047AB"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
