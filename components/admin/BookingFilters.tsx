"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function BookingFilters() {
  const router = useRouter();
  const params = useSearchParams();

  const [search, setSearch] = useState(
    params.get("search") ?? ""
  );

  const status = params.get("status") ?? "ALL";
  const sort = params.get("sort") ?? "newest";
  const date = params.get("date") ?? "ALL";

  // Debounced search
  const update = useDebouncedCallback(
    (
      nextSearch: string,
      nextStatus: string,
      nextSort: string,
      nextDate: string
    ) => {
      const query = new URLSearchParams();

      if (nextSearch) {
        query.set("search", nextSearch);
      }

      if (nextStatus !== "ALL") {
        query.set("status", nextStatus);
      }

      if (nextSort !== "newest") {
        query.set("sort", nextSort);
      }

      if (nextDate !== "ALL") {
        query.set("date", nextDate);
      }

      router.push(
        `/admin/bookings?${query.toString()}`
      );
    },
    500
  );

  // Immediate update for dropdowns
  function updateImmediately(
    nextSearch: string,
    nextStatus: string,
    nextSort: string,
    nextDate: string
  ) {
    const query = new URLSearchParams();

    if (nextSearch) {
      query.set("search", nextSearch);
    }

    if (nextStatus !== "ALL") {
      query.set("status", nextStatus);
    }

    if (nextSort !== "newest") {
      query.set("sort", nextSort);
    }

    if (nextDate !== "ALL") {
      query.set("date", nextDate);
    }

    router.push(
      `/admin/bookings?${query.toString()}`
    );
  }

  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row">
      {/* Search */}
      <input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);

          update(
            e.target.value,
            status,
            sort,
            date
          );
        }}
        placeholder="Search bookings..."
        className="flex-1 rounded-xl border p-3"
      />

      {/* Status */}
      <select
        value={status}
        onChange={(e) =>
          updateImmediately(
            search,
            e.target.value,
            sort,
            date
          )
        }
        className="rounded-xl border p-3"
      >
        <option value="ALL">All</option>
        <option value="PAID">Paid</option>
        <option value="PENDING">Pending</option>
        <option value="CANCELLED">
          Cancelled
        </option>
      </select>

      {/* Sort */}
      <select
        value={sort}
        onChange={(e) =>
          updateImmediately(
            search,
            status,
            e.target.value,
            date
          )
        }
        className="rounded-xl border p-3"
      >
        <option value="newest">
          Newest
        </option>

        <option value="oldest">
          Oldest
        </option>

        <option value="amount_high">
          Amount ↓
        </option>

        <option value="amount_low">
          Amount ↑
        </option>
      </select>

      {/* Date Filter */}
      <select
        value={date}
        onChange={(e) =>
          updateImmediately(
            search,
            status,
            sort,
            e.target.value
          )
        }
        className="rounded-xl border p-3"
      >
        <option value="ALL">
          All Dates
        </option>

        <option value="TODAY">
          Today
        </option>

        <option value="7D">
          Last 7 Days
        </option>

        <option value="30D">
          Last 30 Days
        </option>
      </select>
    </div>
  );
}