"use client";

import { useState } from "react";

export default function BookingSearch({
  onSearch,
}: {
  onSearch: (value: string) => void;
}) {
  const [value, setValue] = useState("");

  return (
    <input
      className="w-96 rounded-lg border p-3"
      placeholder="Search booking..."
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        onSearch(e.target.value);
      }}
    />
  );
}