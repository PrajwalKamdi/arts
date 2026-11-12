import test from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";
import {
  getCheckoutFingerprint,
  getRazorpayPaymentValidationError,
  isValidRazorpaySignature,
} from "../utils/razorpayVerification.js";

const validPayment = () => ({
  order: {
    id: "order_test", currency: "INR", amount: 12345, status: "paid",
    notes: { userId: "customer", addressId: "address", paymentMode: "online" },
  },
  payment: {
    id: "pay_test", order_id: "order_test", currency: "INR", amount: 12345,
    status: "captured", captured: true, amount_refunded: 0,
  },
  userId: "customer", addressId: "address", paymentMode: "online", paymentId: "pay_test",
});

test("signature requires the correct order, payment, secret and a valid digest", () => {
  const signature = crypto.createHmac("sha256", "test_secret").update("order_test|pay_test").digest("hex");
  assert.equal(isValidRazorpaySignature("order_test", "pay_test", signature, "test_secret"), true);
  assert.equal(isValidRazorpaySignature("other_order", "pay_test", signature, "test_secret"), false);
  assert.equal(isValidRazorpaySignature("order_test", "other_payment", signature, "test_secret"), false);
  assert.equal(isValidRazorpaySignature("order_test", "pay_test", signature, "wrong_secret"), false);
  for (const malformed of [null, {}, "short", "z".repeat(64)]) {
    assert.equal(isValidRazorpaySignature("order_test", "pay_test", malformed, "test_secret"), false);
  }
});

test("accepts a captured payment bound to the authenticated checkout", () => {
  assert.equal(getRazorpayPaymentValidationError(validPayment()), null);
});

for (const field of ["userId", "addressId", "paymentMode"]) {
  test(`rejects mismatched checkout ${field}`, () => {
    const context = validPayment();
    context[field] = "another_value";
    assert.ok(getRazorpayPaymentValidationError(context));
  });
}

for (const [field, value] of [
  ["id", "another_payment"], ["order_id", "another_order"],
  ["currency", "USD"], ["amount", 12344], ["amount", -1],
  ["status", "authorized"], ["captured", false], ["amount_refunded", 100],
]) {
  test(`rejects payment ${field}=${value}`, () => {
    const context = validPayment();
    context.payment[field] = value;
    assert.ok(getRazorpayPaymentValidationError(context));
  });
}

test("rejects an unpaid order even if the payment claims to be captured", () => {
  const context = validPayment();
  context.order.status = "attempted";
  assert.ok(getRazorpayPaymentValidationError(context));
});

test("fingerprint prevents exchanging paid products for other products at the same total", () => {
  const checkout = {
    orderItems: [{ product: "cup", price: 100, quantity: 1 }, { product: "bowl", price: 200, quantity: 1 }],
    deliveryAddress: { city: "Mumbai" }, total: 300,
  };
  const fingerprint = getCheckoutFingerprint(checkout);
  assert.equal(fingerprint, getCheckoutFingerprint({ ...checkout, orderItems: [...checkout.orderItems].reverse() }));
  assert.notEqual(fingerprint, getCheckoutFingerprint({ ...checkout, orderItems: [{ product: "plate", price: 300, quantity: 1 }] }));
  assert.notEqual(fingerprint, getCheckoutFingerprint({ ...checkout, deliveryAddress: { city: "Pune" } }));
  assert.notEqual(fingerprint, getCheckoutFingerprint({ ...checkout, couponCode: "DIFFERENT" }));
});
