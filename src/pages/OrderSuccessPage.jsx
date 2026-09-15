import React from 'react';
import { CheckCircle2, Package, Truck, Calendar, ArrowRight, Download } from 'lucide-react';

export default function OrderSuccessPage({ order, onNavigateAccount, onNavigateHome }) {
  if (!order) return null;

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl text-center space-y-8 animate-fade-in">
      {/* Animated Success Badge */}
      <div className="w-24 h-24 bg-[#F5F5F5] text-[#000000] rounded-full flex items-center justify-center mx-auto shadow-xl">
        <CheckCircle2 size={56} className="animate-bounce" />
      </div>

      <div className="space-y-2">
        <span className="badge-label">
          {order.status === 'Awaiting Call' ? 'ORDER REQUEST SUBMITTED' : 'ORDER CONFIRMED'}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          {order.status === 'Awaiting Call' ? 'Request Received!' : 'Thank You for Your Order!'}
        </h1>
        <p className="text-sm text-gray-600">
          Your order <strong className="text-[#000000]">{order.orderNumber}</strong> has been successfully {order.status === 'Awaiting Call' ? 'submitted' : 'placed'}.
          {order.status === 'Awaiting Call' && <span className="block mt-1 font-bold text-gray-800">Our sales team will call you shortly to finalize the bulk order and PO.</span>}
        </p>
      </div>

      {/* Details Box */}
      <div className="bg-white rounded-3xl border border-[#ECE7E8] p-6 text-left space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between pb-4 border-b border-gray-100 gap-2">
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase">Company & Contact</p>
            <p className="text-sm font-bold text-gray-900">{order.formData?.companyName || 'Acme Corp'}</p>
            <p className="text-xs text-gray-600">{order.formData?.fullName} ({order.formData?.email})</p>
          </div>
          <div className="sm:text-right">
            <p className="text-xs text-gray-400 font-bold uppercase">Estimated Delivery</p>
            <p className="text-sm font-bold text-[#000000] flex items-center gap-1 sm:justify-end">
              <Calendar size={14} /> Sept 14, 2026 (5 Business Days)
            </p>
          </div>
        </div>

        {/* Item list */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-gray-400 uppercase">Ordered Items</p>
          {order.items?.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center text-xs py-2 border-b border-dashed">
              <div className="flex items-center gap-3">
                <img src={item.images ? item.images[0] : item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover border" />
                <div>
                  <p className="font-bold text-gray-900">{item.name}</p>
                  <p className="text-gray-500">Qty: {item.quantity} | {item.hasLogo ? 'Custom Logo Engraved' : 'Standard'}</p>
                </div>
              </div>
              <span className="font-bold text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
        </div>

        {/* Total Footer */}
        <div className="flex justify-between items-center pt-2 font-bold text-sm">
          <span>{order.status === 'Awaiting Call' ? 'Estimated Total:' : 'Total Paid Amount:'}</span>
          <span className="text-lg text-[#000000]">₹{order.total?.toLocaleString()}</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button onClick={onNavigateAccount} className="btn btn-primary btn-lg">
          Track Order Status <Truck size={18} />
        </button>
        <button onClick={onNavigateHome} className="btn btn-secondary btn-lg">
          Back to Home Page
        </button>
      </div>
    </div>
  );
}
