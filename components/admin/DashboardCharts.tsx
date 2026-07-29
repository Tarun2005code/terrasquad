"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

type Props = {
  data: {
    name: string;
    booked: number;
    seats: number;
  }[];
};

export default function DashboardCharts({
  data,
}: Props) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <h2 className="mb-6 text-2xl font-bold">
        Expedition Occupancy
      </h2>

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="booked"
              name="Booked Seats"
              fill="#2F5D50"
            />

            <Bar
              dataKey="seats"
              name="Total Seats"
              fill="#d1d5db"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}