import React, { useState } from 'react';
import { FileText, Send, CheckCircle2, Upload, PhoneCall, Award, Truck, Users, ShieldCheck } from 'lucide-react';

export default function CorporateQuotePage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    quantity: '100',
    budget: '1000-2500',
    occasion: 'Employee Gifting',
    products: 'Executive Notebook Set, Insulated Bottle',
    branding: ['Logo Printing', 'Engraving'],
    message: ''
  });

  const handleCheckboxChange = (option) => {
    if (formData.branding.includes(option)) {
      setFormData({ ...formData, branding: formData.branding.filter(b => b !== option) });
    } else {
      setFormData({ ...formData, branding: [...formData.branding, option] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl space-y-12">
      {/* Header Banner */}
      <div className="gradient-banner rounded-3xl p-8 lg:p-12 text-center text-white relative overflow-hidden shadow-xl">
        <div className="geometric-pattern-light"></div>
        <div className="relative z-10 max-w-2xl mx-auto space-y-3">
          <span className="bg-white/20 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
            B2B LEAD GENERATION
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold">
            Corporate Gifting Made for Your Business
          </h1>
          <p className="text-white/90 text-sm">
            Get volume discount quotes, custom digital vector proofs, and sample boxes within 2 hours.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Form Container */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-10 rounded-3xl border border-[#ECE7E8] shadow-sm">
          {submitted ? (
            <div className="text-center py-12 space-y-4 animate-fade-in">
              <div className="w-16 h-16 bg-[#F5F5F5] text-[#000000] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Quote Request Submitted!</h3>
              <p className="text-sm text-gray-600 max-w-md mx-auto">
                Thank you <strong>{formData.name}</strong>. Your dedicated Corekraft Account Manager will reach out to <strong>{formData.email}</strong> within 2 hours with customized tier pricing.
              </p>
              <button onClick={() => setSubmitted(false)} className="btn btn-primary btn-sm">
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 border-b pb-3">Request a Custom B2B Quote</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Your Full Name *</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Vikram Sharma"
                    className="w-full text-xs p-3 rounded-xl border border-gray-200 outline-none focus:border-[#000000]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Company Name *</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Infosys Ltd"
                    className="w-full text-xs p-3 rounded-xl border border-gray-200 outline-none focus:border-[#000000]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Work Email *</label>
                  <input 
                    type="email" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full text-xs p-3 rounded-xl border border-gray-200 outline-none focus:border-[#000000]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Phone Number *</label>
                  <input 
                    type="tel" 
                    required 
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full text-xs p-3 rounded-xl border border-gray-200 outline-none focus:border-[#000000]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Estimated Quantity *</label>
                  <input 
                    type="number" 
                    required 
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    placeholder="e.g. 100"
                    className="w-full text-xs p-3 rounded-xl border border-gray-200 outline-none focus:border-[#000000]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Budget per Gift *</label>
                  <select 
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-gray-200 outline-none focus:border-[#000000] bg-white font-medium"
                  >
                    <option value="below-500">Below ₹500</option>
                    <option value="500-1000">₹500 – ₹1,000</option>
                    <option value="1000-2500">₹1,000 – ₹2,500</option>
                    <option value="2500-5000">₹2,500 – ₹5,000</option>
                    <option value="5000-plus">₹5,000+</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Occasion *</label>
                  <select 
                    value={formData.occasion}
                    onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-gray-200 outline-none focus:border-[#000000] bg-white font-medium"
                  >
                    <option value="Employee Gifting">Employee Gifting</option>
                    <option value="Client Gifting">Client Gifting</option>
                    <option value="Festive Gifting">Festive Gifting</option>
                    <option value="Events">Events & Conferences</option>
                    <option value="Joining Kits">Onboarding / Joining Kits</option>
                    <option value="Rewards">Rewards & Recognition</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Required Products</label>
                  <input 
                    type="text" 
                    value={formData.products}
                    onChange={(e) => setFormData({ ...formData, products: e.target.value })}
                    placeholder="e.g. Notebooks, Bottles, Powerbank"
                    className="w-full text-xs p-3 rounded-xl border border-gray-200 outline-none focus:border-[#000000]"
                  />
                </div>
              </div>

              {/* Branding Options Checkboxes */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 block">Branding Techniques Required:</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Logo Printing', 'Engraving', 'Custom Packaging', 'Personalized Message'].map(option => (
                    <label key={option} className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={formData.branding.includes(option)} 
                        onChange={() => handleCheckboxChange(option)}
                        className="accent-[#000000] rounded"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Logo Upload */}
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Upload Brand Logo (Optional)</label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-3 text-center bg-gray-50 text-xs text-gray-500 cursor-pointer hover:border-[#000000] transition">
                  <Upload size={18} className="mx-auto text-[#000000] mb-1" />
                  <span>Drop your logo file here or click to browse (PNG, SVG, AI, PDF)</span>
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Special Instructions / Message</label>
                <textarea 
                  rows="3"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Mention delivery deadlines, specific color codes, or custom packaging preferences..."
                  className="w-full text-xs p-3 rounded-xl border border-gray-200 outline-none focus:border-[#000000]"
                ></textarea>
              </div>

              <button type="submit" className="w-full bg-[#000000] hover:bg-[#111111] text-white font-bold py-3.5 rounded-full shadow-lg transition flex items-center justify-center gap-2">
                Request a Quote <Send size={16} />
              </button>
            </form>
          )}
        </div>

        {/* Sidebar Features */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-[#ECE7E8] shadow-sm space-y-6">
            <h4 className="text-base font-bold text-gray-900 border-b pb-3">Why Partner with Corekraft?</h4>

            {[
              { icon: Award, title: 'Tiered Bulk Pricing', desc: 'Save up to 35% on orders above 250 units.' },
              { icon: ShieldCheck, title: 'Custom Branding Studio', desc: 'Free 3D digital rendering before production.' },
              { icon: Users, title: 'Dedicated Account Manager', desc: 'Single point of contact from sample to door.' },
              { icon: Truck, title: 'PAN India Delivery', desc: 'Doorstep dispatch to multiple office locations.' }
            ].map((feature, idx) => {
              const IconComp = feature.icon;
              return (
                <div key={idx} className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#F5F5F5] text-[#000000] flex items-center justify-center shrink-0">
                    <IconComp size={20} />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-gray-900">{feature.title}</h5>
                    <p className="text-[11px] text-gray-500 mt-0.5">{feature.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-gradient-to-br from-[#F5F5F5] to-[#E5E5E5] p-6 rounded-3xl text-center space-y-3">
            <PhoneCall size={28} className="mx-auto text-[#000000]" />
            <h4 className="text-sm font-bold text-gray-900">Need Immediate Assistance?</h4>
            <p className="text-xs text-gray-600">Speak directly with our Corporate Gifting Specialist.</p>
            <a href="tel:+919876543210" className="inline-block bg-white text-[#000000] font-bold text-xs px-4 py-2 rounded-full shadow-sm hover:shadow-md transition">
              Call +91 98765 43210
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
