import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/session";

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const {
      bookingId,
      rating,
      title,
      comment,
    } = await req.json();

    // Validation
    if (!bookingId) {
      return NextResponse.json(
        { error: "Booking ID is required" },
        { status: 400 }
      );
    }

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    if (!comment || comment.trim().length < 10) {
      return NextResponse.json(
        {
          error:
            "Please write at least 10 characters in your review",
        },
        {
          status: 400,
        }
      );
    }

    // Verify booking belongs to user
    const booking = await prisma.booking.findFirst({
      where: {
        id: Number(bookingId),
        userId: user.id,
      },
    });

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    // Prevent duplicate review
    const existingReview =
      await prisma.review.findUnique({
        where: {
          bookingId: Number(bookingId),
        },
      });

    if (existingReview) {
      return NextResponse.json(
        {
          error: "Review already submitted",
        },
        {
          status: 400,
        }
      );
    }

    // Create review
    const review = await prisma.review.create({
      data: {
        rating: Number(rating),
        title: title?.trim() || null,
        comment: comment.trim(),
        bookingId: Number(bookingId),
        userId: user.id,
        expeditionId: booking.expeditionId,

        // Admin approval required
        approved: true,
      },
      include: {
        user: true,
      },
    });

    // Calculate expedition rating
    // Only approved reviews count
    const approvedReviews =
      await prisma.review.findMany({
        where: {
          expeditionId: booking.expeditionId,
          approved: true,
        },
      });

    if (approvedReviews.length > 0) {
      const average =
        approvedReviews.reduce(
          (sum, review) => sum + review.rating,
          0
        ) / approvedReviews.length;

      await prisma.expedition.update({
        where: {
          id: booking.expeditionId,
        },
        data: {
          rating: Number(
            average.toFixed(1)
          ),
        },
      });
    }

    return NextResponse.json({
      success: true,
      message:
  "Review submitted successfully.",
    });
  } catch (error) {
    console.error(
      "REVIEW SUBMISSION ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to submit review",
      },
      {
        status: 500,
      }
    );
  }
}