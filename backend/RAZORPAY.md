# Razorpay checkout

Checkout offers Cash on Delivery and Pay Online. Online payments use Razorpay
Standard Checkout; the backend calculates prices and confirms captured payments
before creating the store order.

## Configuration

Set these in `backend/.env` (and the production backend's environment):

```dotenv
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

Use a matching key pair from Razorpay Test Mode first. Restart the backend after
setting the keys. The frontend receives the public key from the create-order
endpoint; never put the secret in a `VITE_` variable or frontend source.

Enable automatic payment capture in the Razorpay dashboard. An authorized but
uncaptured payment is not treated as paid. Use Live Mode keys only after testing.

Official integration and test instructions:
https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/integration-steps

## Request flow

- Authenticated `POST /api/payments/create-order` accepts `addressId`,
  `paymentMode: "online"`, `checkoutItems`, `checkoutMode`, `buyNow`, and optional
  `couponCode`. It calculates the payable amount in paise and returns `keyId`,
  `razorpayOrderId`, `amount`, and `currency` for Standard Checkout.
- After payment, authenticated `POST /api/payments/verify` accepts the same
  checkout payload plus `razorpay_order_id`, `razorpay_payment_id`, and
  `razorpay_signature`. Optional `customerMessage` and `orderSource` are preserved.
- Verification checks the signature, payment/order association, customer,
  address, mode, currency, amount, capture status, refunds, and the checkout
  fingerprint stored in server-created Razorpay notes.
- Repeating confirmation for an already created order returns that order before
  recalculating a cart that may already have been cleared.
- If confirmation fails after the payment callback, checkout keeps the callback
  in page state and offers **Retry Payment Confirmation** without another charge.

## Validation

Run from the repository root:

```sh
node --test backend/tests/razorpayVerification.test.js frontend/tests/razorpay.test.js
npm --prefix frontend run build
```

Then test in a browser with Razorpay Test Mode keys:

1. Choose an address, optional coupon and notes, then select Pay Online.
2. Complete a test payment. Confirm a single paid order, correct total, and cart
   cleanup. Also exercise Buy Now.
3. Cancel checkout and test a declined payment. Confirm that no paid store order
   is created and the customer can retry.
4. Interrupt the verification request after payment, then retry confirmation.
   Confirm it reuses the payment instead of opening a new payment checkout.
5. Confirm Cash on Delivery still creates an unpaid COD order.

The local tests validate helpers and checkout callbacks; they do not replace a
browser transaction against Razorpay. Payment confirmation currently depends on
the browser callback. If the page closes before confirmation, reconcile the
transaction in Razorpay/admin using its payment ID. A Razorpay webhook and a
persisted checkout snapshot would be needed for automatic recovery after the
browser closes; this integration does not configure either.
