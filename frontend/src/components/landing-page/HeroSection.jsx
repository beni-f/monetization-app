import { Button } from "../ui/button";
import SVGImage from '../../assets/cta-logo.svg'
import { useMediaQuery } from "@mui/material";

const HeroSection = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <section id="home" className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Gold gradient accent */}
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-gradient-to-br from-[#FFD70099] via-[#FFD700] to-[#e6c200] blur-3xl opacity-20"></div>
      <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-gradient-to-tr from-[#e6c200] to-[#FFD70099] blur-3xl opacity-10"></div>
      
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 space-y-8 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-4xl md:text-6xl font-bold font-cinzel text-[#FFD700]">
              <span className="block">Get Paid</span>
              <span className="block mt-2">to Watch Promotional Videos</span>
            </h1>
            <p className="text-xl text-[#FFD70099] font-montserrat font-light leading-relaxed max-w-lg">
            Earn coins for every view, redeem for cash, and unlock bonuses with Pro by upgrading subscription plan.
            </p>
            <div className="pt-4 flex space-x-4">
              <Button className="bg-gradient-to-r from-[#e6c200] to-[#FFD700] hover:from-[#FFD700] hover:to-[#FFD70099] text-black font-medium px-8 py-6 animate-gold-shimmer bg-[length:200%_200%] font-montserrat">
              Start Earning Now →
              </Button>
              <Button variant="outline" className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD7001A] font-montserrat">
                Learn More
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            {/* Placeholder for hero image */}
            <div className="">
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
