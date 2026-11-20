import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedCampaign from "@/components/FeaturedCampaign";
import WhatWeDo from "@/components/WhatWeDo";
import AlertBar from "@/components/AlertBar";
import HelpBanner from "@/components/HelpBanner";
import Stories from "@/components/Stories";
import WaysToGive from "@/components/WaysToGive";
import News from "@/components/News";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <div className="relative">
        <Header />
        <Hero />
      </div>
      <FeaturedCampaign />
      <WhatWeDo />
      <AlertBar />
      <HelpBanner />
      <Stories />
      <WaysToGive />
      <News />
      <Footer />
    </main>
  );
}