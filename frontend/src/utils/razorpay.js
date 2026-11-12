import { SITE_LOGO_URL, SITE_NAME } from "../config/site.js";

let scriptPromise;

export function loadRazorpayScript() {
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }

    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    const timeout = setTimeout(() => finish(false), 20000);
    const finish = (loaded) => {
      clearTimeout(timeout);
      if (!loaded) script.remove();
      resolve(loaded);
    };
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => finish(Boolean(window.Razorpay));
    script.onerror = () => finish(false);
    document.body.appendChild(script);
  }).then((loaded) => {
    if (!loaded) scriptPromise = undefined;
    return loaded;
  });
  return scriptPromise;
}

export function openRazorpayCheckout({
  keyId,
  amount,
  razorpayOrderId,
  user,
  description = "Order Payment",
  onSuccess,
  onDismiss,
  onFailure,
}) {
  let succeeded = false;
  const options = {
    key: keyId,
    amount,
    currency: "INR",
    name: SITE_NAME,
    image: SITE_LOGO_URL,
    description,
    order_id: razorpayOrderId,
    prefill: {
      name: user?.name || "",
      email: user?.email || "",
      contact: user?.phone || "",
    },
    theme: {
      color: "#3E3429",
    },
    handler: (response) => {
      succeeded = true;
      onSuccess?.(response);
    },
    modal: {
      ondismiss: () => { if (!succeeded) onDismiss?.(); },
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.on("payment.failed", (response) => onFailure?.(response));
  rzp.open();
}
