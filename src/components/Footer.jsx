import React, { useState } from 'react';
import { Linkedin, Instagram, Facebook, Youtube, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Footer({ setActivePage, setSelectedCategory }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-white border-t border-[#ECE7E8] pt-16 pb-24 lg:pb-12 text-gray-700">
      <div className="container mx-auto px-4">
        {/* Main 4-Column Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#ECE7E8]">
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4">
            <img src="/logo.png" alt="Corekraft Logo" className="h-10 object-contain" />
            <p className="text-sm text-gray-600 leading-relaxed">
              Thoughtful corporate gifting solutions to help your brand make a lasting impression.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-gray-100 hover:bg-[#FFF3F6] text-gray-600 hover:text-[#EE3364] flex items-center justify-center transition" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-100 hover:bg-[#FFF3F6] text-gray-600 hover:text-[#EE3364] flex items-center justify-center transition" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-100 hover:bg-[#FFF3F6] text-gray-600 hover:text-[#EE3364] flex items-center justify-center transition" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-100 hover:bg-[#FFF3F6] text-gray-600 hover:text-[#EE3364] flex items-center justify-center transition" aria-label="YouTube">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-base font-bold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => setActivePage('home')} className="hover:text-[#EE3364] transition">Home</button>
              </li>
              <li>
                <button onClick={() => setActivePage('about')} className="hover:text-[#EE3364] transition">About Us</button>
              </li>
              <li>
                <button onClick={() => { setSelectedCategory('all'); setActivePage('shop'); }} className="hover:text-[#EE3364] transition">Gifts</button>
              </li>
              <li>
                <button onClick={() => setActivePage('solutions')} className="hover:text-[#EE3364] transition">Corporate Solutions</button>
              </li>
              <li>
                <button onClick={() => setActivePage('contact')} className="hover:text-[#EE3364] transition">Contact Us</button>
              </li>
            </ul>
          </div>

          {/* Column 3: Help */}
          <div>
            <h4 className="text-base font-bold text-gray-900 mb-4">Help</h4>
            <ul className="space-y-2.5 text-sm text-gray-600">
              <li><button onClick={() => setActivePage('contact')} className="hover:text-[#EE3364] transition">FAQs</button></li>
              <li><button onClick={() => setActivePage('contact')} className="hover:text-[#EE3364] transition">Shipping & Delivery</button></li>
              <li><button onClick={() => setActivePage('contact')} className="hover:text-[#EE3364] transition">Returns & Refunds</button></li>
              <li><button onClick={() => setActivePage('contact')} className="hover:text-[#EE3364] transition">Terms & Conditions</button></li>
              <li><button onClick={() => setActivePage('contact')} className="hover:text-[#EE3364] transition">Privacy Policy</button></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-base font-bold text-gray-900 mb-2">Subscribe to our newsletter</h4>
            <p className="text-xs text-gray-500 mb-4">
              Get the latest updates on new collections and exclusive offers.
            </p>
            
            {subscribed ? (
              <div className="bg-[#FFF3F6] text-[#EE3364] text-xs font-semibold p-3 rounded-xl flex items-center gap-2 animate-fade-in">
                <CheckCircle2 size={16} /> Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="relative flex items-center">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email" 
                  required
                  className="w-full bg-[#F5F5F7] border border-[#ECE7E8] text-sm py-2.5 pl-4 pr-12 rounded-full outline-none focus:border-[#EE3364] transition"
                />
                <button 
                  type="submit" 
                  aria-label="Subscribe to newsletter"
                  className="absolute right-1 w-8 h-8 rounded-full bg-[#EE3364] text-white flex items-center justify-center hover:bg-[#D92756] transition"
                >
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© 2026 Corekraft. All rights reserved.</p>
          <p className="font-semibold text-gray-700">Thoughtful Gifting. Stronger Relationships.</p>
          <button
            onClick={() => setActivePage('admin')}
            className="text-gray-300 hover:text-gray-500 transition-colors text-[10px] tracking-widest"
            title="Admin"
          >
            ••••
          </button>
        </div>
      </div>
    </footer>
  );
}
