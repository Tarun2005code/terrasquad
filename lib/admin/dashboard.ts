import { prisma } from "@/lib/prisma";

export async function getDashboardData() {
  const [
    totalBookings,
    paidBookings,
    pendingBookings,
    cancelledBookings,
    checkedIn,
    expeditions,
    paid,
    recentBookings,
    couponCount,
  ] = await Promise.all([
    prisma.booking.count(),
    prisma.booking.count({
      where: {
        paymentStatus: "PAID",
      },
    }),

    prisma.booking.count({
      where: {
        paymentStatus: "PENDING",
      },
    }),

    prisma.booking.count({
      where: {
        paymentStatus: "CANCELLED",
      },
    }),

    prisma.booking.count({
      where: {
        checkedIn: true,
      },
    }),

    prisma.expedition.findMany({
      include: {
        dates: true,
      },
    }),

    prisma.booking.findMany({
      where: {
        paymentStatus: "PAID",
      },
    }),

    prisma.booking.findMany({
      include: {
        user: true,
        expedition: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    }),
    prisma.coupon.count(),
  ]);

  let revenue = 0;
  let seats = 0;
  let bookedSeats = 0;

  paid.forEach((booking) => {
    revenue += booking.finalAmount;
  });

  expeditions.forEach((expedition) => {
    expedition.dates.forEach((date) => {
      seats += date.seats;
      bookedSeats += date.bookedSeats;
    });
  });

  const chartData = expeditions.map((expedition) => ({
    name: expedition.title,
    booked: expedition.dates.reduce(
      (sum, date) => sum + date.bookedSeats,
      0
    ),
    seats: expedition.dates.reduce(
      (sum, date) => sum + date.seats,
      0
    ),
  }));

  return {
    totalBookings,
    paidBookings,
    pendingBookings,
    cancelledBookings,
    checkedIn,
    revenue,
    seats,
    bookedSeats,
     couponCount,
    occupancy:
      seats === 0
        ? 0
        : Math.round((bookedSeats / seats) * 100),
    chartData,
    recentBookings,
  };
}