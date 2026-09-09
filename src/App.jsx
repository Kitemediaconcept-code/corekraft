import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import PredictiveSearch from './components/PredictiveSearch';

import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CustomBrandingPage from './pages/CustomBrandingPage';
import CorporateSolutionsPage from './pages/CorporateSolutionsPage';
import AboutPage from './pages/AboutPage';
import CorporateQuotePage from './pages/CorporateQuotePage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import WishlistPage from './pages/WishlistPage';
import AccountPage from './pages/AccountPage';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/AdminDashboard';

import { PRODUCTS } from './data/products';
import { supabase } from './supabaseClient';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState(PRODUCTS); // fallback to static data until Supabase loads
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
  const [cartItems, setCartItems] = useState([
    {
      ...PRODUCTS[0],
      quantity: 10,
      selectedColor: 'Red',
      hasLogo: true
    }
  ]);
  const [wishlist, setWishlist] = useState([PRODUCTS[1]]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Fetch products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        // Map Supabase fields to match the existing product shape
        const mapped = data.map(p => ({
          ...p,
          categoryName: p.category ? p.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : '',
          originalPrice: p.original_price,
          images: p.images || [],
          colors: p.colors || [],
          highlights: p.highlights || [],
          inStock: p.in_stock !== false,
          moq: p.moq || 10,
          rating: p.rating || 4.8,
          reviewCount: p.review_count || 0,
          featured: p.featured || false,
        }));
        setProducts(mapped);
        setSelectedProduct(mapped[0]);
      }
    };
    fetchProducts();
  }, []);

  // Scroll to top on page transition
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage, selectedProduct]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAddToCart = (productToAdd) => {
    setCartItems(prev => {
      const existingIdx = prev.findIndex(item => item.id === productToAdd.id && item.selectedColor === productToAdd.selectedColor);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += (productToAdd.quantity || 1);
        return updated;
      }
      return [...prev, { ...productToAdd, quantity: productToAdd.quantity || 10 }];
    });
    showToast(`Added "${productToAdd.name}" to cart!`);
    setIsCartOpen(true);
  };

  const handleToggleWishlist = (prod) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === prod.id);
      if (exists) {
        showToast(`Removed "${prod.name}" from wishlist.`);
        return prev.filter(item => item.id !== prod.id);
      } else {
        showToast(`Saved "${prod.name}" to wishlist!`);
        return [...prev, prod];
      }
    });
  };

  const handleUpdateQty = (itemId, newQty) => {
    if (newQty <= 0) {
      handleRemoveCartItem(itemId);
      return;
    }
    setCartItems(prev => prev.map(item => item.id === itemId ? { ...item, quantity: newQty } : item));
  };

  const handleRemoveCartItem = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
    showToast('Item removed from cart');
  };

  const handleSelectProduct = (prod) => {
    setSelectedProduct(prod);
    setActivePage('product-detail');
  };

  const handleCompleteOrder = (orderData) => {
    setLastOrder(orderData);
    setCartItems([]);
    setActivePage('order-success');
    showToast(`Order ${orderData.orderNumber} placed successfully!`);
  };

  const storeUI = (
    <div className="min-h-screen flex flex-col bg-[#FFFCFC] text-[#151515] font-sans antialiased">
      {/* Toast Notification Floating */}
      {toastMessage && (
        <div className="toast-container">
          <div className="toast">
            <CheckCircle2 size={18} className="text-[#EE3364]" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Header Navigation Bar */}
      <Header 
        activePage={activePage}
        setActivePage={setActivePage}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Main Page Routing Switcher */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage 
            setActivePage={setActivePage}
            setSelectedCategory={setSelectedCategory}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlist={wishlist}
            products={products}
          />
        )}

        {activePage === 'shop' && (
          <ShopPage 
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlist={wishlist}
            products={products}
          />
        )}

        {activePage === 'product-detail' && (
          <ProductDetailPage 
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={wishlist.some(item => item.id === selectedProduct?.id)}
            onSelectProduct={handleSelectProduct}
            onNavigateQuote={() => setActivePage('quote')}
          />
        )}

        {activePage === 'custom-branding' && (
          <CustomBrandingPage 
            onNavigateShop={() => setActivePage('shop')}
            onNavigateQuote={() => setActivePage('quote')}
          />
        )}

        {activePage === 'solutions' && (
          <CorporateSolutionsPage 
            onNavigateQuote={() => setActivePage('quote')}
          />
        )}

        {activePage === 'about' && (
          <AboutPage 
            onNavigateShop={() => setActivePage('shop')}
            onNavigateQuote={() => setActivePage('quote')}
          />
        )}

        {activePage === 'quote' && (
          <CorporateQuotePage />
        )}

        {activePage === 'checkout' && (
          <CheckoutPage 
            cartItems={cartItems}
            onCompleteOrder={handleCompleteOrder}
            onNavigateShop={() => setActivePage('shop')}
          />
        )}

        {activePage === 'order-success' && (
          <OrderSuccessPage 
            order={lastOrder}
            onNavigateAccount={() => setActivePage('account')}
            onNavigateHome={() => setActivePage('home')}
          />
        )}

        {activePage === 'wishlist' && (
          <WishlistPage 
            wishlist={wishlist}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            onNavigateShop={() => setActivePage('shop')}
          />
        )}

        {activePage === 'account' && (
          <AccountPage 
            userOrders={lastOrder ? [lastOrder] : []}
            wishlist={wishlist}
            onSelectProduct={handleSelectProduct}
            onNavigateShop={() => setActivePage('shop')}
          />
        )}

        {activePage === 'contact' && (
          <ContactPage />
        )}
      </main>

      {/* Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveCartItem}
        onNavigateCheckout={() => setActivePage('checkout')}
        onNavigateQuote={() => setActivePage('quote')}
      />

      {/* Predictive Search Overlay */}
      <PredictiveSearch 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={handleSelectProduct}
        onSelectCategory={(catId) => { setSelectedCategory(catId); setActivePage('shop'); }}
      />

      {/* Footer */}
      <Footer 
        setActivePage={setActivePage}
        setSelectedCategory={setSelectedCategory}
      />
    </div>
  );

  return (
    <Routes>
      <Route path="/admin" element={<AdminDashboard onNavigateHome={() => { window.location.href = '/'; }} />} />
      <Route path="/*" element={storeUI} />
    </Routes>
  );
}
