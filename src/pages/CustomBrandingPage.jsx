import React from 'react';
import { Sparkles, Layers, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import BrandingPreviewer from '../components/BrandingPreviewer';

export default function CustomBrandingPage({ onNavigateShop, onNavigateQuote }) {
  const brandingTechniques = [
    { name: 'Laser Engraving', desc: 'Precision metallic etching for stainless steel bottles, pens, and metal badges.', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80' },
    { name: 'Deep Embossing / Debossing', desc: 'Elegant recessed impression on leather journals, portfolios, and gift boxes.', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80' },
    { name: 'UV Digital Full-Color Printing', desc: 'Vibrant Pantone color matching for tech gadgets, chargers, and power banks.', image: 'https://images.unsplash.com/photo-1593121925328-369ec8459c08?auto=format&fit=crop&w=600&q=80' },
    { name: 'Metallic Foil Stamping', desc: 'Reflective gold and silver foil stamping for rigid luxury gift hamper boxes.', image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=600&q=80' },
    { name: 'Custom Packaging & Sleeves', desc: 'Bespoke box sleeves, ribbons, and branded tissue wrapping paper.', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80' },
    { name: 'Personalized Message Cards', desc: 'Custom printed employee appreciation cards with individual name insertion.', image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=600&q=80' }
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl space-y-16">
      {/* Hero */}
      <div className="gradient-hero rounded-3xl p-8 lg:p-16 border border-[#ECE7E8] text-center relative overflow-hidden">
        <div className="geometric-pattern"></div>
        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <span className="badge-label">BRANDING STUDIO</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
            Make Every Gift <br />
            <span className="text-[#EE3364]">Uniquely Yours.</span>
          </h1>
          <p className="text-gray-600 text-sm">
            Elevate your corporate identity with precision laser engraving, deep leather debossing, and custom luxury gift box packaging.
          </p>
          <div className="pt-2">
            <button onClick={onNavigateQuote} className="btn btn-primary btn-lg shadow-lg">
              Start Customizing <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Studio Preview Canvas */}
      <section className="space-y-4">
        <div className="text-center max-w-xl mx-auto mb-6">
          <span className="badge-label mb-2">INTERACTIVE TOOL</span>
          <h2 className="text-3xl font-extrabold text-gray-900">Try Live Logo Preview</h2>
        </div>
        <BrandingPreviewer />
      </section>

      {/* Branding Techniques Grid */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <span className="badge-label mb-2">CRAFTSMANSHIP</span>
          <h2 className="text-3xl font-extrabold text-gray-900">Our Branding Techniques</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brandingTechniques.map((tech, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-[#ECE7E8] overflow-hidden hover:shadow-xl transition group">
              <div className="aspect-video bg-gray-100 overflow-hidden">
                <img src={tech.image} alt={tech.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-5 space-y-2">
                <h4 className="text-lg font-bold text-gray-900 group-hover:text-[#EE3364] transition">{tech.name}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{tech.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
