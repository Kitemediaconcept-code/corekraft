import React, { useState } from 'react';
import { ShieldCheck, Truck, CreditCard, Building, CheckCircle2, Lock, ArrowRight } from 'lucide-react';

export default function CheckoutPage({ cartItems, onCompleteOrder, onNavigateShop }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: 'Rohan Mehta',
    companyName: 'Acme Corporation Ltd',
    email: 'rohan.mehta@acme.com',
    phone: '+91 98765 43210',
    gstin: '27AAAAA0000A1Z5',
    address: '102 Business Park, BKC Central',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400051',
    paymentMethod: 'upi'
  });

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = Math.round(subtotal * 0.18);
  const shipping = subtotal > 5000 || subtotal === 0 ? 0 : 250;
  const total = subtotal + tax + shipping;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      onCompleteOrder({
        orderNumber: 'CK-2026-' + Math.floor(100000 + Math.random() * 900000),
        items: cartItems,
        total,
        formData,
        date: new Date().toLocaleDateString()
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
      {/* 3-Step Header Stepper */}
      <div className="flex justify-between items-center max-w-2xl mx-auto py-4">
        {[
          { num: 1, title: 'Delivery Details' },
          { num: 2, title: 'Payment' },
          { num: 3, title: 'Confirmation' }
        ].map((s) => (
          <div key={s.num} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition ${
              step >= s.num ? 'bg-[#EE3364] text-white shadow-md' : 'bg-gray-200 text-gray-500'
            }`}>
              {s.num}
            </div>
            <span className={`text-xs font-bold ${step >= s.num ? 'text-gray-900' : 'text-gray-400'}`}>
              {s.title}
            </span>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Container */}
        <form onSubmit={handleFormSubmit} className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#ECE7E8] shadow-sm space-y-6">
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Truck className="text-[#EE3364]" size={20} /> 1. Delivery & Company Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Full Name *</label>
                  <input 
                    type="text" 
                    name="fullName" 
                    value={formData.fullName} 
                    onChange={handleInputChange} 
                    required 
                    className="w-full text-xs p-3 rounded-xl border border-gray-200 outline-none focus:border-[#EE3364]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Company Name *</label>
                  <input 
                    type="text" 
                    name="companyName" 
                    value={formData.companyName} 
                    onChange={handleInputChange} 
                    required 
                    className="w-full text-xs p-3 rounded-xl border border-gray-200 outline-none focus:border-[#EE3364]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Email Address *</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    required 
                    className="w-full text-xs p-3 rounded-xl border border-gray-200 outline-none focus:border-[#EE3364]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Phone Number *</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleInputChange} 
                    required 
                    className="w-full text-xs p-3 rounded-xl border border-gray-200 outline-none focus:border-[#EE3364]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">GST Number (Optional for B2B Invoice)</label>
                <input 
                  type="text" 
                  name="gstin" 
                  value={formData.gstin} 
                  onChange={handleInputChange} 
                  placeholder="e.g. 27AAAAA0000A1Z5"
                  className="w-full text-xs p-3 rounded-xl border border-gray-200 outline-none focus:border-[#EE3364] font-mono uppercase"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Delivery Address *</label>
                <input 
                  type="text" 
                  name="address" 
                  value={formData.address} 
                  onChange={handleInputChange} 
                  required 
                  className="w-full text-xs p-3 rounded-xl border border-gray-200 outline-none focus:border-[#EE3364]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">City *</label>
                  <input 
                    type="text" 
                    name="city" 
                    value={formData.city} 
                    onChange={handleInputChange} 
                    required 
                    className="w-full text-xs p-3 rounded-xl border border-gray-200 outline-none focus:border-[#EE3364]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">State *</label>
                  <input 
                    type="text" 
                    name="state" 
                    value={formData.state} 
                    onChange={handleInputChange} 
                    required 
                    className="w-full text-xs p-3 rounded-xl border border-gray-200 outline-none focus:border-[#EE3364]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">PIN Code *</label>
                  <input 
                    type="text" 
                    name="pincode" 
                    value={formData.pincode} 
                    onChange={handleInputChange} 
                    required 
                    className="w-full text-xs p-3 rounded-xl border border-gray-200 outline-none focus:border-[#EE3364]"
                  />
                </div>
              </div>

              <button type="submit" className="w-full bg-[#EE3364] hover:bg-[#D92756] text-white font-bold py-3.5 rounded-full shadow-lg transition">
                Continue to Payment →
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <CreditCard className="text-[#EE3364]" size={20} /> 2. Select Payment Method
              </h2>

              <div className="space-y-3">
                {[
                  { id: 'upi', title: 'UPI / QR Code', desc: 'Google Pay, PhonePe, Paytm, BHIM' },
                  { id: 'card', title: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay, Amex' },
                  { id: 'netbanking', title: 'Net Banking', desc: 'HDFC, ICICI, SBI, Axis & all major banks' },
                  { id: 'po', title: 'Corporate Purchase Order (PO)', desc: 'Submit approved PO for 30-day corporate credit' },
                  { id: 'bank', title: 'Direct Bank Transfer / NEFT / RTGS', desc: 'Wire payment to Corekraft business account' }
                ].map((pm) => (
                  <label 
                    key={pm.id} 
                    className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition ${
                      formData.paymentMethod === pm.id 
                        ? 'border-[#EE3364] bg-[#FFF3F6]' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value={pm.id} 
                      checked={formData.paymentMethod === pm.id} 
                      onChange={handleInputChange}
                      className="mt-1 accent-[#EE3364]"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">{pm.title}</h4>
                      <p className="text-xs text-gray-500">{pm.desc}</p>
                    </div>
                  </label>
                ))}
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(1)} className="btn btn-secondary flex-1">
                  ← Back
                </button>
                <button type="submit" className="btn btn-primary flex-[2] font-bold">
                  Place Order Now (₹{total.toLocaleString()})
                </button>
              </div>
            </div>
          )}
        </form>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-[#ECE7E8] shadow-sm space-y-4">
          <h3 className="text-base font-bold text-gray-900 border-b pb-3">Order Summary</h3>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {cartItems.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <img src={item.images ? item.images[0] : item.image} alt={item.name} className="w-10 h-10 object-cover rounded-lg border" />
                  <div>
                    <p className="font-bold text-gray-900 line-clamp-1">{item.name}</p>
                    <p className="text-gray-400">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-bold text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-xs text-gray-600 border-t pt-3">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>GST (18%)</span>
              <span>₹{tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>PAN India Shipping</span>
              <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
            </div>
            <div className="flex justify-between text-sm font-extrabold text-gray-900 pt-2 border-t">
              <span>Total Payable</span>
              <span className="text-[#EE3364]">₹{total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
