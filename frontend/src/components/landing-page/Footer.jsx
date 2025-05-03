const Footer = () => {
    return (
      <footer className="bg-black py-12 border-t border-[#FFD7001A]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <a href="#" className="text-[#FFD700] font-cinzel text-2xl font-bold">EarnVue</a>
              <p className="text-[#FFD70099] mt-4 max-w-md font-montserrat">
                Earn money by watching videos. Join us today and start earning!
              </p>
            </div>
  
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-[#FFD700] font-cinzel font-semibold mb-4">Company</h3>
                <ul className="space-y-2 text-[#FFD700B3] font-montserrat">
                  <li><a href="#" className="hover:text-[#FFD700] transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-[#FFD700] transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-[#FFD700] transition-colors">Press</a></li>
                  <li><a href="#" className="hover:text-[#FFD700] transition-colors">Blog</a></li>
                </ul>
              </div>
  
              <div>
                <h3 className="text-[#FFD700] font-cinzel font-semibold mb-4">Services</h3>
                <ul className="space-y-2 text-[#FFD700B3] font-montserrat">
                  <li><a href="#" className="hover:text-[#FFD700] transition-colors">Strategy</a></li>
                  <li><a href="#" className="hover:text-[#FFD700] transition-colors">Design</a></li>
                  <li><a href="#" className="hover:text-[#FFD700] transition-colors">Development</a></li>
                  <li><a href="#" className="hover:text-[#FFD700] transition-colors">Analytics</a></li>
                </ul>
              </div>
  
              <div className="col-span-2 md:col-span-1">
                <h3 className="text-[#FFD700] font-cinzel font-semibold mb-4">Contact</h3>
                <ul className="space-y-2 text-[#FFD700B3] font-montserrat">
                  <li>benifissha@gmail.com</li>
                  <li>Addis Ababa, Ethiopia</li>
                </ul>
              </div>
            </div>
          </div>
  
          <div className="border-t border-[#FFD7001A] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#FFD70080] text-sm font-montserrat">
              &copy; {new Date().getFullYear()} Luxe. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-[#FFD70080] hover:text-[#FFD700] transition-colors">
                Terms
              </a>
              <a href="#" className="text-[#FFD70080] hover:text-[#FFD700] transition-colors">
                Privacy
              </a>
              <a href="#" className="text-[#FFD70080] hover:text-[#FFD700] transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  