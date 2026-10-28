import { useMemo } from "react";
import { Link } from "react-router-dom";
import { SiteBrand } from "./SiteBrand";
import { SITE_FOOTER_NAME, SITE_FOOTER_WATERMARK, SITE_TAGLINE } from "../../config/site";
import { useCategoriesQuery } from "../../hooks/queries/useCategoriesQuery";

const shopLinks = [
  { to: "/product", label: "All Products" },
  { to: "/hot-selling", label: "Hot Selling" },
  { to: "/just-arrived", label: "Just Arrived" },
];

const legalLinks = [
  { to: "/privacy-policy", label: "Privacy Policy" },
  { to: "/terms-and-conditions", label: "Terms of Use" },
  { to: "/shipping-details", label: "Shipping Policy" },
  { to: "/support", label: "Support" },
];

function FooterLinkColumn({ title, links }) {
  return (
    <div>
      <h4 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3E3429]">
        {title}
      </h4>
      <ul className="space-y-2.5 text-sm">
        {links.map(({ to, label, key }) => (
          <li key={key || `${title}-${label}`}>
            <Link to={to} className="text-[#3E3429] transition hover:text-[#51456A]">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Footer() {
  const { data: allCategories = [] } = useCategoriesQuery();

  const categoryLinks = useMemo(() => {
    const links = allCategories
      .filter((cat) => cat.categoryName?.toLowerCase() !== "most purchase")
      .slice(0, 8)
      .map((cat) => ({
        key: cat._id,
        label: cat.categoryName,
        to: `/product?categoryName=${encodeURIComponent(cat.categoryName)}`,
      }));

    if (links.length > 0) return links;

    return [{ key: "all-products", label: "All Products", to: "/product" }];
  }, [allCategories]);

  return (
    <footer className="relative  bg-[#EDE6D6] pb-24 text-[#3E3429] lg:overflow-hidden lg:pb-8">
      <div
        aria-hidden="true"
        className="opacity-10 font-brand-display pointer-events-none absolute inset-x-0 bottom-16 hidden select-none text-[#2b2b2b] pb-2 pt-16 text-center text-[clamp(4.5rem,20vw,12rem)] font-medium uppercase leading-none tracking-[0.04em]  lg:block lg:bottom-[-0.08em]"
      >
        {SITE_FOOTER_WATERMARK}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <SiteBrand variant="footer" />

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#3E3429]">
              {SITE_TAGLINE}
            </p>
          </div>

          <FooterLinkColumn title="Categories" links={categoryLinks} />
          <FooterLinkColumn title="Shop" links={shopLinks} />
          <FooterLinkColumn title="Legal" links={legalLinks} />
        </div>

        <div className="relative mt-8 pt-5 lg:mt-10 text-[#5C4033]">
          <div className="flex flex-col gap-2 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between sm:text-sm">
            <p className="text-[#5C4033]">
              © {new Date().getFullYear()}{" "}
              <span className="font-normal text-[#5C4033]">{SITE_FOOTER_NAME}</span>. All Rights Reserved.
            </p>
            <p className="text-[#5C4033]">India — Serving nationwide</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
