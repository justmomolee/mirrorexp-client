import AutoCount from "@/components/AutoCount";
import BlackSection from "@/components/BlackSection";
import FAQ from "@/components/FAQ";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorksSection from "@/components/HowItWorksSection";
import LightSection from "@/components/LightSection";
import LiquiditySlides from "@/components/liquiditySlides/LiquiditySlides";
import Navbar from "@/components/Navbar";
import SpreadSteps from "@/components/SpreadSteps";
import CryptoCarousel from "@/components/cryptoCarousel/CryptoCarousel";
import Pricing from "@/components/pricing/Pricing";
import { standardPlan, advancedPlan, NFP, BTC, testimonies, HomeSec1, stockInfo } from "@/lib/utils";
import LightSection2 from "@/components/LightSection2";
import LightSectionV2 from "@/components/LightSectionV2";
import Testimonials from "@/components/Testimonials";
import DarkSection from "@/components/DarkSection";
import StockSlide from "@/components/stockSlide/StockSlide";

export default function Home() {
  return (
    <>
      <Navbar />  
      <Hero />
      <HowItWorksSection />
      <AutoCount />
      <Features />
      <StockSlide stockData={stockInfo}/>
      <LightSectionV2 secData={HomeSec1}/>
      <CryptoCarousel />
      <DarkSection />
      <Pricing standardPlan={standardPlan} advancedPlan={advancedPlan} NFP={NFP} BTC={BTC}/>
      <LightSection />
      <BlackSection />
      <SpreadSteps />
      <Testimonials data={testimonies}/>
      <LightSection2 />
      <LiquiditySlides />
      <FAQ />
      <Footer />
    </>
  )
}
