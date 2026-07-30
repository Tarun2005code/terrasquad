"use client";

declare global {
  interface Window {
    Razorpay: any;
  }
}

type Props = {
  bookingId: number;
};

export default function RazorpayButton({
  bookingId,
}: Props) {
  async function pay() {
    const orderRes = await fetch("/api/payment/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookingId,
      }),
    });

    const order = await orderRes.json();

    const options = {
      key: order.key,
      amount: order.amount,
      currency: order.currency,
      order_id: order.orderId,

      name: "TerraSquad",

      description: "Expedition Booking",

      handler: async (response: any) => {
  const verify = await fetch(
    "/api/payment/verify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(response),
    }
  );

  const verifyData = await verify.json();

  if (verify.ok && verifyData.success) {
    window.location.href =
      `/booking/success?booking=${verifyData.bookingReference}`;
  } else {
    alert("Payment Verification Failed");
  }
},

      theme: {
        color: "#000000",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  }

  return (
    <button
      onClick={pay}
      className="rounded-lg bg-black px-5 py-3 text-white"
    >
      Pay Now
    </button>
  );
}