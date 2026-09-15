import React, { useState } from 'react';
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  Home,
  Grid,
  ArrowRight
} from 'lucide-react';

export default function Header({ 
  activePage, 
  setActivePage, 
  cartCount, 
  onOpenSearch, 
  onOpenCart, 
  setSelectedCategory,
  isAuthenticated
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHoveringMega, setIsHoveringMega] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page, category = null) => {
    setMobileMenuOpen(false);
    if (category) {
      setSelectedCategory(category);
      setActivePage('shop');
    } else {
      setActivePage(page);
    }
  };

  return (
    <>
      <header className={`sticky top-0 z-50 transition-all duration-300 font-sans ${(scrolled || isHoveringMega || mobileMenuOpen) ? 'glass-nav' : 'bg-transparent border-transparent shadow-none'}`}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          {/* Main Top Row */}
          <div className="flex items-center justify-between h-20">
            
            {/* Left: Brand Logo */}
            <div className="flex items-center">
              <button 
                className={`lg:hidden p-2 -ml-2 mr-2 rounded-lg transition ${mobileMenuOpen ? 'text-[#000000] bg-[#F9F9F9]' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); handleNavClick('home'); }} 
                className="flex items-center cursor-pointer"
              >
                <img 
                  src="/logo.png" 
                  alt="Corekraft Logo" 
                  className="h-10 md:h-11 object-contain" 
                />
              </a>
            </div>

            {/* Center: Desktop Navigation */}
            <nav className="hidden lg:flex items-center h-full gap-10 text-[12px] font-bold uppercase tracking-[0.1em] text-gray-900">
              <button 
                onClick={() => handleNavClick('home')} 
                className={`transition h-full flex items-center border-b-2 ${activePage === 'home' ? 'border-[#000000] text-[#000000]' : 'border-transparent hover:text-[#000000]'}`}
              >
                Shop
              </button>
              
              {/* Mega Menu Trigger */}
              <div 
                className="h-full flex items-center border-b-2 border-transparent hover:border-[#000000]"
                onMouseEnter={() => setIsHoveringMega(true)}
                onMouseLeave={() => setIsHoveringMega(false)}
              >
                <button 
                  onClick={() => handleNavClick('shop', 'all')}
                  className={`transition flex items-center ${activePage === 'shop' ? 'text-[#000000]' : 'hover:text-[#000000]'}`}
                >
                  Collections
                </button>

                {/* Mega Menu Dropdown */}
                <div className={`absolute top-20 left-0 w-full glass-nav-dropdown transition-all duration-300 ${isHoveringMega ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'}`}>
                  <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12 lg:py-16">
                    <div className="grid grid-cols-3 xl:grid-cols-6 gap-x-10 gap-y-12">
                      {/* Column 1 */}
                      <div>
                        <h4 className="text-[10px] font-extrabold text-gray-400 tracking-widest mb-6 uppercase">Office Essentials</h4>
                        <ul className="space-y-4 text-[13px] font-medium text-gray-800 capitalize tracking-normal">
                          <li><button onClick={() => handleNavClick('shop', 'office-essentials')} className="w-full text-left hover:text-[#000000] transition">Notebooks & Diaries</button></li>
                          <li><button onClick={() => handleNavClick('shop', 'office-essentials')} className="w-full text-left hover:text-[#000000] transition">Premium Pens</button></li>
                          <li><button onClick={() => handleNavClick('shop', 'office-essentials')} className="w-full text-left hover:text-[#000000] transition">Desktop Organizers</button></li>
                        </ul>
                      </div>
                      
                      {/* Column 2 */}
                      <div>
                        <h4 className="text-[10px] font-extrabold text-gray-400 tracking-widest mb-6 uppercase">Drinkware</h4>
                        <ul className="space-y-4 text-[13px] font-medium text-gray-800 capitalize tracking-normal">
                          <li><button onClick={() => handleNavClick('shop', 'drinkware')} className="w-full text-left hover:text-[#000000] transition">Mugs & Cups</button></li>
                          <li><button onClick={() => handleNavClick('shop', 'drinkware')} className="w-full text-left hover:text-[#000000] transition">Water Bottles</button></li>
                          <li><button onClick={() => handleNavClick('shop', 'drinkware')} className="w-full text-left hover:text-[#000000] transition">Thermos & Flasks</button></li>
                        </ul>
                      </div>

                      {/* Column 3 */}
                      <div>
                        <h4 className="text-[10px] font-extrabold text-gray-400 tracking-widest mb-6 uppercase">Tech Gifts</h4>
                        <ul className="space-y-4 text-[13px] font-medium text-gray-800 capitalize tracking-normal">
                          <li><button onClick={() => handleNavClick('shop', 'tech-gifts')} className="w-full text-left hover:text-[#000000] transition">Power Banks</button></li>
                          <li><button onClick={() => handleNavClick('shop', 'tech-gifts')} className="w-full text-left hover:text-[#000000] transition">Bluetooth Speakers</button></li>
                          <li><button onClick={() => handleNavClick('shop', 'tech-gifts')} className="w-full text-left hover:text-[#000000] transition">Headphones & Audio</button></li>
                        </ul>
                      </div>

                      {/* Column 4 */}
                      <div>
                        <h4 className="text-[10px] font-extrabold text-gray-400 tracking-widest mb-6 uppercase">Gift Sets</h4>
                        <ul className="space-y-4 text-[13px] font-medium text-gray-800 capitalize tracking-normal">
                          <li><button onClick={() => handleNavClick('shop', 'gift-sets')} className="w-full text-left hover:text-[#000000] transition">Executive Sets</button></li>
                          <li><button onClick={() => handleNavClick('shop', 'gift-sets')} className="w-full text-left hover:text-[#000000] transition">Welcome Kits</button></li>
                          <li><button onClick={() => handleNavClick('shop', 'gift-sets')} className="w-full text-left hover:text-[#000000] transition">Festive Hampers</button></li>
                        </ul>
                      </div>

                      {/* Column 5 */}
                      <div>
                        <h4 className="text-[10px] font-extrabold text-gray-400 tracking-widest mb-6 uppercase">Eco-Friendly</h4>
                        <ul className="space-y-4 text-[13px] font-medium text-gray-800 capitalize tracking-normal">
                          <li><button onClick={() => handleNavClick('shop', 'eco-friendly')} className="w-full text-left hover:text-[#000000] transition">Bamboo Products</button></li>
                          <li><button onClick={() => handleNavClick('shop', 'eco-friendly')} className="w-full text-left hover:text-[#000000] transition">Cork Accessories</button></li>
                          <li><button onClick={() => handleNavClick('shop', 'eco-friendly')} className="w-full text-left hover:text-[#000000] transition">Recycled Materials</button></li>
                        </ul>
                      </div>

                      {/* Column 6 */}
                      <div>
                        <h4 className="text-[10px] font-extrabold text-gray-400 tracking-widest mb-6 uppercase">Lifestyle</h4>
                        <ul className="space-y-4 text-[13px] font-medium text-gray-800 capitalize tracking-normal">
                          <li><button onClick={() => handleNavClick('shop', 'lifestyle')} className="w-full text-left hover:text-[#000000] transition">Backpacks & Bags</button></li>
                          <li><button onClick={() => handleNavClick('shop', 'lifestyle')} className="w-full text-left hover:text-[#000000] transition">Apparel</button></li>
                          <li><button onClick={() => handleNavClick('shop', 'lifestyle')} className="w-full text-left hover:text-[#000000] transition">Travel Accessories</button></li>
                        </ul>
                      </div>
                    </div>

                    {/* Bottom Shop All Banner */}
                    <div className="mt-14 pt-8 border-t border-gray-200">
                      <h4 className="text-[11px] font-extrabold text-[#000000] tracking-widest mb-2 uppercase">Shop All</h4>
                      <p className="text-[13px] font-medium text-gray-600">
                        Just browsing? <button onClick={() => handleNavClick('shop', 'all')} className="text-gray-900 border-b border-gray-900 hover:text-[#000000] hover:border-[#000000] transition pb-0.5">Here is a great place to start.</button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => handleNavClick('about')} 
                className={`transition h-full flex items-center border-b-2 ${activePage === 'about' ? 'border-[#000000] text-[#000000]' : 'border-transparent hover:text-[#000000]'}`}
              >
                About
              </button>

              <button 
                onClick={() => handleNavClick('solutions')} 
                className={`transition h-full flex items-center border-b-2 ${activePage === 'solutions' ? 'border-[#000000] text-[#000000]' : 'border-transparent hover:text-[#000000]'}`}
              >
                In Situ
              </button>
            </nav>

            {/* Right: Search, Login, Cart */}
            <div className="flex items-center gap-6 sm:gap-8 text-[12px] font-bold uppercase tracking-[0.1em] text-gray-900">
              <button 
                onClick={onOpenSearch}
                className="hover:text-[#000000] transition flex items-center gap-2"
              >
                <Search size={16} strokeWidth={2} />
                <span className="hidden lg:inline">Search</span>
              </button>

              <button 
                onClick={() => handleNavClick(isAuthenticated ? 'account' : 'auth')}
                className={`transition flex items-center gap-2 ${activePage === 'account' || activePage === 'auth' ? 'text-[#000000]' : 'hover:text-[#000000]'}`}
              >
                <User size={16} strokeWidth={2} />
                <span className="hidden lg:inline">{isAuthenticated ? 'Account' : 'Login'}</span>
              </button>

              <button 
                onClick={onOpenCart}
                className="hover:text-[#000000] transition flex items-center gap-2"
              >
                <ShoppingCart size={16} strokeWidth={2} />
                <span className="hidden lg:inline">Cart</span>
                <span className="ml-1">{cartCount > 0 ? cartCount : 0}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`lg:hidden fixed inset-0 z-40 bg-white transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        style={{ top: '80px' }}
      >
        <div className="h-full overflow-y-auto pb-32 px-6 pt-6">
          <nav className="flex flex-col gap-6 text-[15px] font-bold text-gray-900 uppercase tracking-[0.1em]">
            <button onClick={() => handleNavClick('home')} className={`text-left pb-4 border-b border-gray-100 ${activePage === 'home' ? 'text-[#000000]' : ''}`}>Shop</button>
            
            <div className="pb-4 border-b border-gray-100">
              <button onClick={() => handleNavClick('shop', 'all')} className={`text-left w-full flex justify-between items-center mb-6 ${activePage === 'shop' ? 'text-[#000000]' : ''}`}>
                Collections
              </button>
              
              <div className="grid grid-cols-2 gap-y-5 gap-x-4 pl-4 text-[13px] font-bold text-gray-600 capitalize tracking-normal mb-6">
                <button onClick={() => handleNavClick('shop', 'office-essentials')} className="text-left hover:text-[#000000] flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#000000]"></div>Office Essentials</button>
                <button onClick={() => handleNavClick('shop', 'drinkware')} className="text-left hover:text-[#000000] flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#000000]"></div>Drinkware</button>
                <button onClick={() => handleNavClick('shop', 'tech-gifts')} className="text-left hover:text-[#000000] flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#000000]"></div>Tech Gifts</button>
                <button onClick={() => handleNavClick('shop', 'gift-sets')} className="text-left hover:text-[#000000] flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#000000]"></div>Gift Sets</button>
                <button onClick={() => handleNavClick('shop', 'eco-friendly')} className="text-left hover:text-[#000000] flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#000000]"></div>Eco-Friendly</button>
                <button onClick={() => handleNavClick('shop', 'lifestyle')} className="text-left hover:text-[#000000] flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#000000]"></div>Lifestyle</button>
              </div>
              <button onClick={() => handleNavClick('shop', 'all')} className="pl-4 text-[13px] font-bold text-[#000000] flex items-center gap-1.5">
                View All Collections <ArrowRight size={14} />
              </button>
            </div>

            <button onClick={() => handleNavClick('about')} className={`text-left pb-4 border-b border-gray-100 ${activePage === 'about' ? 'text-[#000000]' : ''}`}>About</button>
            <button onClick={() => handleNavClick('solutions')} className={`text-left pb-4 border-b border-gray-100 ${activePage === 'solutions' ? 'text-[#000000]' : ''}`}>In Situ</button>
          </nav>
        </div>
      </div>

      {/* Mobile Bottom Quick Navigation Bar (Visible on sm/md screens) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-[#ECE7E8] py-2 px-4 flex justify-around items-center z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <button onClick={() => handleNavClick('home')} className={`flex flex-col items-center text-[10px] font-bold tracking-wide uppercase ${activePage === 'home' ? 'text-[#000000]' : 'text-gray-500'}`}>
          <Home size={18} strokeWidth={1.5} />
          <span className="mt-1">Home</span>
        </button>
        <button onClick={() => handleNavClick('shop', 'all')} className={`flex flex-col items-center text-[10px] font-bold tracking-wide uppercase ${activePage === 'shop' ? 'text-[#000000]' : 'text-gray-500'}`}>
          <Grid size={18} strokeWidth={1.5} />
          <span className="mt-1">Gifts</span>
        </button>
        <button onClick={onOpenSearch} className="flex flex-col items-center text-[10px] font-bold tracking-wide uppercase text-gray-500">
          <Search size={18} strokeWidth={1.5} />
          <span className="mt-1">Search</span>
        </button>
        <button onClick={onOpenCart} className="flex flex-col items-center text-[10px] font-bold tracking-wide uppercase text-gray-500 relative">
          <ShoppingCart size={18} strokeWidth={1.5} />
          <span className="mt-1">Cart</span>
          <span className="absolute -top-1 right-2 w-3.5 h-3.5 bg-[#000000] text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-white">{cartCount > 0 ? cartCount : 0}</span>
        </button>
      </div>
    </>
  );
}
