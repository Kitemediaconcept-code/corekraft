import React, { useState, useEffect } from 'react';
import { ShieldCheck, CreditCard, Smartphone, Building, Wallet, X, CheckCircle2, Loader2 } from 'lucide-react';

export default function DummyRazorpayModal({ isOpen, onClose, amount, onSuccess, userEmail, userPhone }) {
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePay = () => {
    setIsProcessing(true);
    // Simulate API call to bank/gateway
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      // Wait for success animation before closing and notifying parent
      setTimeout(() => {
        setIsSuccess(false);
        onSuccess();
      }, 1500);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center font-sans">
      {/* Dark Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-[400px] rounded-2xl shadow-2xl overflow-hidden animate-fade-in flex flex-col max-h-[90vh]">
        
        {/* Header - Merchant Info */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-5">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg p-1.5 shadow-sm">
                <img src="/logo.png" alt="Corekraft" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="font-bold text-[15px] leading-tight">Corekraft Gifts</h3>
                <p className="text-blue-200 text-[11px]">Secure Checkout</p>
              </div>
            </div>
            <button onClick={onClose} className="text-blue-200 hover:text-white transition p-1">
              <X size={20} />
            </button>
          </div>
          
          <div className="border-t border-blue-700/50 pt-4 mt-2 flex justify-between items-end">
            <div>
              <p className="text-blue-200 text-[11px] mb-0.5">Amount to pay</p>
              <h2 className="text-2xl font-extrabold tracking-tight">₹{amount.toLocaleString()}</h2>
            </div>
            <div className="text-[10px] text-blue-200 bg-blue-900/50 px-2 py-1 rounded border border-blue-700/50">
              Test Mode
            </div>
          </div>
        </div>

        {/* Content Area */}
        {isSuccess ? (
          <div className="p-10 flex flex-col items-center justify-center text-center space-y-4 bg-gray-50 flex-1">
            <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center animate-bounce">
              <CheckCircle2 size={40} strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Payment Successful</h3>
              <p className="text-sm text-gray-500">Redirecting you back to merchant...</p>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto bg-gray-50">
            {/* User Info Bar */}
            <div className="bg-white px-5 py-3 border-b text-xs flex justify-between text-gray-600">
              <span className="truncate max-w-[150px]">{userEmail}</span>
              <span>{userPhone}</span>
            </div>

            <div className="p-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Preferred Payment Methods</h4>
              
              <div className="space-y-2.5">
                {[
                  { id: 'upi', icon: Smartphone, label: 'UPI', desc: 'Google Pay, PhonePe, Paytm' },
                  { id: 'card', icon: CreditCard, label: 'Card', desc: 'Visa, MasterCard, RuPay & More' },
                  { id: 'netbanking', icon: Building, label: 'Netbanking', desc: 'All Indian banks' },
                  { id: 'wallet', icon: Wallet, label: 'Wallet', desc: 'Amazon Pay, Freecharge' },
                ].map((method) => {
                  const Icon = method.icon;
                  return (
                    <button 
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`w-full flex items-center gap-3 p-3.5 rounded-xl border transition text-left bg-white ${
                        selectedMethod === method.id 
                          ? 'border-blue-600 shadow-[0_0_0_1px_rgba(37,99,235,1)] ring-2 ring-blue-50' 
                          : 'border-gray-200 hover:border-gray-300 shadow-sm'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                        selectedMethod === method.id ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-500'
                      }`}>
                        <Icon size={18} strokeWidth={2} />
                      </div>
                      <div>
                        <h4 className={`text-sm font-bold ${selectedMethod === method.id ? 'text-blue-900' : 'text-gray-900'}`}>
                          {method.label}
                        </h4>
                        <p className="text-[11px] text-gray-500">{method.desc}</p>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Fake Details Area based on selection */}
              {selectedMethod === 'card' && (
                <div className="mt-4 p-4 border rounded-xl bg-white space-y-3">
                  <div className="text-xs font-bold text-gray-700">Enter Card Details</div>
                  <input type="text" placeholder="Card Number (Test)" defaultValue="4111 1111 1111 1111" className="w-full text-sm p-2.5 border rounded-lg outline-none font-mono tracking-widest text-gray-600 bg-gray-50" readOnly />
                  <div className="flex gap-3">
                    <input type="text" placeholder="MM/YY" defaultValue="12/28" className="w-full text-sm p-2.5 border rounded-lg outline-none text-gray-600 bg-gray-50" readOnly />
                    <input type="text" placeholder="CVV" defaultValue="123" className="w-full text-sm p-2.5 border rounded-lg outline-none text-gray-600 bg-gray-50" readOnly />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer / Pay Button */}
        {!isSuccess && (
          <div className="p-5 bg-white border-t border-gray-100">
            <button 
              onClick={handlePay}
              disabled={isProcessing}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-[15px] py-3.5 rounded-xl transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="animate-spin" size={18} /> Processing...
                </>
              ) : (
                `Pay ₹${amount.toLocaleString()}`
              )}
            </button>
            <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
              <ShieldCheck size={12} /> Secured by Razorpay
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
