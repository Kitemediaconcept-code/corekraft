import React, { useState, useEffect, useRef } from 'react';
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
  onNavigateQuote,
  options
}) {
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]?.name || 'Red');
  const [personalizationMode, setPersonalizationMode] = useState('with-logo');
  const [logoFile, setLogoFile] = useState(null);
  const [customMessage, setCustomMessage] = useState('');
  const [quantity, setQuantity] = useState(product?.moq || 10);
  const [activeTab, setActiveTab] = useState('description');
  const [zoomModal, setZoomModal] = useState(false);

  // New Customizer Form State
  const customizeRef = useRef(null);
  const [custName, setCustName] = useState('');
  const [custCompany, setCustCompany] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [custEmail, setCustEmail] = useState('');
  const [custNotes, setCustNotes] = useState('');
  const [logoPlacement, setLogoPlacement] = useState('Front');
  const [logoSize, setLogoSize] = useState('Medium');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (options?.openCustomize && customizeRef.current) {
      setTimeout(() => {
        customizeRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [options, product]);

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
    <div className="container mx-auto px-4 py-6 lg:py-8 space-y-8 lg:space-y-12">
      {/* Breadcrumb Navigation */}
      <nav className="text-xs font-semibold text-gray-500 flex items-center gap-2">
        <a href="#" className="hover:text-[#000000]">Home</a>
        <span>/</span>
        <span className="capitalize">{product.categoryName}</span>
        <span>/</span>
        <span className="text-gray-900 font-bold">{product.name}</span>
      </nav>

      {/* Main Two-Column Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
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
              className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 backdrop-blur-md text-gray-700 hover:text-[#000000] shadow-md transition"
              title="Full Screen Zoom"
              aria-label="Full Screen Zoom"
            >
              <Maximize2 size={18} />
            </button>

            {/* Wishlist Button */}
            <button 
              onClick={() => onToggleWishlist(product)}
              className={`absolute top-4 left-4 p-2.5 rounded-full backdrop-blur-md transition shadow-md ${
                isWishlisted(product.id) ? 'bg-[#000000] text-white' : 'bg-white/90 text-gray-600 hover:text-[#000000]'
              }`}
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart size={18} fill={isWishlisted(product.id) ? "currentColor" : "none"} />
            </button>
          </div>

          {/* Vertical Thumbnails */}
          <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImgIndex(idx)}
                className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden border-2 transition shrink-0 ${
                  selectedImgIndex === idx ? 'border-[#000000] shadow-md scale-105' : 'border-gray-200 opacity-70 hover:opacity-100'
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
            <span className="text-xs font-bold uppercase tracking-wider text-[#000000] bg-[#F5F5F5] px-3 py-1 rounded-full">
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
                <span className="bg-[#000000] text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
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
                Color Options: <span className="text-[#000000]">{selectedColor}</span>
              </label>
              <div className="flex items-center gap-3">
                {product.colors.map(color => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-9 h-9 rounded-full border-2 p-0.5 transition flex items-center justify-center ${
                      selectedColor === color.name ? 'border-[#000000] scale-110 shadow-md' : 'border-transparent opacity-80'
                    }`}
                    title={color.name}
                  >
                    <span className="w-full h-full rounded-full border border-black/10 block" style={{ backgroundColor: color.hex }}></span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Customization Link */}
          <button
            onClick={() => {
              if (customizeRef.current) {
                customizeRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="w-full bg-[#F5F5F5] hover:bg-[#E5E5E5] text-[#000000] border border-[#E5E5E5] border-dashed font-bold py-3 px-4 rounded-xl transition flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Upload size={18} />
              <span>Add Your Logo & Customize</span>
            </div>
            <ArrowRight size={16} />
          </button>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Quantity:</label>
            <div className="flex items-center border border-gray-300 rounded-full bg-white px-2 py-1">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-1 hover:text-[#000000]"
              >
                <Minus size={14} />
              </button>
              <span className="px-4 text-sm font-bold text-gray-900">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="p-1 hover:text-[#000000]"
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
              className="flex-1 bg-[#000000] hover:bg-[#111111] text-white font-bold py-3.5 px-6 rounded-full shadow-lg transition flex items-center justify-center gap-2"
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
              <Truck size={18} className="text-[#000000]" />
              <span>PAN India Delivery</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck size={18} className="text-[#000000]" />
              <span>Secure Packaging</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Headphones size={18} className="text-[#000000]" />
              <span>Dedicated Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* CUSTOMIZE THIS PRODUCT FORM */}
      <div 
        ref={customizeRef} 
        className="bg-white rounded-3xl border border-[#ECE7E8] p-5 lg:p-10 shadow-sm relative overflow-hidden"
      >
        {/* Success Overlay */}
        {isSubmitted ? (
          <div className="absolute inset-0 z-10 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center text-center animate-fade-in px-4">
            <div className="w-16 h-16 bg-[#000000] text-white rounded-full flex items-center justify-center mb-6 shadow-xl">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Request Submitted!</h2>
            <p className="text-gray-500 max-w-md mx-auto mb-8">
              Thank you for choosing Corekraft. Our team will review your customization requirements and get back to you with a mock-up and quote within 24 hours.
            </p>
            <button 
              onClick={() => setIsSubmitted(false)}
              className="btn btn-secondary px-8 py-3 font-bold"
            >
              Submit Another Request
            </button>
          </div>
        ) : null}

        <div className="flex flex-col md:flex-row gap-6 lg:gap-12">
          {/* Left Column: Intro */}
          <div className="md:w-1/3">
            <span className="badge-label mb-2">MAKE IT YOURS</span>
            <h2 className="text-3xl font-extrabold text-gray-900 leading-tight mb-4">
              Customize This Product
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              Add your company logo, choose placements, and get a professional mock-up. Perfect for corporate gifting, events, and brand merchandise.
            </p>
            <div className="bg-[#F5F5F5] rounded-2xl p-5 border border-[#E5E5E5]">
              <div className="flex gap-4 items-start mb-4">
                <div className="w-10 h-10 rounded-full bg-white text-[#000000] flex items-center justify-center shrink-0 shadow-sm">
                  <Upload size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Upload Your Logo</h4>
                  <p className="text-xs text-gray-500 mt-1">We support PNG, JPG, SVG, AI, and PDF formats.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-white text-[#000000] flex items-center justify-center shrink-0 shadow-sm">
                  <FileText size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Get a Free Mockup</h4>
                  <p className="text-xs text-gray-500 mt-1">Our design team will send you a digital proof before production.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="md:w-2/3">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                setIsSubmitting(true);
                setTimeout(() => {
                  setIsSubmitting(false);
                  setIsSubmitted(true);
                }, 1500);
              }} 
              className="space-y-6"
            >
              {/* Your Details */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-gray-900 border-b pb-2">Your Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Name *</label>
                    <input type="text" required value={custName} onChange={e=>setCustName(e.target.value)} className="w-full text-sm p-3 rounded-xl border border-gray-200 outline-none focus:border-[#000000] focus:ring-1 focus:ring-[#000000] transition bg-gray-50" placeholder="John Doe" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Company Name *</label>
                    <input type="text" required value={custCompany} onChange={e=>setCustCompany(e.target.value)} className="w-full text-sm p-3 rounded-xl border border-gray-200 outline-none focus:border-[#000000] focus:ring-1 focus:ring-[#000000] transition bg-gray-50" placeholder="Your Company Ltd." />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Phone / WhatsApp *</label>
                    <input type="tel" required value={custPhone} onChange={e=>setCustPhone(e.target.value)} className="w-full text-sm p-3 rounded-xl border border-gray-200 outline-none focus:border-[#000000] focus:ring-1 focus:ring-[#000000] transition bg-gray-50" placeholder="+91 98765 43210" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Email Address *</label>
                    <input type="email" required value={custEmail} onChange={e=>setCustEmail(e.target.value)} className="w-full text-sm p-3 rounded-xl border border-gray-200 outline-none focus:border-[#000000] focus:ring-1 focus:ring-[#000000] transition bg-gray-50" placeholder="john@company.com" />
                  </div>
                </div>
              </div>

              {/* Logo & Customization */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-gray-900 border-b pb-2">Logo & Branding</h3>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Upload Your Logo *</label>
                  <div className="border-2 border-dashed border-gray-300 hover:border-[#000000] bg-gray-50 p-6 rounded-xl text-center relative cursor-pointer transition">
                    <input 
                      type="file" 
                      accept=".jpg,.png,.svg,.pdf,.ai" 
                      onChange={handleLogoChange}
                      required
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-[#000000]">
                        <Upload size={20} />
                      </div>
                      <span className="font-bold text-sm text-gray-800">
                        {logoFile ? `Selected: ${logoFile.name}` : 'Click to upload your logo'}
                      </span>
                      <span className="text-xs text-gray-500">PNG, JPG, PDF, SVG or AI (Max 10MB)</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Placement */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-700">Logo Placement *</label>
                    <div className="flex flex-wrap gap-2">
                      {['Front', 'Back', 'Left', 'Right', 'Custom'].map(pos => (
                        <button
                          key={pos}
                          type="button"
                          onClick={() => setLogoPlacement(pos)}
                          className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition ${
                            logoPlacement === pos 
                              ? 'bg-[#000000] text-white border-[#000000]' 
                              : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {pos}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Size */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-700">Logo Size *</label>
                    <div className="flex flex-wrap gap-2">
                      {['Small', 'Medium', 'Large'].map(sz => (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => setLogoSize(sz)}
                          className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition ${
                            logoSize === sz 
                              ? 'bg-[#000000] text-white border-[#000000]' 
                              : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Customization Notes (Optional)</label>
                  <textarea 
                    value={custNotes}
                    onChange={e=>setCustNotes(e.target.value)}
                    rows={2}
                    className="w-full text-sm p-3 rounded-xl border border-gray-200 outline-none focus:border-[#000000] focus:ring-1 focus:ring-[#000000] transition bg-gray-50 resize-none"
                    placeholder="Tell us about specific colors, taglines, or positioning..."
                  ></textarea>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 flex items-center justify-between border-t border-gray-100">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" required className="w-4 h-4 rounded text-[#000000] focus:ring-[#000000] cursor-pointer" />
                  <span className="text-xs text-gray-500 group-hover:text-gray-800 transition">I agree to be contacted about this request. *</span>
                </label>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-[#000000] hover:bg-[#111111] text-white font-bold py-3.5 px-8 rounded-full shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing
                    </span>
                  ) : (
                    <>Submit Customization <ArrowRight size={18} /></>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* PRODUCT DETAIL INFORMATION TABS */}
      <div className="bg-white rounded-3xl border border-[#ECE7E8] p-5 lg:p-8 space-y-4 lg:space-y-6">
        <div className="flex border-b border-[#ECE7E8] gap-6 text-sm font-bold">
          {['description', 'specifications', 'branding', 'shipping', 'reviews'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 capitalize transition border-b-2 ${
                activeTab === tab ? 'border-[#000000] text-[#000000]' : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              {tab === 'branding' ? 'Branding Options' : tab === 'shipping' ? 'Shipping & Returns' : tab === 'reviews' ? 'Reviews & Ratings' : tab}
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
                    <CheckCircle2 size={16} className="text-[#000000] shrink-0" />
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

          {activeTab === 'reviews' && (
            <div className="space-y-8">
              {/* Rating Summary */}
              <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start bg-gray-50 p-6 rounded-2xl">
                <div className="text-center sm:text-left">
                  <h3 className="text-5xl font-extrabold text-gray-900">{product.rating || "4.8"}</h3>
                  <div className="flex text-amber-400 my-2 justify-center sm:justify-start">
                    {[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-amber-400" />)}
                  </div>
                  <p className="text-xs text-gray-500">Based on {product.reviewCount || "24"} reviews</p>
                </div>
                
                <div className="flex-1 w-full space-y-2">
                  {[
                    { stars: 5, pct: 85 },
                    { stars: 4, pct: 10 },
                    { stars: 3, pct: 5 },
                    { stars: 2, pct: 0 },
                    { stars: 1, pct: 0 }
                  ].map((row) => (
                    <div key={row.stars} className="flex items-center gap-3 text-xs">
                      <span className="w-12 text-gray-600 font-medium">{row.stars} Stars</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full" style={{ width: `${row.pct}%` }}></div>
                      </div>
                      <span className="w-8 text-right text-gray-500">{row.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured Testimonial */}
              <div className="space-y-4">
                <h4 className="font-bold text-gray-900">Featured Testimonial</h4>
                <div className="bg-white border border-[#ECE7E8] p-5 rounded-2xl shadow-sm relative">
                  <div className="absolute top-4 right-4 text-gray-200">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                    </svg>
                  </div>
                  <div className="flex text-amber-400 mb-3">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-amber-400" />)}
                  </div>
                  <p className="text-gray-700 italic mb-4 relative z-10 leading-relaxed">
                    "{product.testimonial?.quote || `We ordered these ${product.name} for our annual corporate retreat, and the quality completely exceeded our expectations. The custom laser engraving was precise, and the packaging felt incredibly premium. Our employees loved them!`}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#F5F5F5] text-[#000000] flex items-center justify-center font-bold">
                      {product.testimonial?.initials || "SK"}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{product.testimonial?.name || "Sarah K."}</p>
                      <p className="text-xs text-gray-500">{product.testimonial?.role || "HR Director, TechFlow Inc."}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
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
