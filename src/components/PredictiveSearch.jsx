import React, { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp, ChevronRight, Star } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';

export default function PredictiveSearch({ isOpen, onClose, onSelectProduct, onSelectCategory }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const popularSearches = ['Notebook', 'Bottle', 'Wireless Charger', 'Eco Friendly', 'Gift Hamper', 'Backpack'];

  const filteredProducts = query.trim() === '' 
    ? PRODUCTS.slice(0, 4) 
    : PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.categoryName.toLowerCase().includes(query.toLowerCase()) ||
        p.sku.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto animate-fade-in">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative min-h-screen flex items-start justify-center pt-16 px-4 pb-12">
        <div className="relative bg-white rounded-3xl shadow-2xl border border-[#ECE7E8] w-full max-w-2xl overflow-hidden z-10">
          {/* Input Header */}
          <div className="p-4 sm:p-5 border-b border-[#ECE7E8] flex items-center gap-3 bg-gradient-to-r from-[#FFF3F6] to-white">
            <Search size={22} className="text-[#EE3364]" />
            <input 
              ref={inputRef}
              type="text" 
              placeholder="Search by product name, SKU, or category..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 text-base font-medium outline-none bg-transparent text-gray-900 placeholder:text-gray-400"
            />
            {query && (
              <button onClick={() => setQuery('')} className="text-gray-400 hover:text-gray-600 text-xs font-semibold">
                Clear
              </button>
            )}
            <button 
              onClick={onClose}
              className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
              aria-label="Close search overlay"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body content */}
          <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
            {/* Popular Search Pills */}
            {query === '' && (
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <TrendingUp size={14} className="text-[#EE3364]" /> Popular Corporate Searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map(term => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="bg-[#F5F5F7] hover:bg-[#FFF3F6] hover:text-[#EE3364] text-gray-700 text-xs font-medium px-3.5 py-1.5 rounded-full transition border border-gray-200"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Product Results */}
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                {query === '' ? 'Featured Suggestions' : `Matching Gifts (${filteredProducts.length})`}
              </p>
              
              {filteredProducts.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p className="font-semibold text-sm">No corporate gifts found for "{query}"</p>
                  <p className="text-xs text-gray-400 mt-1">Try searching for "bottle", "notebook", or "hamper".</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredProducts.map(product => (
                    <div 
                      key={product.id}
                      onClick={() => { onSelectProduct(product); onClose(); }}
                      className="flex items-center justify-between p-3 rounded-2xl hover:bg-[#FFF3F6] transition cursor-pointer group border border-transparent hover:border-[#FAD9E2]"
                    >
                      <div className="flex items-center gap-3.5">
                        <img 
                          src={product.images[0]} 
                          alt={product.name} 
                          className="w-12 h-12 object-cover rounded-xl bg-gray-100 border"
                        />
                        <div>
                          <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#EE3364] transition">
                            {product.name}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                            <span>{product.categoryName}</span>
                            <span>•</span>
                            <span className="flex items-center gap-0.5 text-[#EE3364]">
                              <Star size={10} className="fill-[#EE3364]" /> {product.rating}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-sm font-extrabold text-gray-900">₹{product.price.toLocaleString()}</span>
                        <ChevronRight size={16} className="text-gray-400 group-hover:text-[#EE3364] transition" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
