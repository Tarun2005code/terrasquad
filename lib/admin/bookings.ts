import { prisma } from "@/lib/prisma";
import { Prisma, PaymentStatus } from "@prisma/client";

type SortOption =
  | "newest"
  | "oldest"
  | "amount_high"
  | "amount_low";

type DateFilter =
  | "ALL"
  | "TODAY"
  | "7D"
  | "30D";

type GetBookingsOptions = {
  search?: string;
  status?: PaymentStatus | "ALL";
  page?: number;
  pageSize?: number;
  sort?: SortOption;
  date?: DateFilter;
};

export async function getAllBookings(
  options: GetBookingsOptions = {}
) {
  const {
  search = "",
  status = "ALL",
  page = 1,
  pageSize = 20,
  sort = "newest",
  date = "ALL",
} = options;
let createdAt = undefined;

const now = new Date();

if (date === "TODAY") {
  createdAt = {
    gte: new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    ),
  };
}

if (date === "7D") {
  createdAt = {
    gte: new Date(
      now.getTime() -
        7 * 24 * 60 * 60 * 1000
    ),
  };
}

if (date === "30D") {
  createdAt = {
    gte: new Date(
      now.getTime() -
        30 * 24 * 60 * 60 * 1000
    ),
  };
}
  const where: Prisma.BookingWhereInput = {
  createdAt,};

  if (status !== "ALL") {
    where.paymentStatus = status;
  }

  if (search.trim()) {
    where.OR = [
      {
        bookingReference: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        user: {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
      },
      {
        user: {
          email: {
            contains: search,
            mode: "insensitive",
          },
        },
      },
      {
        user: {
          phone: {
            contains: search,
            mode: "insensitive",
          },
        },
      },
      {
        expedition: {
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
      },
    ];
  }

  const total = await prisma.booking.count({
    where,
  });

  const bookings = await prisma.booking.findMany({
    where,
    include: {
      user: true,
      expedition: true,
    },
    orderBy:
  sort === "oldest"
    ? { createdAt: "asc" }
    : sort === "amount_high"
    ? { totalAmount: "desc" }
    : sort === "amount_low"
    ? { totalAmount: "asc" }
    : { createdAt: "desc" },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return {
    bookings,
    total,
    totalPages: Math.ceil(total / pageSize),
    currentPage: page,
  };
}