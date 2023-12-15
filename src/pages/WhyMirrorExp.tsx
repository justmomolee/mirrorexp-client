import Navbar from "@/components/Navbar";
import Hero3 from "@/components/Hero3";
import LightSectionV2 from "@/components/LightSectionV2";
import LiquiditySlides from "@/components/liquiditySlides/LiquiditySlides";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { companySec1, whyHero } from "@/lib/utils";

export default function WhyMirrorExp() {
  return (
    <>
    <Navbar />  
    <Hero3 data={whyHero} isProduct={false}/>
    <LightSectionV2 secData={companySec1}/>
    <LiquiditySlides />
    <FAQ />
    <Footer />
  </>
  )
}
