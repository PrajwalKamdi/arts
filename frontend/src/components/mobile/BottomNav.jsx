import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { ICON_SVG_LG, iconCountBadgeClass } from "../../utils/iconLayout";

const NAV_ITEMS = [
  {
    to: "/",
    label: "Home",
    end: true,
    icon: (active) => (
      <svg
        className={ICON_SVG_LG}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.75}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
  },
  {
    to: "/product",
    label: "Shop",
    icon: (active) => (
      <svg className={ICON_SVG_LG} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 6h16M4 12h16M4 18h7"
        />
      </svg>
    ),
  },
  {
    to: "/orders",
    label: "Orders",
    icon: (active) => (
      <svg className={ICON_SVG_LG} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
    ),
  },
  {
    to: "/cart",
    label: "Cart",
    badge: true,
    icon: (active) => (
      <svg className={ICON_SVG_LG} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
  {
    to: "/profile",
    label: "Account",
    icon: (active) => (
      <svg className={ICON_SVG_LG} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
  },
];

function BottomNav() {
  const { cartCount } = useCart();
  const { user, openAuthModal } = useAuth();

  const handleNavClick = (e, item) => {
    if ((item.to === "/cart" || item.to === "/orders") && !user) {
      e.preventDefault();
      openAuthModal("login");
    }
  };

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 overflow-visible lg:hidden" aria-label="Primary">
      <div className="pointer-events-none overflow-visible px-4 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2">
        <div className="pointer-events-auto mx-auto flex max-w-md items-center justify-around overflow-visible rounded-[26px] border border-black/[0.06] bg-white/80 px-2 py-1.5 shadow-[0_4px_24px_rgba(0,0,0,0.1)] backdrop-blur-2xl">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              data-cart-target={item.to === "/cart" ? "mobile" : undefined}
              onClick={(e) => handleNavClick(e, item)}
              className={({ isActive }) =>
                `relative flex items-center justify-center transition-all duration-300 ${
                  isActive
                    ? "flex-row gap-1.5 rounded-full bg-primary px-3.5 py-2 text-[#FAF9F6] shadow-sm"
                    : "p-2 text-neutral-500 hover:text-neutral-800"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="relative flex h-6 w-6 shrink-0 items-center justify-center overflow-visible">
                    {item.icon(isActive)}
                    {item.badge && cartCount > 0 ? (
                      <span
                        className={
                          isActive
                            ? "pointer-events-none absolute -right-1 -top-1 z-10 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#FAF9F6] px-1 text-[9px] font-bold leading-none text-primary ring-2 ring-primary"
                            : iconCountBadgeClass(true)
                        }
                      >
                        {cartCount > 99 ? "99+" : cartCount}
                      </span>
                    ) : null}
                  </span>
                  {isActive && (
                    <span className="whitespace-nowrap text-xs font-semibold leading-none">
                      {item.label}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default BottomNav;
