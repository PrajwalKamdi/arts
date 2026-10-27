import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOfferBanners } from "../../api/api";

const DESKTOP_BREAKPOINT = 1024;

function mapBanners(list) {
  return (list || [])
    .filter(
      (banner) =>
        banner.isActive !== false &&
        (banner.imageUrl?.trim() || banner.title?.trim() || banner.subtitle?.trim())
    )
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((banner) => ({
      id: banner._id,
      imageUrl: banner.imageUrl || "",
      title: banner.title || "",
      titleHighlight: banner.titleHighlight || "",
      subtitle: banner.subtitle || "",
      linkUrl: banner.linkUrl || "",
      alt: banner.alt || banner.title || "Offer banner",
    }));
}

function OfferBannerTile({ banner }) {
  const hasText = Boolean(banner.title || banner.titleHighlight || banner.subtitle);

  const content = (
    <div className="relative w-full overflow-hidden bg-transparent">
      {banner.imageUrl ? (
        <img
          src={banner.imageUrl}
          alt={banner.alt}
          className="block h-auto w-full max-w-full object-cover bg-transparent"
          loading="lazy"
          draggable={false}
        />
      ) : null}

      {hasText && (
        <div
          className={`${
            banner.imageUrl
              ? "absolute inset-0 flex flex-col justify-center items-start px-6 py-4 sm:px-10 sm:py-8 md:px-14 md:py-10 bg-gradient-to-r from-black/30 via-black/10 to-transparent text-white [text-shadow:_0_1px_3px_rgba(0,0,0,0.7)]"
              : "flex flex-col justify-center items-center text-center px-6 py-8 sm:py-12 bg-primary text-white"
          }`}
        >
          {(banner.title || banner.titleHighlight) && (
            <h3 className="text-base sm:text-2xl md:text-3xl font-extrabold tracking-tight">
              {banner.title}{" "}
              {banner.titleHighlight && (
                <span className="text-[#F5F0E6] underline decoration-primary underline-offset-4">
                  {banner.titleHighlight}
                </span>
              )}
            </h3>
          )}
          {banner.subtitle && (
            <p className="mt-1 sm:mt-2 text-xs sm:text-sm md:text-base text-white/95 max-w-xl line-clamp-2">
              {banner.subtitle}
            </p>
          )}
        </div>
      )}
    </div>
  );

  if (banner.linkUrl) {
    const isExternal = /^https?:\/\//i.test(banner.linkUrl);
    if (isExternal) {
      return (
        <a
          href={banner.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-transparent"
        >
          {content}
        </a>
      );
    }
    return (
      <Link to={banner.linkUrl} className="block w-full bg-transparent">
        {content}
      </Link>
    );
  }

  return <div className="w-full bg-transparent">{content}</div>;
}

function PromoBannerSkeleton() {
  return (
    <section className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2">
      <div className="min-h-[120px] w-full animate-pulse sm:min-h-[150px]" />
    </section>
  );
}

function PromoBanner() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [device, setDevice] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`).matches
      ? "desktop"
      : "mobile"
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`);
    const handleChange = (event) => {
      setDevice(event.matches ? "desktop" : "mobile");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const fetchBanners = async () => {
      setLoading(true);
      try {
        const { data } = await getOfferBanners(device);
        let banners = mapBanners(data?.data);

        if (banners.length === 0) {
          const fallbackDevice = device === "mobile" ? "desktop" : "mobile";
          const fallback = await getOfferBanners(fallbackDevice);
          banners = mapBanners(fallback.data?.data);
        }

        setSlides(banners);
      } catch {
        setSlides([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, [device]);

  if (loading) {
    return <PromoBannerSkeleton />;
  }

  if (slides.length === 0) {
    return null;
  }

  return (
    <section className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 bg-transparent">
      <div className="flex w-full flex-col bg-transparent">
        {slides.map((slide) => (
          <OfferBannerTile key={slide.id} banner={slide} />
        ))}
      </div>
    </section>
  );
}

export default PromoBanner;
