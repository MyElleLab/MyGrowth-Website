import { setRequestLocale } from "next-intl/server";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import StatsBar from "../components/StatsBar";
import FeatureGrid from "../components/FeatureGrid";
import LanguageGrid from "../components/LanguageGrid";
import HowItWorks from "../components/HowItWorks";
import AppPreview from "../components/AppPreview";
import Footer from "../components/Footer";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AppPreview />
        <StatsBar />
        <FeatureGrid />
        <LanguageGrid />
        <HowItWorks />
      </main>
      <Footer />
    </>
  );
}
