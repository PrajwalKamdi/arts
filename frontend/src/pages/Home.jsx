import HeroBanner from "../components/mobile/HeroBanner";
import PromoMessageStrip from "../components/home/PromoMessageStrip";
import CategoryNav from "../components/mobile/CategoryNav";
import JustArrived from "../components/home/JustArrived";
import HotSelling from "../components/home/HotSelling";
import RecentlyViewed from "../components/home/RecentlyViewed";
import WhatsRightForYouSection from "../components/mobile/WhatsRightForYouSection";
import BestDeals from "../components/mobile/BestDeals";
import PromoBanner from "../components/mobile/PromoBanner";
import TestimonialsImpact from "../components/home/TestimonialsImpact";

function Home() {
  return (
    <div className="bg-mobile-bg store-page-stack">
      <div>
        <HeroBanner />
        <PromoMessageStrip />
      </div>
      <CategoryNav />
      <BestDeals />
      <div className="flex flex-col gap-3 sm:gap-4 lg:gap-5">
        <JustArrived />
        <HotSelling />
        <RecentlyViewed />
      </div>
      <WhatsRightForYouSection />
      <PromoBanner />
      <TestimonialsImpact />
    </div>
  );
}

export default Home;
