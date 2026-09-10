import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';

export default function ProductCard({ 
  product, 
  onSelectProduct, 
  onAddToCart, 
  onToggleWishlist, 
  isWishlisted 
}) {
  return (
    <div className="bg-white rounded-[24px] p-3 shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] transition-shadow duration-300 flex flex-col relative w-full border border-gray-100 h-full">
      {/* Product Image Container */}
      <div 
        className="relative bg-gray-100 rounded-[18px] mb-4 cursor-pointer overflow-hidden aspect-[4/5] flex justify-center items-center group"
        onClick={() => onSelectProduct(product)}
      >
        {/* Default Image */}
        <img 
          src={product.images ? product.images[0] : product.image} 
          alt={product.name} 
          className={`absolute inset-0 m-auto w-[90%] h-[90%] object-contain transition-all duration-500 mix-blend-multiply ${
            product.images && product.images.length > 1 ? 'group-hover:opacity-0 group-hover:scale-95' : 'group-hover:scale-105'
          }`}
          loading="lazy"
        />
        
        {/* Hover Image (only if second image exists) */}
        {product.images && product.images.length > 1 && (
          <img 
            src={product.images[1]} 
            alt={`${product.name} alternate view`} 
            className="absolute inset-0 m-auto w-[90%] h-[90%] object-contain transition-all duration-500 mix-blend-multiply opacity-0 scale-105 group-hover:opacity-100 group-hover:scale-100"
            loading="lazy"
          />
        )}
        
        {/* Wishlist Heart Action */}
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleWishlist(product); }}
          className="absolute top-3 right-3 bg-white w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-[#EE3364] shadow-sm transition z-10 hover:scale-110"
          title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          aria-label={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <Heart size={16} strokeWidth={2.5} fill={isWishlisted ? "#EE3364" : "none"} className={isWishlisted ? "text-[#EE3364]" : ""} />
        </button>
      </div>

      {/* Content Body */}
      <div className="px-1 pb-1 flex flex-col flex-1">
        {/* Title */}
        <h3 
          onClick={() => onSelectProduct(product)}
          className="text-[15px] font-bold text-gray-800 cursor-pointer line-clamp-1 leading-snug mb-3"
        >
          {product.name}
        </h3>

        {/* Variants / Pills */}
        <div className="flex flex-wrap gap-2 mb-3">
          {product.colors ? product.colors.slice(0, 4).map((c, i) => (
             <span key={i} className={`text-[10px] px-2.5 py-1 rounded-full border ${i === 0 ? 'bg-orange-100 border-orange-200 text-orange-800 font-semibold' : 'border-gray-200 text-gray-500 bg-white'}`}>
               {c.name.split(' ')[0]}
             </span>
          )) : (
            <>
              <span className="text-[10px] px-2.5 py-1 rounded-full border bg-orange-100 border-orange-200 text-orange-800 font-semibold">Standard</span>
              <span className="text-[10px] px-2.5 py-1 rounded-full border border-gray-200 text-gray-500 bg-white">Premium</span>
            </>
          )}
        </div>

        {/* Description */}
        <p className="text-[11px] text-gray-500 leading-[1.6] line-clamp-3 mb-5 flex-1">
          {product.description || "Stay on top of your daily goals with this premium corporate gift featuring an innovative and functional design."}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between gap-2 md:gap-3 mt-auto pt-1">
          {/* Pricing */}
          <span className="text-[16px] md:text-[18px] font-extrabold text-gray-800 shrink-0">
            ₹{product.price.toLocaleString()}
          </span>

          {/* Add to Cart Button */}
          <button 
            onClick={() => onAddToCart(product)}
            className="flex-1 min-w-0 bg-[#EE3364] hover:bg-[#D92756] text-white py-2 md:py-2.5 px-2 md:px-4 rounded-xl text-[11px] md:text-[13px] font-bold transition duration-200 flex items-center justify-center gap-1.5 shadow-[0_4px_12px_rgba(238,51,100,0.25)] hover:shadow-[0_6px_16px_rgba(238,51,100,0.35)] whitespace-nowrap"
          >
            <ShoppingCart size={14} strokeWidth={2.5} className="shrink-0 hidden sm:block md:hidden lg:block" />
            <span className="truncate">Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}
