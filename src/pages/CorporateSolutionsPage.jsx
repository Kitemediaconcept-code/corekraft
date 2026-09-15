import React from 'react';
import { Users, Briefcase, Sparkles, Building, Crown, Trophy, Calendar, UserPlus, ArrowRight } from 'lucide-react';

export default function CorporateSolutionsPage({ onNavigateQuote }) {
  const solutions = [
    { title: 'Employee Onboarding Kits', desc: 'Welcome new hires on Day 1 with branded joining kits including notebooks, bottles, power banks, and desk tech.', icon: UserPlus, image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80' },
    { title: 'Employee Appreciation', desc: 'Recognize work anniversaries, quarterly achievements, and birthday milestones with premium gift hampers.', icon: Users, image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80' },
    { title: 'Client Gifting & Retention', desc: 'Strengthen high-value client relationships with executive leather notebook sets and customized luxury hampers.', icon: Briefcase, image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80' },
    { title: 'Festive & Diwali Gifting', desc: 'Celebrate Diwali, New Year, and festivals with artisan dry fruit hampers, brass lamps, and tech combos.', icon: Sparkles, image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=600&q=80' },
    { title: 'Corporate Events & Swag', desc: 'High-impact conference kits, lanyard sets, tote bags, and branded merch for annual corporate summits.', icon: Calendar, image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80' },
    { title: 'Rewards & Recognition', desc: 'Custom metal trophies, plaque awards, and high-end tech reward kits for top sales performers.', icon: Trophy, image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=600&q=80' },
    { title: 'Conference Kits', desc: 'Sleek document sleeves, pens, badges, and wireless presentation chargers designed for summits.', icon: Building, image: 'https://images.unsplash.com/photo-1593121925328-369ec8459c08?auto=format&fit=crop&w=600&q=80' },
    { title: 'Leadership & C-Suite Gifts', desc: 'Bespoke luxury leather goods, Montblanc-style pens, and personalized premium executive boxes.', icon: Crown, image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80' }
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl space-y-12">
      <div className="gradient-hero rounded-3xl p-8 lg:p-14 border border-[#ECE7E8] text-center relative overflow-hidden">
        <div className="geometric-pattern"></div>
        <div className="relative z-10 max-w-2xl mx-auto space-y-3">
          <span className="badge-label">ENTERPRISE SOLUTIONS</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
            Corporate Gifting Solutions
          </h1>
          <p className="text-gray-600 text-sm">
            End-to-end corporate gifting programs tailored for companies of all sizes.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {solutions.map((sol, idx) => {
          const IconComp = sol.icon;
          return (
            <div key={idx} className="bg-white rounded-2xl border border-[#ECE7E8] overflow-hidden hover:border-[#E5E5E5] hover:shadow-xl transition flex flex-col justify-between group">
              <div>
                <div className="aspect-video bg-gray-100 overflow-hidden relative">
                  <img src={sol.image} alt={sol.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 text-[#000000] flex items-center justify-center shadow-md">
                    <IconComp size={18} />
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <h4 className="text-base font-bold text-gray-900 group-hover:text-[#000000] transition">{sol.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{sol.desc}</p>
                </div>
              </div>
              <div className="p-5 pt-0">
                <button 
                  onClick={onNavigateQuote}
                  className="w-full bg-[#F5F5F5] hover:bg-[#000000] text-[#000000] hover:text-white text-xs font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-1"
                >
                  Get Solution Quote <ArrowRight size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
