const MESSAGES = [
  { icon: "⚡", text: "100% Genuine Wholesale Stock", highlight: "Verified Quality" },
  { icon: "🚚", text: "Pan-India Express Delivery", highlight: "Fast Dispatch" },
  { icon: "💰", text: "Unbeatable Bulk Margins", highlight: "Direct Pricing" },
  { icon: "📦", text: "Flexible Minimum Order Quantities", highlight: "Low MOQ" },
  { icon: "🛡️", text: "GST-Compliant Invoices", highlight: "100% Secure" },
  { icon: "📞", text: "Dedicated Wholesale Assistance", highlight: "24/7 Support" },
];

function MessageGroup({ ariaHidden = false }) {
  return (
    <div className="flex shrink-0 items-center gap-6 pr-6 sm:gap-8 sm:pr-8" aria-hidden={ariaHidden ? "true" : undefined}>
      {MESSAGES.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2 whitespace-nowrap text-xs font-medium sm:text-sm text-white">
          <span className="text-sm sm:text-base">{item.icon}</span>
          <span>{item.text}</span>
          <span className="rounded-full bg-[#5C4033] px-2 py-0.5 text-[10px] font-semibold tracking-wider text-[#F5F0E6] uppercase sm:text-xs">
            {item.highlight}
          </span>
          <span className="ml-4 text-white/30 sm:ml-6" aria-hidden="true">✦</span>
        </div>
      ))}
    </div>
  );
}

function PromoMessageStrip() {
  return (
    <div
      className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden bg-[#3E3429] py-2 sm:py-2.5 select-none shadow-inner"
      aria-label="Promotional announcements"
    >
      <div className="promo-ticker-track">
        <MessageGroup />
        <MessageGroup ariaHidden />
      </div>
    </div>
  );
}

export default PromoMessageStrip;
