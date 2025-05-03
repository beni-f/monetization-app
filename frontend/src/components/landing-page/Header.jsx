
import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Home', 'Features', 'Pricing', 'Contact'];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/80 backdrop-blur-md shadow-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#" className="text-[#FFD700] font-cinzel text-2xl font-bold">EarnVue</a>
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-[#FFD700] hover:text-[#FFD700]/80 transition-colors duration-300 font-montserrat"
              >
                {item}
              </a>
            ))}
          </nav>
          <Button 
            variant="outline" 
            className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black transition-colors duration-300 font-montserrat"
            onClick={() => navigate('/register')}
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
