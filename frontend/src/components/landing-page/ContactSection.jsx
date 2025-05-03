
import { Button } from "../ui/button";
import { Mail, MapPin, Phone } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-black relative">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 rounded-full bg-gradient-to-t from-[#FFD700]/10 to-transparent blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-cinzel text-[#FFD700] mb-4">
            Get in Touch
          </h2>
          <p className="text-[#FFD700]/70 max-w-2xl mx-auto font-montserrat">
            Have questions? We're here to help. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <MapPin className="w-6 h-6 text-[#FFD700] mt-1" />
              <div>
                <h3 className="text-[#FFD700] font-semibold mb-2">Our Location</h3>
                <p className="text-[#FFD700]/70">123 Luxury Avenue, Golden Street, CA 90210</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <Mail className="w-6 h-6 text-[#FFD700] mt-1" />
              <div>
                <h3 className="text-[#FFD700] font-semibold mb-2">Email Us</h3>
                <p className="text-[#FFD700]/70">contact@luxeexample.com</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <Phone className="w-6 h-6 text-[#FFD700] mt-1" />
              <div>
                <h3 className="text-[#FFD700] font-semibold mb-2">Call Us</h3>
                <p className="text-[#FFD700]/70">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>

          <form className="space-y-6">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 bg-black border border-[#FFD700]/20 rounded-lg focus:border-[#FFD700] focus:outline-none text-[#FFD700]"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 bg-black border border-[#FFD700]/20 rounded-lg focus:border-[#FFD700] focus:outline-none text-[#FFD700]"
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full px-4 py-3 bg-black border border-[#FFD700]/20 rounded-lg focus:border-[#FFD700] focus:outline-none text-[#FFD700]"
            ></textarea>
            <Button 
              className="w-full bg-[#FFD700] text-black hover:bg-[#FFD700]/90 transition-colors duration-300"
            >
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
