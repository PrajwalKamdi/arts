import test from "node:test";
import assert from "node:assert/strict";
import { loadRazorpayScript, openRazorpayCheckout } from "../src/utils/razorpay.js";

test("script loading recovers after failure and shares concurrent loads", async () => {
  const oldWindow = globalThis.window;
  const oldDocument = globalThis.document;
  const scripts = [];
  globalThis.window = {};
  globalThis.document = {
    createElement: () => ({ remove() { this.removed = true; } }),
    body: { appendChild(script) { scripts.push(script); } },
  };
  try {
    const first = loadRazorpayScript();
    assert.equal(first, loadRazorpayScript());
    assert.equal(scripts.length, 1);
    scripts[0].onerror();
    assert.equal(await first, false);
    assert.equal(scripts[0].removed, true);

    const retry = loadRazorpayScript();
    assert.equal(scripts.length, 2);
    globalThis.window.Razorpay = function () {};
    scripts[1].onload();
    assert.equal(await retry, true);
  } finally {
    globalThis.window = oldWindow;
    globalThis.document = oldDocument;
  }
});

test("a failed attempt permits retry; successful payment cannot be reported as dismissed", () => {
  const oldWindow = globalThis.window;
  let options;
  let failedHandler;
  let opened = false;
  let successes = 0;
  let failures = 0;
  let dismissals = 0;
  globalThis.window = {
    Razorpay: class {
      constructor(value) { options = value; }
      on(event, handler) { assert.equal(event, "payment.failed"); failedHandler = handler; }
      open() { opened = true; }
    },
  };
  try {
    openRazorpayCheckout({
      keyId: "rzp_test_example", amount: 12345, razorpayOrderId: "order_test",
      onSuccess: () => { successes += 1; },
      onFailure: () => { failures += 1; },
      onDismiss: () => { dismissals += 1; },
    });
    assert.equal(opened, true);
    assert.equal(options.order_id, "order_test");
    assert.equal(options.amount, 12345);
    failedHandler({ error: { description: "Declined" } });
    assert.equal(failures, 1);
    assert.equal(dismissals, 0);
    options.handler({ razorpay_payment_id: "pay_test" });
    options.modal.ondismiss();
    assert.equal(successes, 1);
    assert.equal(dismissals, 0);

    openRazorpayCheckout({ onDismiss: () => { dismissals += 1; } });
    options.modal.ondismiss();
    assert.equal(dismissals, 1);
  } finally {
    globalThis.window = oldWindow;
  }
});
