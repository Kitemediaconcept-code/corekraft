import React, { useState } from 'react';
import { User, Package, MapPin, Building, Heart, LogOut, Search, Clock, CheckCircle2, Truck } from 'lucide-react';

export default function AccountPage({ userOrders, wishlist, onSelectProduct, onNavigateShop, onLogout }) {
  const [activeTab, setActiveTab] = useState('orders');
  const [trackInput, setTrackInput] = useState('');
  const [trackResult, setTrackResult] = useState(null);

  const mockOrders = [
    {
      id: 'CK-2026-981245',
      date: 'Sept 04, 2026',
      total: 12990,
      status: 'In Transit',
      item: 'Executive Notebook Set (10 units)',
      carrier: 'BlueDart Express',
      trackingNo: 'BD-88901234'
    },
    {
      id: 'CK-2026-771829',
      date: 'Aug 22, 2026',
      total: 24990,
      status: 'Delivered',
      item: 'Vacuum Insulated Bottle (25 units)',
      carrier: 'Delhivery B2B',
      trackingNo: 'DEL-9910283'
    }
  ];

  const handleTrackSearch = (e) => {
    e.preventDefault();
    const found = mockOrders.find(o => o.id.toLowerCase().includes(trackInput.trim().toLowerCase()) || o.trackingNo.toLowerCase().includes(trackInput.trim().toLowerCase()));
    setTrackResult(found || { notFound: true });
  };

  const handleTabClick = (tabId) => {
    if (tabId === 'logout') {
      onLogout && onLogout();
    } else {
      setActiveTab(tabId);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
      <div className="flex items-center gap-4 bg-gradient-to-r from-[#FFF3F6] to-white p-6 rounded-3xl border border-[#ECE7E8]">
        <div className="w-16 h-16 rounded-full bg-[#EE3364] text-white flex items-center justify-center font-bold text-2xl shadow-md">
          RM
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Rohan Mehta</h1>
          <p className="text-xs text-gray-500">Acme Corporation Ltd • Corporate Buyer Account</p>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-3 bg-white rounded-3xl border border-[#ECE7E8] p-4 space-y-1 shadow-sm">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: User },
            { id: 'orders', label: 'My Orders', icon: Package },
            { id: 'track', label: 'Track Order', icon: Truck },
            { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
            { id: 'company', label: 'Company Details', icon: Building },
            { id: 'logout', label: 'Logout', icon: LogOut }
          ].map(tab => {
            const IconComp = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition text-left ${
                  activeTab === tab.id 
                    ? 'bg-[#EE3364] text-white shadow-md' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <IconComp size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Tab View Body */}
        <main className="lg:col-span-9 bg-white rounded-3xl border border-[#ECE7E8] p-6 lg:p-8 shadow-sm">
          {activeTab === 'orders' && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-xl font-bold text-gray-900 border-b pb-3">Order History</h3>
              <div className="space-y-4">
                {mockOrders.map(order => (
                  <div key={order.id} className="p-4 rounded-2xl border border-gray-200 space-y-3 hover:border-[#FAD9E2] transition">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center text-xs font-bold gap-2">
                      <span className="text-[#EE3364]">{order.id}</span>
                      <span className="text-gray-400">{order.date}</span>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-extrabold ${
                        order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {order.status}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-xs text-gray-700 pt-2 border-t border-dashed">
                      <span>{order.item}</span>
                      <span className="font-bold text-gray-900">₹{order.total.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'track' && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-xl font-bold text-gray-900 border-b pb-3">Track Your Order</h3>
              <form onSubmit={handleTrackSearch} className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Enter Order ID (e.g. CK-2026-981245) or Tracking No"
                  value={trackInput}
                  onChange={(e) => setTrackInput(e.target.value)}
                  className="flex-1 text-xs p-3 rounded-xl border border-gray-200 outline-none focus:border-[#EE3364]"
                />
                <button type="submit" className="btn btn-primary btn-sm">Search</button>
              </form>

              {trackResult && (
                <div className="p-6 rounded-2xl bg-[#FFF3F6] border border-[#FAD9E2] space-y-4">
                  {trackResult.notFound ? (
                    <p className="text-xs text-red-500 font-bold">No tracking records found. Try searching for CK-2026-981245.</p>
                  ) : (
                    <>
                      <div className="flex justify-between text-xs font-bold text-gray-900">
                        <span>Order Status: <strong className="text-[#EE3364]">{trackResult.status}</strong></span>
                        <span>Carrier: {trackResult.carrier}</span>
                      </div>

                      {/* Timeline graphic */}
                      <div className="flex items-center justify-between text-[11px] pt-4">
                        <div className="text-center font-bold text-[#EE3364]">✓ Order Placed</div>
                        <div className="h-1 flex-1 bg-[#EE3364] mx-2"></div>
                        <div className="text-center font-bold text-[#EE3364]">✓ Logo Proof Approved</div>
                        <div className="h-1 flex-1 bg-[#EE3364] mx-2"></div>
                        <div className="text-center font-bold text-gray-800">Dispatching</div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          {(activeTab === 'dashboard' || activeTab === 'company' || activeTab === 'addresses') && (
            <div className="space-y-4 text-xs text-gray-600 animate-fade-in">
              <h3 className="text-xl font-bold text-gray-900 border-b pb-3 capitalize">{activeTab} Info</h3>
              <p>Company: <strong>Acme Corporation Ltd</strong></p>
              <p>GSTIN: <strong>27AAAAA0000A1Z5</strong></p>
              <p>Registered Address: 102 Business Park, BKC Central, Mumbai, Maharashtra 400051</p>
              <p>Billing Contact: Rohan Mehta (rohan.mehta@acme.com)</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
