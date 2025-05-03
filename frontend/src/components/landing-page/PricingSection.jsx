import { Check } from "lucide-react";
import { Button } from "../ui/button";

const plans = [
  {
    name: "Basic",
    price: "0",
    features: ["Watch & Earn", "10 videos Watch Limit", "Cash Out"]
  },
  {
    name: "Pro",
    price: "99",
    features: ["2x Coin Multiplier", "Advanced Features", "Referral Code"]
  },
  {
    name: "Enterprise",
    price: "299",
    features: ["3x coin multiplier", "Referral Code", "Dedicated Support"]
  }
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 bg-black relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent"></div>
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-cinzel text-[#FFD700] mb-4">
            Choose Your Plan
          </h2>
          <p className="text-[#FFD700]/70 max-w-2xl mx-auto font-montserrat">
            Select the perfect package that suits your needs and unlock premium features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className="bg-gradient-to-b from-[#111] to-black p-8 rounded-xl border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold mb-4 font-cinzel text-[#FFD700]">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-[#FFD700]">{plan.price}</span>
                <span className="text-[#FFD700]/60">ETB</span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center text-[#FFD700]/70">
                    <Check className="w-5 h-5 mr-2 text-[#FFD700]" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full bg-[#FFD700] text-black hover:bg-[#FFD700]/90 transition-colors duration-300"
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
