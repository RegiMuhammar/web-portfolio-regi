import HeroSection from '@/components/HeroSection';
import Ticker from '@/components/Ticker';
import BentoGrid from '@/components/BentoGrid';
import TechStack from '@/components/TechStack';
import CTABanner from '@/components/CTABanner';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div id="home">
      <HeroSection />
      <Ticker />
      <BentoGrid />
      <div className="divider"></div>
      <TechStack />
      <CTABanner />
      <Footer />
    </div>
  );
}
