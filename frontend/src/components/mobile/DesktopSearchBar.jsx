import { useEffect, useId, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { buildProductSearchUrl } from "../../utils/productSearch";

function SearchIcon({ className = "h-5 w-5" }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      />
    </svg>
  );
}

function DesktopSearchBar({ className = "" }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const triggerRef = useRef(null);
  const searchId = useId();

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();

    const handleOutsideClick = (event) => {
      if (!containerRef.current?.contains(event.target)) setOpen(false);
    };
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    navigate(trimmed ? buildProductSearchUrl(trimmed) : "/product");
    setOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={searchId}
        className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-text-primary transition hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      >
        <SearchIcon />
        <span>Search</span>
      </button>
      {open && (
        <form
          id={searchId}
          role="search"
          onSubmit={handleSubmit}
          className="absolute left-0 top-full z-10 mt-3 flex w-[min(24rem,calc(100vw-2.5rem))] items-center gap-3 rounded-xl border border-neutral-200 bg-white p-4 shadow-lg focus-within:border-neutral-400"
        >
          <SearchIcon className="h-5 w-5 shrink-0 text-neutral-400" />
          <input
            ref={inputRef}
            type="search"
            aria-label="Search products"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products and press Enter"
            className="min-w-0 flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
          />
        </form>
      )}
    </div>
  );
}

export default DesktopSearchBar;
