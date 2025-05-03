import Header from "../components/landing-page/Header";
import FeaturesSection from "../components/landing-page/FeaturesSection";
import PricingSection from "../components/landing-page/PricingSection";
import ContactSection from "../components/landing-page/ContactSection";
import Footer from "../components/landing-page/Footer";
import HeroSection from "../components/landing-page/HeroSection";

const LandingPage = () => {
  return (
    <div className="bg-black min-h-screen font-montserrat overflow-x-hidden">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
