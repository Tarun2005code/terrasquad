import Link from "next/link";

type Props = {
  currentPage: number;
  totalPages: number;
  search?: string;
  status?: string;
  sort?: string;
  date?: string;
};

export default function Pagination({
  currentPage,
  totalPages,
  search,
  status,
  sort,
  date,
}: Props) {
  if (totalPages <= 1) return null;

  function createLink(page: number) {
    const params = new URLSearchParams();

    params.set("page", page.toString());

    if (search) {
      params.set("search", search);
    }

    if (status && status !== "ALL") {
      params.set("status", status);
    }

    if (sort && sort !== "newest") {
      params.set("sort", sort);
    }

    if (date && date !== "ALL") {
      params.set("date", date);
    }

    return `/admin/bookings?${params.toString()}`;
  }

  return (
    <div className="mt-8 flex items-center justify-center gap-3">
      {currentPage > 1 && (
        <Link
          href={createLink(currentPage - 1)}
          className="rounded-lg border px-4 py-2 transition hover:bg-gray-100"
        >
          ← Previous
        </Link>
      )}

      <span className="rounded-lg border bg-white px-4 py-2 font-medium">
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages && (
        <Link
          href={createLink(currentPage + 1)}
          className="rounded-lg border px-4 py-2 transition hover:bg-gray-100"
        >
          Next →
        </Link>
      )}
    </div>
  );
}