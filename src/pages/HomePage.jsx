import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Settings,
  Truck,
  Leaf,
  Heart,
  Gift,
  Package,
  Paintbrush,
  Box,
  MessageCircle,
  ShoppingCart,
  Star,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Shield,
  Bell,
  HelpCircle
} from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import { DotPattern } from '../components/DotPattern';


export default function HomePage({ 
  setActivePage, 
  setSelectedCategory,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlist,
  products
}) {
  const heroImages = [
    '/hero_product_box.png',
    '/collection_hampers_1789017088098.png',
    '/collection_wellness_1789017104422.png',
    '/collection_festive_1789017118649.png',
    '/collection_onboarding_1789017132984.png',
    '/cat_lifestyle_1789015751823.png'
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white">
      {/* SECTION 1 — HERO */}
      <section 
        className="relative -mt-[80px] pt-[90px] pb-8 lg:pt-[180px] lg:pb-32 overflow-hidden border-b border-[#ECE7E8] bg-white lg:bg-gray-50"
      >
        {/* Desktop Background Images */}
        <img 
          src="/hero.png" 
          alt="Corporate Gifts Background" 
          className="absolute inset-0 w-full h-full object-cover object-center hidden lg:block z-0 opacity-40" 
        />

        {/* Mobile Background Dot Pattern */}
        <div className="absolute inset-0 z-0 lg:hidden overflow-hidden pointer-events-none">
          <DotPattern
            glow={true}
            cr={1.5}
            className="text-black/20 [mask-image:radial-gradient(ellipse_at_center,white_40%,transparent_100%)]"
          />
        </div>

        {/* Mobile Layout (Visible only on mobile) */}
        <div className="lg:hidden px-5 relative z-10 w-full pt-6">
          <h1 className="text-[38px] font-extrabold text-black leading-[1.05] tracking-tight mb-4">
            Complete corporate<br />Gifting Solution
          </h1>
          
          <p className="text-[15px] text-gray-500 font-medium leading-[1.4] mb-5 pr-4">
            Thoughtful gifts. Lasting impressions.<br />
            Explore premium corporate gifting<br />
            solutions for every occasion.
          </p>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-1.5">
              <Truck size={15} className="text-slate-700" />
              <span className="text-[12px] font-bold text-slate-700">Pan India Delivery</span>
            </div>
            <div className="w-[1px] h-3.5 bg-slate-300"></div>
            <div className="flex items-center gap-1.5">
              <Star size={15} className="text-slate-700" />
              <span className="text-[12px] font-bold text-slate-700">Trusted by 100+ Businesses</span>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-8">
            <button 
              onClick={() => { setSelectedCategory('all'); setActivePage('shop'); }}
              className="bg-black text-white font-bold text-[14px] px-6 py-3.5 rounded-full flex items-center gap-2"
            >
              Shop Now <ArrowRight size={16} />
            </button>
            <button 
              onClick={() => { setSelectedCategory('all'); setActivePage('shop'); }}
              className="bg-[#FFF4F4] text-[#111] font-bold text-[14px] px-6 py-3.5 rounded-full"
            >
              View Collections
            </button>
          </div>

          <div className="mb-4">
            <img 
              src={heroImages[currentSlide]} 
              alt="Featured Corporate Gift Box" 
              className="w-full h-auto object-contain mix-blend-multiply transition-all duration-500 ease-in-out" 
            />
          </div>

          <div className="flex gap-2.5 overflow-x-auto pb-4 mb-2 no-scrollbar">
            {heroImages.map((src, i) => (
              <div 
                key={i} 
                onClick={() => setCurrentSlide(i)}
                className={`w-[72px] h-[72px] rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center p-1 transition-all cursor-pointer ${currentSlide === i ? 'border-[1.5px] border-black bg-white' : 'bg-[#F5F5F5] border border-transparent'}`}
              >
                <img src={src} className={`w-full h-full object-contain mix-blend-multiply transition-opacity ${currentSlide === i ? 'opacity-100' : 'opacity-70'}`} />
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[13px] font-bold text-gray-400">
              <span className="text-black">{(currentSlide + 1).toString().padStart(2, '0')}</span> / {heroImages.length.toString().padStart(2, '0')}
            </span>
            <div className="h-[2px] flex-1 bg-gray-200">
              <div 
                className="h-full bg-black transition-all duration-500 ease-in-out" 
                style={{ width: `${((currentSlide + 1) / heroImages.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Desktop Layout (Hidden on mobile) */}
        <div className="hidden lg:block container mx-auto px-6 lg:px-12 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            
            {/* Left Content */}
            <div className="space-y-6 lg:pr-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-600">
                C O R P O R A T E &nbsp; G I F T I N G
              </p>

              <h1 className="text-[36px] sm:text-[54px] lg:text-[64px] font-extrabold text-gray-900 leading-[1.1] tracking-tight">
                Complete<br />Corporate<br />Gifting Solution.
              </h1>

              <p className="text-[17px] text-gray-700 font-medium leading-relaxed max-w-md pt-2">
                Thoughtful gifts. Lasting impressions.<br />Explore premium corporate gifting solutions for every occasion.
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button 
                  onClick={() => { setSelectedCategory('all'); setActivePage('shop'); }}
                  className="bg-black text-white font-bold text-[14px] px-8 py-3.5 rounded-full hover:bg-gray-800 transition shadow-lg flex items-center gap-2"
                >
                  Shop Now <ArrowRight size={16} />
                </button>
                <button 
                  onClick={() => { setSelectedCategory('all'); setActivePage('shop'); }}
                  className="bg-white border-2 border-gray-200 text-gray-900 font-bold text-[14px] px-8 py-3.5 rounded-full hover:border-black transition shadow-sm"
                >
                  View Collections
                </button>
              </div>

              {/* Bottom Trust Info */}
              <div className="pt-10 flex items-center gap-6 text-[13px] font-bold text-gray-700">
                <div className="flex items-center gap-2">
                  <Truck size={18} strokeWidth={2} />
                  <span>Pan India Delivery</span>
                </div>
                <div className="w-px h-5 bg-gray-300"></div>
                <div className="flex items-center gap-2">
                  <Star size={18} strokeWidth={2} />
                  <span>Trusted by 100+ Businesses</span>
                </div>
              </div>
            </div>

            {/* Right Form Card */}
            <div className="lg:pl-8 mt-4 lg:mt-0">
              <div className="bg-white rounded-2xl p-6 lg:p-10 shadow-2xl border border-gray-100">
                <h2 className="text-[24px] lg:text-[26px] font-extrabold text-gray-900 leading-tight mb-2">
                  Curate your perfect corporate gift
                </h2>
                <p className="text-[14px] text-gray-600 mb-6">
                  Fill in the details and our team will get in touch with you.
                </p>

                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setActivePage('quote'); }}>
                  <input 
                    type="text" 
                    placeholder="Your full name*" 
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-[14px] focus:outline-none focus:border-black transition"
                  />
                  <input 
                    type="email" 
                    placeholder="Email*" 
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-[14px] focus:outline-none focus:border-black transition"
                  />

                  <div>
                    <label className="block text-[12px] font-bold text-gray-900 mb-1.5">Package Your Looking For</label>
                    <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-[14px] focus:outline-none focus:border-black transition text-gray-500">
                      <option>How may we help you?</option>
                      <option>Employee Onboarding</option>
                      <option>Client Gifting</option>
                      <option>Festive Hampers</option>
                      <option>Custom Request</option>
                    </select>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-black hover:bg-gray-800 text-white font-bold text-[15px] py-4 rounded-lg transition shadow-lg flex items-center justify-center gap-2 mt-2"
                  >
                    Get a Quote <ArrowRight size={18} />
                  </button>

                  <p className="text-center flex justify-center items-center gap-1.5 text-[11px] text-gray-500 pt-3">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                    Your information is secure with us.
                  </p>
                </form>
              </div>

              {/* Client Logos under the form */}
              <div className="mt-6 w-full overflow-hidden relative px-2">
                <div className="flex w-[200%] animate-marquee pause-marquee">
                  {[1, 2].map((group) => (
                    <div key={group} className="flex w-1/2 justify-around items-center">
                      {['TATA', 'RELIANCE', 'AMAZON', 'GOOGLE', 'WIPRO'].map((client, idx) => (
                        <div key={idx} className="mx-2 bg-white shadow-sm border border-gray-100 rounded-full px-6 py-2.5 flex items-center justify-center grayscale hover:grayscale-0 hover:shadow-md transition-all duration-300">
                          <span className="text-[11px] md:text-xs font-black text-gray-800 tracking-widest whitespace-nowrap uppercase">{client}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1.5 — STATS BAR (Desktop only, mobile moved below footer) */}
      <section className="hidden md:block bg-black py-8 lg:py-10 border-b border-gray-800">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center text-center divide-y md:divide-y-0 md:divide-x divide-gray-800 gap-y-6 md:gap-y-0">
            <div className="flex-1 w-full md:w-auto pt-6 md:pt-0">
              <h3 className="text-[24px] md:text-[32px] font-extrabold !text-white leading-none mb-1.5">4,000+</h3>
              <p className="text-[11px] md:text-[13px] text-gray-400 font-medium">pin codes served across India</p>
            </div>
            <div className="flex-1 w-full md:w-auto pt-6 md:pt-0">
              <h3 className="text-[24px] md:text-[32px] font-extrabold !text-white leading-none mb-1.5">₹199</h3>
              <p className="text-[11px] md:text-[13px] text-gray-400 font-medium">starting price per gift</p>
            </div>
            <div className="flex-1 w-full md:w-auto pt-6 md:pt-0">
              <h3 className="text-[24px] md:text-[32px] font-extrabold !text-white leading-none mb-1.5">500+</h3>
              <p className="text-[11px] md:text-[13px] text-gray-400 font-medium">brands trust us</p>
            </div>
            <div className="flex-1 w-full md:w-auto pt-6 md:pt-0 pb-6 md:pb-0">
              <h3 className="text-[24px] md:text-[32px] font-extrabold !text-white leading-none mb-1.5">50,000+</h3>
              <p className="text-[11px] md:text-[13px] text-gray-400 font-medium">gifts shipped to corporates</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1.75 — CLIENT LOGOS */}
      <section className="bg-white py-8 lg:py-16 border-b border-gray-100 overflow-hidden relative">
        <div className="container mx-auto px-4 md:px-6 lg:px-12 relative z-10">
          <h2 className="text-center text-[15px] md:text-[18px] font-bold text-gray-900 mb-6 md:mb-12">
            Trusted by over 500 clients <span className="hidden md:inline px-2">|</span><span className="md:hidden block mt-1"></span> Over 1,00,000 orders fulfilled
          </h2>
          
          <div className="relative max-w-6xl mx-auto">
            {/* Fade effect edges */}
            <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

            <div className="flex overflow-hidden">
              <div className="flex flex-nowrap animate-marquee pause-marquee items-center gap-4 md:gap-5 pr-4 md:pr-5 min-w-max shrink-0">
                {[
                  'ICICI Bank', 'Skechers', 'Glenmark', 'Voltas', 'Adidas', 'SBI', 
                  'JITO', 'OETJ', 'CDSL', 'Cipla', 'TVS', 'MAK Lubricants'
                ].map((client, idx) => (
                  <div 
                    key={idx} 
                    className="bg-white border border-gray-200 rounded-2xl px-4 py-3 md:px-6 md:py-4 flex flex-col items-center justify-center w-[130px] md:w-[160px] h-[70px] md:h-[90px] shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer"
                  >
                    <span className="font-extrabold text-gray-400 group-hover:text-black transition-colors duration-300 text-xs md:text-sm text-center uppercase tracking-wider">{client}</span>
                    <span className="text-[9px] md:text-[10px] text-gray-300 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{client}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-nowrap animate-marquee pause-marquee items-center gap-4 md:gap-5 pr-4 md:pr-5 min-w-max shrink-0" aria-hidden="true">
                {[
                  'ICICI Bank', 'Skechers', 'Glenmark', 'Voltas', 'Adidas', 'SBI', 
                  'JITO', 'OETJ', 'CDSL', 'Cipla', 'TVS', 'MAK Lubricants'
                ].map((client, idx) => (
                  <div 
                    key={idx} 
                    className="bg-white border border-gray-200 rounded-2xl px-4 py-3 md:px-6 md:py-4 flex flex-col items-center justify-center w-[130px] md:w-[160px] h-[70px] md:h-[90px] shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer"
                  >
                    <span className="font-extrabold text-gray-400 group-hover:text-black transition-colors duration-300 text-xs md:text-sm text-center uppercase tracking-wider">{client}</span>
                    <span className="text-[9px] md:text-[10px] text-gray-300 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{client}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1.85 — CURATED HAMPERS */}
      <section 
        className="container mx-auto px-4 md:px-6 lg:px-12 border-b border-gray-200 py-12 lg:py-24"
      >
        <div className="text-center mb-8">
          <p className="text-[10px] md:text-[11px] font-bold tracking-widest text-gray-500 uppercase mb-3">Hamper Solutions</p>
          <h2 className="text-[28px] md:text-[40px] font-extrabold text-black mb-4 leading-tight">Curated Corporate Gifts For Employees</h2>
          <p className="text-[13px] md:text-[15px] text-gray-500 max-w-2xl mx-auto">Every hamper is custom-branded, assembled with care, and delivered fresh across India.</p>
        </div>

        <div className="w-full h-px bg-gray-200 mb-8"></div>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
          <div className="border border-gray-300 rounded-full px-5 py-2.5 text-[12px] md:text-[13px] font-semibold text-gray-700 bg-white shadow-sm">
            Starting ₹199 / unit <span className="mx-2 text-gray-300">•</span> MOQ: 30 units
          </div>
          <button className="bg-black text-white hover:bg-gray-800 transition-colors duration-300 rounded px-8 py-3 text-[13px] font-bold w-full sm:w-auto shadow-md hover:shadow-lg">
            Enquire All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            {
              title: "Desk Essentials",
              desc: "Minimal self-watering plants and planters designed to elevate modern workspaces and desks."
            },
            {
              title: "Festive Gifting",
              desc: "Thoughtfully designed festive hampers that combine greenery, aesthetics, and brand recall."
            },
            {
              title: "Premium Executive Gifts",
              desc: "Sophisticated gifting experiences for leadership teams, partners, and premium clientele."
            },
            {
              title: "Luxury Green Hampers",
              desc: "Plant gifting hampers curated to leave a lasting impression on employees, clients & teams."
            }
          ].map((item, idx) => (
            <div key={idx} className="group relative rounded-2xl overflow-hidden bg-[#111] border border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full">
              {/* Image Container */}
              <div className="relative aspect-[5/4] md:aspect-[4/3] overflow-hidden">
                <img 
                  src="/premium_gift_hamper.png" 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
              </div>
              {/* Text Block */}
              <div className="p-5 flex flex-col flex-grow bg-[#111]">
                <span className="text-[9px] md:text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-2">FEATURED +</span>
                <h3 className="text-white text-[18px] md:text-[20px] font-bold leading-tight mb-2.5">{item.title}</h3>
                <p className="text-gray-400 text-[11px] md:text-[12px] leading-relaxed mb-6 flex-grow">{item.desc}</p>
                <button className="bg-white text-black hover:bg-gray-200 transition-colors text-[11px] md:text-[12px] font-bold py-2 px-5 rounded self-start mt-auto shadow-sm">
                  Enquire Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2 — BENEFITS */}
      <section 
        className="container mx-auto px-4 md:px-6 lg:px-12 border-b border-[#ECE7E8] py-12 lg:py-24"
      >
        <div className="flex flex-wrap justify-center md:justify-between items-start gap-y-6 md:gap-y-0 md:gap-8">
          {[
            { icon: Gift, title: 'Premium Quality', desc: 'Curated products with lasting value' },
            { icon: Settings, title: 'Custom Branding', desc: 'Make it uniquely yours' },
            { icon: Truck, title: 'PAN India Delivery', desc: 'On-time, every time' },
            { icon: Leaf, title: 'Sustainable Options', desc: 'Thoughtful choices for a better tomorrow' },
            { icon: Heart, title: 'Dedicated Support', desc: 'We\'re here to help' }
          ].map((b, i) => {
            const IconComp = b.icon;
            return (
              <div key={i} className="text-center group flex flex-col items-center basis-1/3 md:basis-auto md:flex-1 px-1 md:px-0">
                <div className="w-[52px] h-[52px] md:w-[72px] md:h-[72px] mb-2.5 md:mb-4 rounded-full bg-[#F9F9F9] text-[#000000] flex items-center justify-center transition duration-300 hover:scale-105 mx-auto">
                  <IconComp className="w-[22px] h-[22px] md:w-8 md:h-8" strokeWidth={1.75} />
                </div>
                <h3 className="text-[11px] md:text-[15px] font-bold text-[#111] mb-1 md:mb-1.5 leading-tight">{b.title}</h3>
                <p className="text-[9px] md:text-[13px] text-[#888] font-medium leading-[1.25] md:leading-[1.3] max-w-[100px] md:max-w-[150px] mx-auto">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </section>


      {/* SECTION 4 — EXPLORE BY CATEGORY */}
      <section 
        className="container mx-auto px-6 lg:px-12 py-12 lg:py-24"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-6">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-2">
              E X P L O R E &nbsp; B Y &nbsp; C A T E G O R Y
            </p>
            <h2 className="text-[32px] md:text-[40px] font-extrabold text-gray-900 leading-tight">Gifts for every occasion</h2>
          </div>
          <button 
            onClick={() => { setSelectedCategory('all'); setActivePage('shop'); }}
            aria-label="View all corporate gifting categories"
            className="bg-[#000000] hover:bg-[#111111] text-white px-6 py-2.5 rounded-full font-bold text-[13px] md:text-[14px] flex items-center gap-2 transition shadow-[0_4px_12px_rgba(0,0,0,0.2)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.3)] hover:-translate-y-0.5"
          >
            View All Collections <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            { id: 'office-essentials', name: 'Office Essentials', image: '/cat_office_1789015697247.png' },
            { id: 'drinkware', name: 'Drinkware', image: '/cat_drinkware_1789015713218.png' },
            { id: 'tech-gifts', name: 'Tech Gifts', image: '/cat_tech_1789015727273.png' },
            { id: 'lifestyle', name: 'Lifestyle', image: '/cat_lifestyle_1789015751823.png' },
            { id: 'gift-sets', name: 'Gift Sets', image: '/cat_giftsets_1789015768693.png' },
            { id: 'eco-friendly', name: 'Eco-Friendly', image: '/cat_eco_1789015784200.png' }
          ].map(cat => (
            <div 
              key={cat.id}
              onClick={() => { setSelectedCategory(cat.id); setActivePage('shop'); }}
              className="group cursor-pointer flex flex-col items-center"
            >
              <div className="w-full aspect-square rounded-[20px] overflow-hidden bg-gradient-to-b from-[#F9F9F9] to-[#EEEEEE] mb-4 flex items-center justify-center p-0 transition-all duration-300 group-hover:shadow-[0_12px_24px_rgba(0,0,0,0.15)] relative">
                {/* Decorative sparkles top-left */}
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-4 left-4 opacity-90 z-20">
                  <path d="M10 2L12 8L18 10L12 12L10 18L8 12L2 10L8 8L10 2Z" fill="white"/>
                  <path d="M26 4L27 7L30 8L27 9L26 12L25 9L22 8L25 7L26 4Z" fill="white"/>
                  <path d="M6 24L7.5 28.5L12 30L7.5 31.5L6 36L4.5 31.5L0 30L4.5 28.5L6 24Z" fill="white"/>
                </svg>
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-[90%] h-[90%] object-cover group-hover:scale-105 transition duration-500 relative z-10 mix-blend-multiply"
                />
              </div>
              <h3 className="text-[15px] font-bold text-gray-900 group-hover:text-[#000000] transition text-center mb-1">{cat.name}</h3>
              <p className="text-[12px] font-medium text-[#000000] flex items-center gap-1">
                View Collection <ArrowRight size={12} />
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4.5 — FEATURED PRODUCTS */}
      <section 
        className="container mx-auto px-6 lg:px-12 pb-12 lg:pb-24"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-6">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-2">
              T R E N D I N G &nbsp; N O W
            </p>
            <h2 className="text-[32px] md:text-[40px] font-extrabold text-gray-900 leading-tight">Featured Products</h2>
          </div>
          <button 
            onClick={() => { setSelectedCategory('all'); setActivePage('shop'); }}
            aria-label="View more products"
            className="bg-[#000000] hover:bg-[#111111] text-white px-6 py-2.5 rounded-full font-bold text-[13px] md:text-[14px] flex items-center gap-2 transition shadow-[0_4px_12px_rgba(0,0,0,0.2)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.3)] hover:-translate-y-0.5"
          >
            View More Collection <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 gap-y-8 sm:gap-y-10">
          {products.slice(0, 8).map((product) => (
            <ProductCard 
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlist.some(item => item.id === product.id)}
            />
          ))}
        </div>

        {/* Bottom View All Button (especially useful for mobile) */}
        <div className="mt-10 sm:mt-12 flex justify-center">
          <button 
            onClick={() => { setSelectedCategory('all'); setActivePage('shop'); }}
            aria-label="View more products"
            className="bg-white border-2 border-[#000000] text-[#000000] hover:bg-[#000000] hover:text-white px-8 py-3 rounded-full font-bold text-[14px] flex items-center gap-2 transition shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.25)] hover:-translate-y-0.5"
          >
            View All Collections <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* SECTION 5 — WHY COREKRAFT */}
      <section 
        className="container mx-auto px-6 lg:px-12 py-12 lg:py-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-24 items-center">
          
          {/* Left Pink Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#000000] rounded-[32px] p-8 lg:p-12 relative overflow-hidden shadow-2xl h-[450px] lg:h-[550px] flex flex-col justify-between group">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at center, white 3px, transparent 3px)', backgroundSize: '40px 40px' }}></div>
              <p className="text-3xl lg:text-4xl font-extrabold text-white leading-[1.1] z-10 max-w-[250px] m-0">
                Thoughtful <br />Gifts for <br />Brighter <br />Partnerships
              </p>
              
              <div className="absolute -bottom-8 -right-8 w-[120%] z-10 group-hover:scale-105 transition duration-700 origin-bottom-right">
                <img 
                  src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=800&q=80" 
                  alt="Corekraft premium customized corporate gift box hamper" 
                  className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
                />
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-7 grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Center Text Column */}
            <div className="space-y-6 lg:pr-8">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">
                  W H Y &nbsp; C O R E K R A F T
                </p>
                <h2 className="text-[32px] lg:text-[40px] font-extrabold text-gray-900 leading-[1.1]">
                  More than gifts. <br />A stronger brand.
                </h2>
              </div>
              <p className="text-[15px] text-gray-600 leading-relaxed">
                At Corekraft, we help businesses create meaningful connections through high-quality, customizable corporate gifts. From employee appreciation to client engagement, our solutions are designed to represent your brand with purpose and style.
              </p>
              <div className="pt-2">
                <button 
                  onClick={() => setActivePage('about')}
                  aria-label="Know more about Corekraft corporate gifting"
                  className="bg-[#000000] hover:bg-[#111111] text-white px-8 py-3 rounded-full font-bold text-[13px] md:text-[14px] flex items-center gap-2 transition shadow-[0_4px_12px_rgba(0,0,0,0.2)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.3)] hover:-translate-y-0.5"
                >
                  Know More <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Right Features List */}
            <div className="space-y-10 flex flex-col justify-center mt-12 lg:mt-0 pl-0 lg:pl-4">
              {[
                { icon: Package, title: 'Wide Product Range', desc: 'Something for every need' },
                { icon: Paintbrush, title: 'Easy Customization', desc: 'Logos, packaging & more' },
                { icon: Box, title: 'Bulk Orders Made Simple', desc: 'Hassle-free process' },
                { icon: MessageCircle, title: 'Dedicated Support', desc: "We're here to help" }
              ].map((feat, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#F5F5F5] text-[#000000] flex items-center justify-center flex-shrink-0 mt-1">
                    <feat.icon size={22} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-[14px] font-bold text-gray-900 mb-0.5">{feat.title}</h3>
                    <p className="text-[12px] text-gray-500">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — CUSTOM GIFT SETS BANNER */}
      <section 
        className="container mx-auto px-6 lg:px-12 py-12 lg:py-24"
      >
        <div className="gradient-banner rounded-[32px] px-6 py-8 lg:px-16 lg:py-16 shadow-[0_20px_40px_rgba(0,0,0,0.15)] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-12">
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, white 3px, transparent 3px)', backgroundSize: '40px 40px' }}></div>
          
          <div className="relative z-10 text-center md:text-left flex flex-col justify-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/90 mb-3">
              C R E A T E &nbsp; A &nbsp; L A S T I N G &nbsp; I M P R E S S I O N
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-[36px] font-extrabold text-white leading-tight mb-2">
              Looking for a custom gifting solution?
            </h2>
            <p className="text-white/90 text-[15px]">
              Let's create something special for your team or clients.
            </p>
          </div>

          <div className="relative z-10 flex-shrink-0 flex items-center">
            <button 
              onClick={() => setActivePage('quote')}
              aria-label="Get a custom corporate gifting quote"
              className="bg-white hover:bg-gray-50 text-[#000000] font-bold text-[15px] px-8 py-3.5 rounded-full shadow-xl transition-transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              Get a Quote <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 7 — MORE COLLECTIONS */}
      <section className="container mx-auto px-6 lg:px-12 pb-12 lg:pb-24">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 lg:mb-10 gap-4">
          <div>
            <h2 className="text-[28px] md:text-[32px] font-extrabold text-gray-900 leading-tight mb-2">More Collections</h2>
            <p className="text-[14px] text-gray-500 font-medium">Discover more thoughtful gifting options for every need.</p>
          </div>
          <button 
            onClick={() => { setSelectedCategory('all'); setActivePage('shop'); }}
            aria-label="View all corporate gifting collections"
            className="text-[14px] font-semibold text-[#000000] hover:text-[#111111] flex items-center gap-1.5 transition group pb-0.5 border-b-[1.5px] border-[#000000]"
          >
            View All Collections <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Premium Hampers', desc: 'Curated luxury gift hampers', image: '/collection_hampers_1789017088098.png' },
            { title: 'Wellness & Self Care', desc: 'Relax. Rejuvenate. Recharge.', image: '/collection_wellness_1789017104422.png' },
            { title: 'Festive Specials', desc: 'Celebrate with thoughtfulness', image: '/collection_festive_1789017118649.png' },
            { title: 'Onboarding Kits', desc: 'Welcoming talent with care', image: '/collection_onboarding_1789017132984.png' }
          ].map((col, idx) => (
            <div key={idx} className="group cursor-pointer" onClick={() => { setSelectedCategory('all'); setActivePage('shop'); }}>
              <div className="w-full aspect-[4/3] rounded-[20px] overflow-hidden bg-gradient-to-b from-[#F9F9F9] to-[#EEEEEE] mb-4 relative">
                <img 
                  src={col.image} 
                  alt={col.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500 mix-blend-multiply" 
                />
              </div>
              <h3 className="text-[16px] font-bold text-gray-900 group-hover:text-[#000000] transition mb-1">{col.title}</h3>
              <p className="text-[13px] text-gray-500 font-medium">{col.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 8 — PAN-INDIA DELIVERY */}
      <section className="bg-[#F9F9F9] py-12 lg:py-24 overflow-hidden relative">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-center">
            
            {/* Left Column (Text & Cards) */}
            <div className="flex-1 max-w-2xl">
              <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-[#000000] mb-3">PAN-INDIA DELIVERY</p>
              <h2 className="text-[32px] md:text-[44px] font-extrabold text-black leading-[1.1] mb-6">
                We Deliver Corporate Gifts for Employees wherever Your Team Is
              </h2>
              <div className="flex flex-wrap items-center gap-2 text-[12px] md:text-[13px] text-gray-600 mb-8 font-medium">
                <span>4,000+ pin codes covered</span>
                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                <span>Gifts arrive fresh within 7 days</span>
                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                <span>Damage-free guarantee</span>
              </div>
              
              {/* 2x2 Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {/* Card 1 */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                   <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-4">
                      <div className="bg-gray-50 p-2 rounded-full"><MapPin size={20} className="text-gray-700" /></div>
                      <div>
                         <h4 className="font-extrabold text-[22px] text-black leading-none">4,000+</h4>
                         <p className="text-[11px] text-gray-500 mt-1">Pin Codes Covered</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-2 text-[11px] font-medium text-gray-500">
                      <CheckCircle2 size={12} className="text-[#000000]" /> Verified across India
                   </div>
                </div>
                {/* Card 2 */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                   <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-4">
                      <div className="bg-gray-50 p-2 rounded-full"><Truck size={20} className="text-gray-700" /></div>
                      <div>
                         <h4 className="font-extrabold text-[22px] text-black leading-none">7 Days</h4>
                         <p className="text-[11px] text-gray-500 mt-1">Avg. Delivery Time</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-2 text-[11px] font-medium text-gray-500">
                      <CheckCircle2 size={12} className="text-[#000000]" /> Verified across India
                   </div>
                </div>
                {/* Card 3 */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                   <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-4">
                      <div className="bg-gray-50 p-2 rounded-full"><Box size={20} className="text-gray-700" /></div>
                      <div>
                         <h4 className="font-extrabold text-[22px] text-black leading-none">10 Days</h4>
                         <p className="text-[11px] text-gray-500 mt-1">Freshness Guarantee</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-2 text-[11px] font-medium text-gray-500">
                      <CheckCircle2 size={12} className="text-[#000000]" /> Verified across India
                   </div>
                </div>
                {/* Card 4 */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                   <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-4">
                      <div className="bg-gray-50 p-2 rounded-full"><ShieldCheck size={20} className="text-gray-700" /></div>
                      <div>
                         <h4 className="font-extrabold text-[22px] text-black leading-none">100%</h4>
                         <p className="text-[11px] text-gray-500 mt-1">Damage-Free Guarantee</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-2 text-[11px] font-medium text-gray-500">
                      <CheckCircle2 size={12} className="text-[#000000]" /> Verified across India
                   </div>
                </div>
              </div>

              {/* Bottom Banner */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-wrap justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                   <Shield size={16} className="text-[#000000]" />
                   <div>
                     <p className="text-[10px] font-bold text-black leading-tight">Gifts arrive intact</p>
                     <p className="text-[9px] text-gray-500">Carefully packed at source</p>
                   </div>
                </div>
                <div className="flex items-center gap-2">
                   <Package size={16} className="text-[#000000]" />
                   <div>
                     <p className="text-[10px] font-bold text-black leading-tight">Secure packaging</p>
                     <p className="text-[9px] text-gray-500">Specially designed for transit</p>
                   </div>
                </div>
                <div className="flex items-center gap-2">
                   <CheckCircle2 size={16} className="text-[#000000]" />
                   <div>
                     <p className="text-[10px] font-bold text-black leading-tight">Safe & reliable</p>
                     <p className="text-[9px] text-gray-500">Handled with complete care</p>
                   </div>
                </div>
                <div className="flex items-center gap-2">
                   <Bell size={16} className="text-[#000000]" />
                   <div>
                     <p className="text-[10px] font-bold text-black leading-tight">Hassle-free delivery</p>
                     <p className="text-[9px] text-gray-500">Right to your doorstep</p>
                   </div>
                </div>
              </div>

            </div>

            {/* Right Column (Map) */}
            <div className="flex-1 w-full relative min-h-[400px] lg:min-h-[500px] flex items-center justify-center">
              <img src="/india_map.png" alt="Pan-India Delivery Network" className="w-full max-w-lg object-contain opacity-80 mix-blend-multiply" />
              
              {/* Widget overlay - bottom right */}
              <div className="absolute bottom-4 right-0 lg:right-4 rounded-xl bg-white text-black p-4 flex items-center gap-4 shadow-[0_8px_20px_rgba(0,0,0,0.1)] border border-gray-100 max-w-[280px]">
                 <div className="bg-[#111] p-3 rounded-lg flex-shrink-0">
                    <HelpCircle size={24} className="text-white" />
                 </div>
                 <div>
                   <h4 className="font-extrabold text-[13px] leading-tight mb-1">Still Scrolling,<br/>Still Confused?</h4>
                   <button className="text-[10px] text-gray-600 font-bold hover:text-black transition-colors underline">
                     Take the Quiz
                   </button>
                 </div>
              </div>

            </div>
            
          </div>
        </div>

      </section>

      {/* SECTION 9 — CUSTOM BRANDING */}
      <section className="container mx-auto px-6 lg:px-12 py-12 lg:py-24 border-t border-gray-100">
        <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-16 bg-gray-50 rounded-[32px] p-8 lg:p-12">
          {/* Left Content */}
          <div className="flex-1">
            <h2 className="text-[32px] lg:text-[40px] font-extrabold text-gray-900 leading-[1.1] mb-4">
              Make it Yours
            </h2>
            <p className="text-[14px] text-gray-600 leading-relaxed mb-8">
              Turn everyday gifts into powerful brand experiences. We offer custom branding solutions to showcase your logo with style and impact.
            </p>
            <button 
              onClick={() => setActivePage('custom')}
              aria-label="Explore Custom Branding Options"
              className="bg-[#000000] hover:bg-[#111111] text-white font-bold text-[14px] px-8 py-3.5 rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.25)] hover:shadow-[0_10px_24px_rgba(0,0,0,0.35)] hover:-translate-y-0.5 transition flex items-center gap-2 w-max"
            >
              Explore Branding <ArrowRight size={16} />
            </button>
          </div>

          {/* Right Image */}
          <div className="flex-1 w-full relative min-h-[250px] md:min-h-[400px] rounded-2xl overflow-hidden">
            <img 
              src="/custom_branding_1789017149739.png" 
              alt="Custom branding examples with your logo" 
              className="absolute inset-0 w-full h-full object-cover md:object-center mix-blend-multiply" 
            />
          </div>
        </div>
      </section>
    </div>
  );
}
