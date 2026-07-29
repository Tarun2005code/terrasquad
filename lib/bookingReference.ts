export function generateBookingReference() {
  const random = Math.random()
    .toString(36)
    .substring(2, 6)
    .toUpperCase();

  return `TS-${new Date().getFullYear()}-${random}`;
}