import React from 'react';
import { Heart, Star, ShoppingCart } from 'lucide-react';

export default function ProductCard({ 
  product, 
  onSelectProduct, 
  onAddToCart, 
  onToggleWishlist, 
  isWishlisted 
}) {
  return (
    <div className="group glass-card glass-card-overflow rounded-2xl hover:shadow-lg transition-all duration-300 flex flex-col relative">
      {/* Product Image Container */}
      <div 
        className="relative pt-6 pb-4 px-4 cursor-pointer flex justify-center items-center" 
        onClick={() => onSelectProduct(product)}
      >
        <img 
          src={product.images ? product.images[0] : product.image} 
          alt={product.name} 
          className="h-48 w-auto object-contain group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Wishlist Heart Action */}
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleWishlist(product); }}
          className="absolute top-4 right-4 text-gray-500 hover:text-[#EE3364] transition"
          title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          aria-label={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <Heart size={20} strokeWidth={1.5} fill={isWishlisted ? "#EE3364" : "none"} className={isWishlisted ? "text-[#EE3364]" : ""} />
        </button>
      </div>

      {/* Content Body */}
      <div className="px-5 pb-5 flex flex-col justify-between flex-1">
        <div>
          {/* Title */}
          <h3 
            onClick={() => onSelectProduct(product)}
            className="text-sm font-bold text-gray-900 hover:text-[#EE3364] transition cursor-pointer line-clamp-1 leading-snug mb-1"
          >
            {product.name}
          </h3>

          {/* Pricing */}
          <div className="flex items-baseline gap-1.5 mb-2">
            <span className="text-[17px] font-extrabold text-gray-900">₹ {product.price.toLocaleString()}</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-4">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <span className="text-gray-400 text-[11px] font-medium ml-1">({product.reviewCount || 24})</span>
          </div>
        </div>

        {/* Customization Quick Link */}
        <button
          onClick={() => onSelectProduct(product, { openCustomize: true })}
          className="w-full text-xs font-bold text-[#EE3364] hover:text-[#D92756] transition mb-2 flex items-center justify-center gap-1 bg-[#FFF3F6] py-1.5 rounded-lg border border-transparent hover:border-[#FAD9E2]"
        >
          Add Your Logo <span className="text-[10px]">→</span>
        </button>

        {/* Add to Cart Button */}
        <button 
          onClick={() => onAddToCart(product)}
          className="w-full bg-[#FFF3F6] hover:bg-[#EE3364] text-[#EE3364] hover:text-white border border-[#FAD9E2] hover:border-[#EE3364] py-2 rounded-xl text-[13px] font-bold transition duration-200 flex items-center justify-center gap-2"
        >
          <ShoppingCart size={16} strokeWidth={2} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
