type Props = {
  status: string;
};

export default function PaymentStatusBadge({
  status,
}: Props) {
  const colors = {
    PAID: "bg-green-100 text-green-700",
    PENDING: "bg-yellow-100 text-yellow-700",
    CANCELLED: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-semibold ${
        colors[status as keyof typeof colors] ??
        "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}