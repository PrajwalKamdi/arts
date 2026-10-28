import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useCategoriesQuery } from "../../hooks/queries/useCategoriesQuery";

function sortCategories(categories) {
  return [...categories].sort((a, b) =>
    a.name.localeCompare(b.name, "en", { sensitivity: "base" })
  );
}

function normalizeCategoryName(name) {
  return (name || "").trim().toLowerCase().replace(/\s+/g, " ");
}

/** Categories hidden from home “Shop By Your Choice” only (still on /product). */
function isHiddenHomeCategory(categoryName) {
  const key = normalizeCategoryName(categoryName);
  if (key === "most purchase") return true;
  if (key === "vape accessories" || key === "vape accessory") return true;
  if (/^vape\s+acces?sor/i.test(key)) return true;
  return false;
}

function isUsableCategoryImage(url) {
  if (!url?.trim()) return false;
  if (url.includes("res.cloudinary.com/demo")) return false;
  return true;
}

function CategoryImage({ src, name }) {
  const [failed, setFailed] = useState(false);

  if (!isUsableCategoryImage(src) || failed) {
    return (
      <span className="flex h-full w-full items-center justify-center rounded-lg bg-neutral-100 text-lg font-bold uppercase text-neutral-400 transition-transform duration-300 ease-out group-hover:scale-105 sm:text-2xl lg:text-3xl">
        {(name || "?").charAt(0)}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

function CategoryCard({ category, className = "" }) {
  return (
    <Link
      to={`/product?categoryName=${encodeURIComponent(category.name)}`}
      className={`group flex shrink-0 snap-start flex-col overflow-hidden rounded-xl border-0 bg-[#F5F0E6] p-0 shadow-none hover:border-0 hover:shadow-none ${className}`}
    >
      <div className="flex aspect-[3/2] w-full items-center justify-center overflow-hidden">
        <CategoryImage src={category.image} name={category.name} />
      </div>
      <p className="line-clamp-2 p-0 text-center text-xs font-bold uppercase leading-tight tracking-tight text-text-primary transition-colors duration-300 group-hover:text-[#5C4033] sm:text-sm md:text-base">
        {category.name.replace(/&/g, " / ")}
      </p>
    </Link>
  );
}

function NavArrowButton({ direction, onClick, label, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#3E3429]/20 bg-white/90 text-[#3E3429] shadow-sm transition hover:bg-[#3E3429] hover:text-white disabled:pointer-events-none disabled:opacity-30 lg:flex"
    >
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        {direction === "left" ? (
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        )}
      </svg>
    </button>
  );
}

function CategoryNav() {
  const { data: apiCategories = [] } = useCategoriesQuery();
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const categories = useMemo(() => {
    const filtered = apiCategories.filter(
      (cat) => !isHiddenHomeCategory(cat.categoryName)
    );

    return filtered.map((cat) => ({
      name: cat.categoryName,
      image: isUsableCategoryImage(cat.categoryImage) ? cat.categoryImage : undefined,
    }));
  }, [apiCategories]);

  const sortedCategories = useMemo(() => sortCategories(categories), [categories]);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
  }, []);

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll, sortedCategories]);

  const scrollBy = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.firstElementChild;
    const scrollAmount = card ? card.clientWidth + 10 : 300;
    el.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
  };

  if (sortedCategories.length === 0) {
    return null;
  }

  return (
    <section className="store-section-pad bg-mobile-bg">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-4 flex items-center justify-between sm:mb-5 lg:mb-6">
          <h2 className="text-xl font-bold text-text-primary sm:text-2xl lg:text-3xl">
            Shop By Category
          </h2>

          {sortedCategories.length > 4 && (
            <div className="hidden items-center gap-2 lg:flex">
              <NavArrowButton
                direction="left"
                onClick={() => scrollBy(-1)}
                disabled={!canScrollLeft}
                label="Previous categories"
              />
              <NavArrowButton
                direction="right"
                onClick={() => scrollBy(1)}
                disabled={!canScrollRight}
                label="Next categories"
              />
            </div>
          )}
        </div>

        <div
          ref={scrollRef}
          className="hide-scrollbar flex snap-x snap-mandatory gap-2 overflow-x-auto scroll-smooth p-0 sm:gap-2.5 lg:gap-2.5"
        >
          {sortedCategories.map((category) => (
            <CategoryCard
              key={category.name}
              category={category}
              className="w-[calc((100%-0.5rem)/1.5)] min-w-[calc((100%-0.5rem)/1.5)] max-w-[calc((100%-0.5rem)/1.5)] sm:w-[calc((100%-1rem)/2.5)] sm:min-w-[calc((100%-1rem)/2.5)] sm:max-w-[calc((100%-1rem)/2.5)] lg:w-[calc((100%-1.875rem)/4)] lg:min-w-[calc((100%-1.875rem)/4)] lg:max-w-[calc((100%-1.875rem)/4)]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoryNav;
