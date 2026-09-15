import React from 'react';
import { Award, Leaf, ShieldCheck, HeartHandshake, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AboutPage({ onNavigateShop, onNavigateQuote }) {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl space-y-16">
      {/* Hero */}
      <div className="gradient-hero rounded-3xl p-8 lg:p-16 border border-[#ECE7E8] text-center relative overflow-hidden">
        <div className="geometric-pattern"></div>
        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <span className="badge-label">ABOUT COREKRAFT</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
            Thoughtful Gifting. <br />
            <span className="text-[#000000]">Stronger Relationships.</span>
          </h1>
          <p className="text-gray-600 text-sm">
            Corekraft was founded with a single mission: to replace generic corporate swag with meaningful, high-utility business gifts that make employees proud and clients valued.
          </p>
        </div>
      </div>

      {/* Story & Mission Split */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <span className="badge-label">OUR STORY & MISSION</span>
          <h2 className="text-3xl font-extrabold text-gray-900 leading-tight">
            Redefining corporate gifts with purpose & elegance.
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            At Corekraft, we believe every corporate gift is a tangible representation of your brand values. Whether welcoming a new team member, celebrating years of dedication, or thanking a strategic business partner, our curated catalog ensures every gesture leaves a lasting impression.
          </p>
          <div className="space-y-3">
            {[
              'Premium quality products with functional daily utility',
              'Eco-conscious sustainable materials and ethical sourcing',
              'End-to-end PAN India doorstep delivery and tracking',
              'Free vector digital proofs and sample boxes'
            ].map((point, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs font-bold text-gray-800">
                <CheckCircle2 size={16} className="text-[#000000]" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80" 
            alt="Corekraft Team" 
            className="rounded-3xl shadow-xl border border-[#ECE7E8] object-cover w-full h-[400px]"
          />
        </div>
      </section>

      {/* Sustainability & Quality Promise */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-3xl border border-[#ECE7E8] shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#F5F5F5] text-[#000000] flex items-center justify-center">
            <Leaf size={24} />
          </div>
          <h4 className="text-lg font-bold text-gray-900">Sustainability Commitment</h4>
          <p className="text-xs text-gray-500 leading-relaxed">
            We prioritize FSC-certified recycled paper, natural bamboo, food-grade stainless steel, and zero-plastic bio-packaging options.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-[#ECE7E8] shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#F5F5F5] text-[#000000] flex items-center justify-center">
            <ShieldCheck size={24} />
          </div>
          <h4 className="text-lg font-bold text-gray-900">Quality Guarantee</h4>
          <p className="text-xs text-gray-500 leading-relaxed">
            Every batch undergoes strict 3-stage quality checks—from raw item inspection to precision laser logo verification and transit box durability.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-[#ECE7E8] shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#F5F5F5] text-[#000000] flex items-center justify-center">
            <HeartHandshake size={24} />
          </div>
          <h4 className="text-lg font-bold text-gray-900">PAN India Logistics</h4>
          <p className="text-xs text-gray-500 leading-relaxed">
            Our nationwide logistics network delivers on time to individual remote employee homes or bulk office warehouses across 19,000+ pincodes.
          </p>
        </div>
      </section>

      {/* CTA */}
      <div className="gradient-banner rounded-3xl p-10 text-center text-white space-y-4">
        <h2 className="text-3xl font-extrabold">Ready to elevate your corporate gifting?</h2>
        <p className="text-sm max-w-lg mx-auto text-white/90">Talk to our gifting specialists today and get a customized B2B proposal.</p>
        <button onClick={onNavigateQuote} className="btn btn-white btn-lg font-bold">
          Get a Quote Now →
        </button>
      </div>
    </div>
  );
}
