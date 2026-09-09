import React, { useState } from 'react';
import { Filter, SlidersHorizontal, ChevronDown, Check, X, RotateCcw } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { PRODUCTS, CATEGORIES, OCCASIONS } from '../data/products';

export default function ShopPage({ 
  selectedCategory, 
  setSelectedCategory, 
  onSelectProduct, 
  onAddToCart, 
  onToggleWishlist, 
  wishlist 
}) {
  const [selectedOccasion, setSelectedOccasion] = useState('all');
  const [maxPrice, setMaxPrice] = useState(5000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedColor, setSelectedColor] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const isWishlisted = (id) => wishlist.some(item => item.id === id);

  // Filter products logic
  let filtered = PRODUCTS.filter(p => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    if (p.price > maxPrice) return false;
    if (inStockOnly && !p.inStock) return false;
    if (selectedColor !== 'all' && p.colors && !p.colors.some(c => c.name.toLowerCase().includes(selectedColor.toLowerCase()))) return false;
    return true;
  });

  // Sort products logic
  if (sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedOccasion('all');
    setMaxPrice(5000);
    setInStockOnly(false);
    setSelectedColor('all');
    setSortBy('featured');
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Breadcrumb */}
      <nav className="text-xs font-semibold text-gray-500 flex items-center gap-2">
        <a href="#" onClick={(e) => { e.preventDefault(); setSelectedCategory('all'); }} className="hover:text-[#EE3364]">Home</a>
        <span>/</span>
        <span className="text-gray-900">Corporate Gifts</span>
      </nav>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#FFF3F6] via-white to-[#FFF3F6] p-6 lg:p-8 rounded-3xl border border-[#ECE7E8] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="badge-label mb-1">CATALOG</span>
          <h1 className="text-3xl font-extrabold text-gray-900">Corporate Gifts</h1>
          <p className="text-xs text-gray-500 mt-1">Explore {filtered.length} customizable business gifts for your clients & teams.</p>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setMobileFilterOpen(true)} 
            className="lg:hidden bg-white border border-gray-200 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm"
          >
            <Filter size={14} className="text-[#EE3364]" /> Filters
          </button>

          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 text-xs font-medium shadow-sm">
            <span className="text-gray-400">Sort by:</span>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent font-bold text-gray-900 outline-none cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="rating">Best Selling</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Filter Sidebar (Desktop) */}
        <aside className="hidden lg:block lg:col-span-3 bg-white rounded-3xl border border-[#ECE7E8] p-6 space-y-6 sticky top-24 shadow-sm">
          <div className="flex items-center justify-between border-b pb-3">
            <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <SlidersHorizontal size={18} className="text-[#EE3364]" /> Filters
            </h3>
            <button onClick={resetFilters} className="text-xs text-[#EE3364] hover:underline font-semibold flex items-center gap-1">
              <RotateCcw size={12} /> Reset
            </button>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Category</h4>
            <div className="space-y-1">
              <button 
                onClick={() => setSelectedCategory('all')}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition flex justify-between ${
                  selectedCategory === 'all' ? 'bg-[#FFF3F6] text-[#EE3364] font-bold' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span>All Categories</span>
                <span>({PRODUCTS.length})</span>
              </button>
              {CATEGORIES.map(c => (
                <button 
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition flex justify-between ${
                    selectedCategory === c.id ? 'bg-[#FFF3F6] text-[#EE3364] font-bold' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span>{c.name}</span>
                  <span className="text-gray-400">({c.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-2 pt-4 border-t">
            <div className="flex justify-between text-xs font-bold text-gray-700">
              <span>Max Price</span>
              <span>₹{maxPrice.toLocaleString()}</span>
            </div>
            <input 
              type="range" 
              min="500" 
              max="5000" 
              step="250"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#EE3364]"
            />
            <div className="flex justify-between text-[10px] text-gray-400">
              <span>₹500</span>
              <span>₹5,000+</span>
            </div>
          </div>

          {/* Occasion Filter */}
          <div className="space-y-2 pt-4 border-t">
            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Occasion</h4>
            <select 
              value={selectedOccasion}
              onChange={(e) => setSelectedOccasion(e.target.value)}
              className="w-full bg-[#F5F5F7] border border-gray-200 rounded-xl text-xs py-2 px-3 outline-none font-medium text-gray-700"
            >
              <option value="all">All Occasions</option>
              {OCCASIONS.map(o => <option key={o.id} value={o.id}>{o.title}</option>)}
            </select>
          </div>

          {/* Color Filter */}
          <div className="space-y-2 pt-4 border-t">
            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Color</h4>
            <div className="flex flex-wrap gap-2">
              {['all', 'red', 'black', 'grey', 'blue'].map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border transition ${
                    selectedColor === color 
                      ? 'bg-[#EE3364] text-white border-[#EE3364]' 
                      : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Stock Toggle */}
          <div className="pt-4 border-t flex items-center justify-between">
            <span className="text-xs font-bold text-gray-700">In Stock Only</span>
            <input 
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="w-4 h-4 accent-[#EE3364] rounded cursor-pointer"
            />
          </div>
        </aside>

        {/* Right Product Grid */}
        <main className="lg:col-span-9">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-3xl border border-[#ECE7E8] p-12 text-center space-y-4">
              <p className="text-lg font-bold text-gray-900">No products match your filter criteria.</p>
              <button onClick={resetFilters} className="btn btn-primary btn-sm">Reset All Filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filtered.map(product => (
                <ProductCard 
                  key={product.id}
                  product={product}
                  onSelectProduct={onSelectProduct}
                  onAddToCart={onAddToCart}
                  onToggleWishlist={onToggleWishlist}
                  isWishlisted={isWishlisted(product.id)}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden animate-fade-in" onClick={() => setMobileFilterOpen(false)}>
          <div className="w-4/5 max-w-xs bg-white h-full p-6 flex flex-col justify-between overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div>
              <div className="flex items-center justify-between border-b pb-3 mb-4">
                <h3 className="font-bold text-base">Filter Catalog</h3>
                <button onClick={() => setMobileFilterOpen(false)}><X size={20} /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Category</h4>
                  {CATEGORIES.map(c => (
                    <button 
                      key={c.id} 
                      onClick={() => { setSelectedCategory(c.id); setMobileFilterOpen(false); }}
                      className={`block w-full text-left py-1.5 text-xs ${selectedCategory === c.id ? 'font-bold text-[#EE3364]' : 'text-gray-700'}`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button 
              onClick={() => setMobileFilterOpen(false)}
              className="w-full bg-[#EE3364] text-white py-3 rounded-full font-bold text-xs shadow-md mt-6"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
