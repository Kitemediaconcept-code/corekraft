import React from 'react';
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
  Star
} from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function HomePage({ 
  setActivePage, 
  setSelectedCategory,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlist,
  products
}) {
  return (
    <div className="bg-white">
      {/* SECTION 1 — HERO */}
      <section 
        className="relative -mt-[80px] pt-[140px] pb-20 lg:pt-[180px] lg:pb-32 overflow-hidden bg-cover bg-center border-b border-[#ECE7E8]"
        style={{ backgroundImage: "url('/hero.png')" }}
      >
        <div className="container mx-auto px-6 lg:px-12 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                C O R P O R A T E &nbsp; G I F T I N G
              </p>

              <h1 className="text-[40px] sm:text-[50px] lg:text-[60px] font-extrabold text-[#111] leading-[1.05] tracking-tight">
                Complete Corporate <br />
                Gifting Solution
              </h1>

              <p className="text-[17px] text-[#333] font-medium leading-relaxed max-w-md pt-2">
                Thoughtful gifts. Lasting impressions.<br />Explore premium corporate gifting solutions for every occasion.
              </p>

              <div className="pt-4">
                <button 
                  onClick={() => { setSelectedCategory('all'); setActivePage('shop'); }}
                  aria-label="Shop our corporate gifts now"
                  className="glass-card glass-card-overflow rounded-full font-bold text-[#EE3364] hover:bg-white/60 transition-colors text-[14px] px-8 py-3.5 flex items-center gap-2 shadow-sm"
                >
                  Shop Now <ArrowRight size={16} />
                </button>
              </div>

              {/* Social Proof Avatars */}
              <div className="pt-8 flex items-center gap-4">
                <div className="flex -space-x-3">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" alt="Corekraft satisfied corporate client avatar 1" className="w-10 h-10 rounded-full border-[3px] border-white object-cover shadow-sm" />
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" alt="Corekraft satisfied corporate client avatar 2" className="w-10 h-10 rounded-full border-[3px] border-white object-cover shadow-sm" />
                  <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80" alt="Corekraft satisfied corporate client avatar 3" className="w-10 h-10 rounded-full border-[3px] border-white object-cover shadow-sm" />
                </div>
                <p className="text-[12px] font-semibold text-gray-600">Trusted by 500+ Businesses</p>
              </div>
            </div>

            {/* Right side is intentionally empty to let the background image shine through */}
            <div className="lg:col-span-7 relative h-full min-h-[400px] hidden lg:block">
              {/* Handwritten Tag */}
              <div className="absolute top-12 right-12 transform rotate-[-8deg] z-10 drop-shadow-xl">
                <span className="font-['Caveat'] text-[40px] text-white font-bold leading-tight drop-shadow-[0_4px_4px_rgba(0,0,0,0.15)] block">
                  Gifts that Work <br />for Your Brand!
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — BENEFITS */}
      <section 
        className="container mx-auto px-6 lg:px-12 border-b border-[#ECE7E8]"
        style={{ paddingTop: '30px', paddingBottom: '90px' }}
      >
        <div className="flex flex-wrap justify-between items-start gap-8">
          {[
            { icon: Gift, title: 'Premium Quality', desc: 'Curated products with lasting value' },
            { icon: Settings, title: 'Custom Branding', desc: 'Make it uniquely yours' },
            { icon: Truck, title: 'PAN India Delivery', desc: 'On-time, every time' },
            { icon: Leaf, title: 'Sustainable Options', desc: 'Thoughtful choices for a better tomorrow' },
            { icon: Heart, title: 'Dedicated Support', desc: 'We\'re here to help' }
          ].map((b, i) => {
            const IconComp = b.icon;
            return (
              <div key={i} className="text-center group flex flex-col items-center flex-1 min-w-[140px]">
                <div className="w-[72px] h-[72px] mb-4 rounded-full bg-[#FFF0F4] text-[#EE3364] flex items-center justify-center transition duration-300 hover:scale-105">
                  <IconComp size={32} strokeWidth={1.75} />
                </div>
                <h3 className="text-[15px] font-bold text-[#111] mb-1.5">{b.title}</h3>
                <p className="text-[13px] text-[#888] font-medium leading-[1.3] max-w-[150px]">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </section>


      {/* SECTION 4 — EXPLORE BY CATEGORY */}
      <section 
        className="container mx-auto px-6 lg:px-12"
        style={{ paddingTop: '90px', paddingBottom: '120px' }}
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
            className="text-[15px] font-semibold text-[#EE3364] hover:text-[#D92756] flex items-center gap-1.5 transition group pb-0.5 border-b-[1.5px] border-[#EE3364]"
          >
            View All Collections <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
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
              <div className="w-full aspect-square rounded-[20px] overflow-hidden bg-gradient-to-b from-[#FFF0F4] to-[#FADBE3] mb-4 flex items-center justify-center p-0 transition-all duration-300 group-hover:shadow-[0_12px_24px_rgba(238,51,100,0.15)] relative">
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
              <h3 className="text-[15px] font-bold text-gray-900 group-hover:text-[#EE3364] transition text-center mb-1">{cat.name}</h3>
              <p className="text-[12px] font-medium text-[#EE3364] flex items-center gap-1">
                View Collection <ArrowRight size={12} />
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5 — WHY COREKRAFT */}
      <section 
        className="container mx-auto px-6 lg:px-12"
        style={{ paddingTop: '80px', paddingBottom: '100px' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Pink Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#EE3364] rounded-[32px] p-8 lg:p-12 relative overflow-hidden shadow-2xl h-[450px] lg:h-[550px] flex flex-col justify-between group">
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
                  className="btn-glass rounded-full font-bold text-[13px] px-7 py-3 flex items-center gap-2"
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
                  <div className="w-12 h-12 rounded-full bg-[#FFF3F6] text-[#EE3364] flex items-center justify-center flex-shrink-0 mt-1">
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
        className="container mx-auto px-6 lg:px-12"
        style={{ paddingTop: '80px', paddingBottom: '120px' }}
      >
        <div className="gradient-banner rounded-[32px] px-10 py-12 lg:px-16 lg:py-16 shadow-[0_20px_40px_rgba(238,51,100,0.15)] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">
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
              className="bg-white hover:bg-gray-50 text-[#EE3364] font-bold text-[15px] px-8 py-3.5 rounded-full shadow-xl transition-transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              Get a Quote <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
