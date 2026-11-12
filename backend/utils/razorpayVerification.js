import crypto from "node:crypto";

export function isValidRazorpaySignature(orderId, paymentId, signature, secret) {
  if (typeof signature !== "string" || !/^[a-f0-9]{64}$/i.test(signature)) return false;
  const expected = crypto.createHmac("sha256", secret)
    .update(`${orderId}|${paymentId}`).digest();
  return crypto.timingSafeEqual(expected, Buffer.from(signature, "hex"));
}

export function getCheckoutFingerprint(result) {
  const items = result.orderItems.map((item) => ({
    product: String(item.product),
    variantName: item.variantName || "",
    colorName: item.colorName || "",
    strength: item.strength || "",
    price: item.price,
    quantity: item.quantity,
  })).sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
  return crypto.createHash("sha256").update(JSON.stringify({
    items,
    deliveryAddress: result.deliveryAddress,
    couponCode: result.couponCode || "",
    couponDiscount: result.couponDiscount || 0,
    total: result.total,
  })).digest("hex");
}

export function getRazorpayPaymentValidationError({ order, payment, userId, addressId, paymentMode, paymentId }) {
  if (
    order.notes?.userId !== String(userId) ||
    order.notes?.addressId !== String(addressId) ||
    order.notes?.paymentMode !== paymentMode
  ) return "Payment does not belong to this checkout";

  if (
    payment.id !== paymentId || payment.order_id !== order.id ||
    order.currency !== "INR" || payment.currency !== "INR" ||
    Number(payment.amount) !== Number(order.amount) ||
    !Number.isSafeInteger(Number(payment.amount)) || Number(payment.amount) <= 0
  ) return "Payment details do not match the payment order";

  if (payment.status !== "captured" || payment.captured !== true || order.status !== "paid") {
    return "Payment is not captured yet. Retry payment confirmation shortly; do not pay again.";
  }
  if (Number(payment.amount_refunded) > 0) return "This payment has already been refunded";
  return null;
}
