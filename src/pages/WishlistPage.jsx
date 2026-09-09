import React from 'react';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';

export default function WishlistPage({ wishlist, onSelectProduct, onAddToCart, onToggleWishlist, onNavigateShop }) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <span className="badge-label mb-1">SAVED ITEMS</span>
          <h1 className="text-3xl font-extrabold text-gray-900">Your Wishlist</h1>
        </div>
        <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {wishlist.length} Saved Items
        </span>
      </div>

      {wishlist.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#ECE7E8] p-12 text-center space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 bg-[#FFF3F6] text-[#EE3364] rounded-full flex items-center justify-center mx-auto">
            <Heart size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Your wishlist is empty</h3>
          <p className="text-xs text-gray-500">Save products to your wishlist while exploring our catalog.</p>
          <button onClick={onNavigateShop} className="btn btn-primary btn-sm">
            Explore Corporate Gifts <ArrowRight size={14} />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {wishlist.map(product => (
            <ProductCard 
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}
