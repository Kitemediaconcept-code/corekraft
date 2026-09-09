import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, Tag, ShieldCheck, Truck, HelpCircle } from 'lucide-react';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQty, 
  onRemoveItem, 
  onNavigateCheckout, 
  onNavigateQuote 
}) {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const tax = Math.round((subtotal - discountAmount) * 0.18);
  const shipping = subtotal > 5000 || subtotal === 0 ? 0 : 250;
  const total = subtotal - discountAmount + tax + shipping;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'CORE10') {
      setDiscountPercent(10);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try CORE10 for 10% off');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Glass Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Drawer Header */}
          <div className="p-5 border-b border-[#ECE7E8] flex items-center justify-between bg-gradient-to-r from-[#FFF3F6] to-white">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-gray-900">Your Shopping Cart</h3>
              <span className="bg-[#EE3364] text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                {cartItems.reduce((acc, i) => acc + i.quantity, 0)} items
              </span>
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
              aria-label="Close cart drawer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Drawer Body - Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 bg-[#FFF3F6] rounded-full flex items-center justify-center text-[#EE3364]">
                  <Tag size={36} />
                </div>
                <h4 className="text-lg font-bold text-gray-900">Your cart is empty</h4>
                <p className="text-sm text-gray-500 max-w-xs">
                  Explore our premium corporate gift catalog and add customized items to your cart.
                </p>
                <button 
                  onClick={onClose}
                  className="bg-[#EE3364] text-white font-semibold px-6 py-2.5 rounded-full hover:bg-[#D92756] transition"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item, idx) => (
                <div key={idx} className="flex gap-4 p-3 rounded-xl border border-[#ECE7E8] bg-white hover:border-[#FAD9E2] transition">
                  <img 
                    src={item.images ? item.images[0] : item.image} 
                    alt={item.name} 
                    className="w-20 h-20 object-cover rounded-lg bg-gray-50 border"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-bold text-gray-900 line-clamp-1">{item.name}</h4>
                        <button 
                          onClick={() => onRemoveItem(item.id)}
                          className="text-gray-400 hover:text-red-500 p-1 transition"
                          title="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      {/* Variant & Personalization Badge */}
                      <div className="text-[11px] text-gray-500 mt-1 space-y-0.5">
                        {item.selectedColor && (
                          <p>Color: <span className="font-semibold text-gray-700">{item.selectedColor}</span></p>
                        )}
                        {item.hasLogo ? (
                          <span className="inline-block bg-[#FFF3F6] text-[#EE3364] px-1.5 py-0.5 rounded text-[10px] font-bold">
                            ✓ Custom Logo Included
                          </span>
                        ) : (
                          <span className="text-gray-400">No Personalization</span>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button 
                          onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                          className="p-1 text-gray-500 hover:bg-gray-100 rounded-l-lg"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-2 text-xs font-bold text-gray-800">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                          className="p-1 text-gray-500 hover:bg-gray-100 rounded-r-lg"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <span className="text-sm font-extrabold text-gray-900">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer - Calculations & CTAs */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-[#ECE7E8] bg-[#FFFCFC] space-y-3">
              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Promo Code (e.g. CORE10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 text-xs py-2 px-3 border border-gray-200 rounded-lg outline-none focus:border-[#EE3364]"
                />
                <button type="submit" className="bg-gray-900 text-white text-xs font-semibold px-3 py-2 rounded-lg hover:bg-gray-800 transition">
                  Apply
                </button>
              </form>
              {promoError && <p className="text-[11px] text-red-500">{promoError}</p>}
              {discountPercent > 0 && (
                <p className="text-[11px] text-emerald-600 font-semibold">✓ 10% B2B Promo Discount Applied!</p>
              )}

              {/* Breakdown */}
              <div className="space-y-1.5 text-xs text-gray-600 pt-2 border-t border-dashed">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">₹{subtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount (10%)</span>
                    <span>-₹{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated GST (18%)</span>
                  <span>₹{tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping (PAN India)</span>
                  <span>{shipping === 0 ? <strong className="text-emerald-600">FREE</strong> : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-gray-900 pt-2 border-t">
                  <span>Total Amount</span>
                  <span className="text-[#EE3364]">₹{total.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout Action */}
              <button 
                onClick={() => { onClose(); onNavigateCheckout(); }}
                className="w-full bg-[#EE3364] hover:bg-[#D92756] text-white font-bold py-3.5 rounded-full flex items-center justify-center gap-2 shadow-lg transition"
              >
                Proceed to Checkout <ArrowRight size={16} />
              </button>

              {/* Corporate B2B Quote Switcher */}
              <div className="bg-[#FFF3F6] p-3 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-gray-900">Ordering 100+ units?</p>
                  <p className="text-gray-500 text-[10px]">Get custom B2B tiered volume pricing.</p>
                </div>
                <button 
                  onClick={() => { onClose(); onNavigateQuote(); }}
                  className="text-[#EE3364] font-bold hover:underline"
                >
                  Request Quote →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
