import { CheckCircle2Icon, AwardIcon, TrendingUpIcon, ShieldIcon } from "lucide-react";

const features = [
  {
    icon: <CheckCircle2Icon className="w-12 h-12 text-[#FFD700]" />,
    title: "Earn Instantly",
    description: "Watch promotional videos and collect coins for every view - redeemable for real cash via MasterCard, bank transfer or telebirr"
  },
  {
    icon: <AwardIcon className="w-12 h-12 text-[#FFD700]" />,
    title: "Boost Rewards",
    description: "Upgrade plan for 3x coin multipliers, higher watch limits, and exclusive high-value videos that pay more per view."
  },
  {
    icon: <TrendingUpIcon className="w-12 h-12 text-[#FFD700]" />,
    title: "Refer & Earn",
    description: "Get 100 coins for every friend who joins using your code, plus 10% of their earnings for 30 days as a Pro member."
  },
  {
    icon: <ShieldIcon className="w-12 h-12 text-[#FFD700]" />,
    title: "Creator Partnerships",
    description: "Content creators earn revenue share when their promotional videos are watched, with performance analytics and direct payout options."
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-cinzel text-[#FFD700] mb-4">
            Exceptional Features
          </h2>
          <p className="text-[#FFD700]/70 max-w-2xl mx-auto font-montserrat">
            Discover the unique aspects that set our solutions apart and provide unparalleled value.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-gradient-to-b from-[#111] to-black p-8 rounded-xl border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all duration-300 group"
            >
              <div className="mb-5 transform group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 font-cinzel text-[#FFD700]">
                {feature.title}
              </h3>
              <p className="text-[#FFD700]/70 font-montserrat font-light">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
