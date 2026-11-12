import { Link } from "react-router-dom";
import { useCategoriesQuery } from "../../hooks/queries/useCategoriesQuery";

function ShopByCategory() {
  const { data: categories = [], isLoading: loading } = useCategoriesQuery();

  return (
    <section className="bg-black text-white px-5 sm:px-6 md:px-8 lg:px-12 py-8 md:py-10">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6 md:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-[1.75rem] font-bold uppercase tracking-tight">
            <span className="text-white">Shop By </span>
            <span className="text-accent">Category</span>
          </h2>
          <Link
            to="/product"
            className="inline-flex items-center gap-1 text-sm sm:text-base font-semibold uppercase text-accent hover:underline"
          >
            View All Categories
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="aspect-square flex min-w-0 flex-col overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 p-3 sm:p-4 motion-safe:animate-pulse"
              >
                <div className="min-h-0 flex-1 rounded-lg bg-neutral-800" />
                <div className="mt-3 h-3 w-3/4 mx-auto rounded bg-neutral-800" />
                <div className="mt-2 h-2 w-1/3 mx-auto rounded bg-neutral-800" />
              </div>
            ))}
          </div>
        ) : categories.length === 0 ? (
          <p className="text-center text-neutral-400 py-8">
            No categories available yet.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
            {categories.map((item) => (
              <Link
                key={item._id}
                to="/product"
                className="group aspect-square flex min-w-0 flex-col overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 p-3 sm:p-4 hover:border-accent/60 hover:bg-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent transition-colors duration-200"
              >
                <div className="flex min-h-0 w-full flex-1 items-center justify-center overflow-hidden rounded-lg bg-neutral-900">
                  <img
                    src={item.categoryImage}
                    alt={item.categoryName}
                    className="h-full w-full object-contain p-2 sm:p-3 motion-safe:group-hover:scale-105 motion-safe:transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <p className="mt-3 line-clamp-2 shrink-0 text-center text-xs sm:text-sm font-bold text-white leading-snug group-hover:text-accent transition-colors duration-200">
                  {item.categoryName}
                </p>
                <p className="mt-1 shrink-0 text-center text-[10px] sm:text-[11px] text-neutral-400">
                  {Number(item.productCount) || 0} products
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ShopByCategory;
