import React, { useState } from 'react';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  Upload, 
  Truck, 
  ShieldCheck, 
  Headphones, 
  Plus, 
  Minus, 
  Maximize2, 
  CheckCircle2, 
  ArrowRight,
  FileText,
  Share2
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../data/products';

export default function ProductDetailPage({ 
  product, 
  onAddToCart, 
  onToggleWishlist, 
  isWishlisted, 
  onSelectProduct, 
  onNavigateQuote 
}) {
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]?.name || 'Red');
  const [personalizationMode, setPersonalizationMode] = useState('with-logo');
  const [logoFile, setLogoFile] = useState(null);
  const [customMessage, setCustomMessage] = useState('');
  const [quantity, setQuantity] = useState(product?.moq || 10);
  const [activeTab, setActiveTab] = useState('description');
  const [zoomModal, setZoomModal] = useState(false);

  if (!product) return null;

  const relatedProducts = PRODUCTS.filter(p => p.id !== product.id).slice(0, 4);

  const handleLogoChange = (e) => {
    if (e.target.files[0]) {
      setLogoFile(e.target.files[0]);
    }
  };

  const handleAddToCartAction = () => {
    onAddToCart({
      ...product,
      quantity,
      selectedColor,
      hasLogo: personalizationMode === 'with-logo',
      customLogo: logoFile ? URL.createObjectURL(logoFile) : null,
      customMessage
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Breadcrumb Navigation */}
      <nav className="text-xs font-semibold text-gray-500 flex items-center gap-2">
        <a href="#" className="hover:text-[#EE3364]">Home</a>
        <span>/</span>
        <span className="capitalize">{product.categoryName}</span>
        <span>/</span>
        <span className="text-gray-900 font-bold">{product.name}</span>
      </nav>

      {/* Main Two-Column Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* LEFT: Multi-Thumbnail Gallery & Zoom */}
        <div className="lg:col-span-7 flex flex-col md:flex-row-reverse gap-4">
          {/* Large Main Image Viewer */}
          <div className="relative flex-1 aspect-square rounded-3xl overflow-hidden bg-gray-50 border border-[#ECE7E8] group">
            <img 
              src={product.images[selectedImgIndex] || product.images[0]} 
              alt={product.name} 
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 cursor-zoom-in"
              onClick={() => setZoomModal(true)}
            />

            {/* Zoom Trigger Button */}
            <button 
              onClick={() => setZoomModal(true)}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 backdrop-blur-md text-gray-700 hover:text-[#EE3364] shadow-md transition"
              title="Full Screen Zoom"
              aria-label="Full Screen Zoom"
            >
              <Maximize2 size={18} />
            </button>

            {/* Wishlist Button */}
            <button 
              onClick={() => onToggleWishlist(product)}
              className={`absolute top-4 left-4 p-2.5 rounded-full backdrop-blur-md transition shadow-md ${
                isWishlisted ? 'bg-[#EE3364] text-white' : 'bg-white/90 text-gray-600 hover:text-[#EE3364]'
              }`}
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
            </button>
          </div>

          {/* Vertical Thumbnails */}
          <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImgIndex(idx)}
                className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden border-2 transition shrink-0 ${
                  selectedImgIndex === idx ? 'border-[#EE3364] shadow-md scale-105' : 'border-gray-200 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: Specs & Personalization Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#EE3364] bg-[#FFF3F6] px-3 py-1 rounded-full">
              {product.categoryName}
            </span>

            <h1 className="text-3xl font-extrabold text-gray-900 mt-2 mb-2 leading-tight">
              {product.name}
            </h1>

            <p className="text-xs text-gray-500 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Rating & SKU Bar */}
          <div className="flex items-center justify-between text-xs py-2 border-y border-[#ECE7E8]">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-amber-400" />)}
              </div>
              <span className="font-bold text-gray-900">{product.rating}</span>
              <span className="text-gray-400">({product.reviewCount} reviews)</span>
            </div>
            <span className="text-gray-400 font-mono">SKU: {product.sku}</span>
          </div>

          {/* Price Header */}
          <div className="space-y-1">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-gray-900">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-base text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
              )}
              {product.discount && (
                <span className="bg-[#EE3364] text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                  {product.discount}
                </span>
              )}
            </div>
            <p className="text-[11px] text-gray-400">Inclusive of all taxes. Bulk volume discount applied.</p>
          </div>

          {/* Color Variant Options */}
          {product.colors && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                Color Options: <span className="text-[#EE3364]">{selectedColor}</span>
              </label>
              <div className="flex items-center gap-3">
                {product.colors.map(color => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-9 h-9 rounded-full border-2 p-0.5 transition flex items-center justify-center ${
                      selectedColor === color.name ? 'border-[#EE3364] scale-110 shadow-md' : 'border-transparent opacity-80'
                    }`}
                    title={color.name}
                  >
                    <span className="w-full h-full rounded-full border border-black/10 block" style={{ backgroundColor: color.hex }}></span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Personalization Options */}
          <div className="space-y-3 bg-[#FFF3F6]/50 p-4 rounded-2xl border border-[#FAD9E2]">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
              Personalization
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setPersonalizationMode('with-logo')}
                className={`py-2 px-4 rounded-xl text-xs font-bold transition border ${
                  personalizationMode === 'with-logo' 
                    ? 'bg-[#EE3364] text-white border-[#EE3364] shadow-md' 
                    : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                }`}
              >
                With Logo
              </button>
              <button
                onClick={() => setPersonalizationMode('without-logo')}
                className={`py-2 px-4 rounded-xl text-xs font-bold transition border ${
                  personalizationMode === 'without-logo' 
                    ? 'bg-[#EE3364] text-white border-[#EE3364] shadow-md' 
                    : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                }`}
              >
                Without Logo
              </button>
            </div>

            {personalizationMode === 'with-logo' && (
              <div className="space-y-3 pt-2 animate-fade-in">
                {/* Logo File Upload */}
                <div className="border-2 border-dashed border-[#EE3364]/40 bg-white p-3 rounded-xl text-center relative cursor-pointer hover:border-[#EE3364] transition">
                  <input 
                    type="file" 
                    accept=".jpg,.png,.svg" 
                    onChange={handleLogoChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <div className="flex items-center justify-center gap-2 text-xs font-bold text-gray-800">
                    <Upload size={16} className="text-[#EE3364]" />
                    <span>{logoFile ? `✓ ${logoFile.name}` : 'Upload Logo (JPG / PNG / SVG)'}</span>
                  </div>
                </div>

                {/* Optional Custom Message */}
                <input 
                  type="text" 
                  placeholder="Optional custom message or employee tagline"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#EE3364] bg-white"
                />
              </div>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Quantity:</label>
            <div className="flex items-center border border-gray-300 rounded-full bg-white px-2 py-1">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-1 hover:text-[#EE3364]"
              >
                <Minus size={14} />
              </button>
              <span className="px-4 text-sm font-bold text-gray-900">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="p-1 hover:text-[#EE3364]"
              >
                <Plus size={14} />
              </button>
            </div>
            <span className="text-[11px] text-gray-400 font-medium">Min. MOQ: {product.moq || 10}</span>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button 
              onClick={handleAddToCartAction}
              className="flex-1 bg-[#EE3364] hover:bg-[#D92756] text-white font-bold py-3.5 px-6 rounded-full shadow-lg transition flex items-center justify-center gap-2"
            >
              <ShoppingBag size={18} /> Add to Cart
            </button>
            <button 
              onClick={onNavigateQuote}
              className="btn btn-secondary py-3.5 px-6 font-bold"
            >
              Get a Quote
            </button>
          </div>

          {/* Trust Badges Bar */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t text-center text-[11px] font-bold text-gray-600">
            <div className="flex flex-col items-center gap-1">
              <Truck size={18} className="text-[#EE3364]" />
              <span>PAN India Delivery</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck size={18} className="text-[#EE3364]" />
              <span>Secure Packaging</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Headphones size={18} className="text-[#EE3364]" />
              <span>Dedicated Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCT DETAIL INFORMATION TABS */}
      <div className="bg-white rounded-3xl border border-[#ECE7E8] p-6 lg:p-8 space-y-6">
        <div className="flex border-b border-[#ECE7E8] gap-6 text-sm font-bold">
          {['description', 'specifications', 'branding', 'shipping'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 capitalize transition border-b-2 ${
                activeTab === tab ? 'border-[#EE3364] text-[#EE3364]' : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              {tab === 'branding' ? 'Branding Options' : tab === 'shipping' ? 'Shipping & Returns' : tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="pt-2 text-sm text-gray-600 leading-relaxed">
          {activeTab === 'description' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Product Description</h3>
              <p>{product.fullDescription || product.description}</p>
              <div className="space-y-2 pt-2">
                {product.highlights?.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-800">
                    <CheckCircle2 size={16} className="text-[#EE3364] shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl">
              <div className="flex justify-between py-2 border-b">
                <span className="font-bold text-gray-900">SKU</span>
                <span>{product.sku}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="font-bold text-gray-900">Material</span>
                <span>Premium Grade 304 Stainless Steel & Leatherette</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="font-bold text-gray-900">Minimum Order</span>
                <span>{product.moq || 10} Units</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="font-bold text-gray-900">Packaging</span>
                <span>Corekraft Premium Matte Gift Box</span>
              </div>
            </div>
          )}

          {activeTab === 'branding' && (
            <div className="space-y-3">
              <h4 className="font-bold text-gray-900">Custom Branding Methods:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Laser Engraving:</strong> Sharp metallic etch, ideal for bottles & metal pens.</li>
                <li><strong>UV Digital Printing:</strong> Full-color logo printing with vivid contrast.</li>
                <li><strong>Embossing & Debossing:</strong> Elegant recessed impression for leather notebooks.</li>
              </ul>
            </div>
          )}

          {activeTab === 'shipping' && (
            <p>
              Free PAN India express shipping on all orders over ₹5,000. Sample dispatch within 48 hours. Mass production order turnaround is typically 5-7 business days from vector proof approval.
            </p>
          )}
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <section className="space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <span className="badge-label mb-1">YOU MAY ALSO LIKE</span>
            <h2 className="text-2xl font-extrabold text-gray-900">Related Products</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {relatedProducts.map(p => (
            <ProductCard 
              key={p.id}
              product={p}
              onSelectProduct={onSelectProduct}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={isWishlisted(p.id)}
            />
          ))}
        </div>
      </section>

      {/* Fullscreen Zoom Modal */}
      {zoomModal && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setZoomModal(false)}>
          <img 
            src={product.images[selectedImgIndex]} 
            alt={product.name} 
            className="max-w-full max-h-full object-contain rounded-xl"
          />
        </div>
      )}
    </div>
  );
}
