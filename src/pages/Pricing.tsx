import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Hero3 from "@/components/Hero3";
import Navbar from "@/components/Navbar";
import LiquiditySlides from "@/components/liquiditySlides/LiquiditySlides";
import Pricing from "@/components/pricing/Pricing";
import { BTC, NFP, advancedPlan, pricingHero, standardPlan } from "@/lib/utils";

export default function PricingPage() {
  return (
    <>
      <Navbar />  
      <Hero3 data={pricingHero} isProduct={false}/>
      <Pricing standardPlan={standardPlan} advancedPlan={advancedPlan} NFP={NFP} BTC={BTC}/>
      <LiquiditySlides />
      <FAQ />
      <Footer />
    </>
  )
}
