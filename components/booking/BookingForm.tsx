"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

type BookingFormProps = {
  price: number;
};

export default function BookingForm({
  price,
}: BookingFormProps) {
  const [people, setPeople] = useState(1);

  return (
    <div className="rounded-3xl bg-white shadow-xl p-8">

      <h2 className="text-3xl font-bold text-[#2F5D50]">
        Book Expedition
      </h2>

      <div className="mt-8">

        <label className="block text-sm font-semibold">
          Select Date
        </label>

        <input
          type="date"
          className="mt-2 w-full rounded-xl border p-3"
        />

      </div>

      <div className="mt-6">

        <label className="block text-sm font-semibold">
          Number of People
        </label>

        <select
          value={people}
          onChange={(e) => setPeople(Number(e.target.value))}
          className="mt-2 w-full rounded-xl border p-3"
        >
          {[1,2,3,4,5,6].map((item)=>(
            <option key={item}>{item}</option>
          ))}
        </select>

      </div>

      <div className="mt-8 flex justify-between text-lg">
        <span>Total</span>

        <span className="font-bold text-[#2F5D50]">
          ₹{price * people}
        </span>
      </div>

      <Button className="w-full mt-8">
        Continue
      </Button>

    </div>
  );
}