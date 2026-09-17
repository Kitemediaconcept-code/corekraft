import { create } from 'zustand';
import { PRODUCTS } from '../data/products';

export const useStore = create((set, get) => ({
  // Auth State
  isAuthenticated: false,
  setIsAuthenticated: (status) => set({ isAuthenticated: status }),

  // User State
  lastOrder: null,
  setLastOrder: (order) => set({ lastOrder: order }),

  // UI State
  toastMessage: null,
  showToast: (msg) => {
    set({ toastMessage: msg });
    setTimeout(() => set({ toastMessage: null }), 3500);
  },
  isCartOpen: false,
  setIsCartOpen: (status) => set({ isCartOpen: status }),
  isSearchOpen: false,
  setIsSearchOpen: (status) => set({ isSearchOpen: status }),

  // Product State
  products: PRODUCTS,
  setProducts: (products) => set({ products }),
  selectedCategory: 'all',
  setSelectedCategory: (category) => set({ selectedCategory: category }),

  // Cart State
  cartItems: [],
  addToCart: (productToAdd) => {
    const { cartItems, showToast } = get();
    const existingIdx = cartItems.findIndex(
      (item) => item.id === productToAdd.id && item.selectedColor === productToAdd.selectedColor
    );
    
    let updatedCart = [...cartItems];
    if (existingIdx > -1) {
      updatedCart[existingIdx].quantity += (productToAdd.quantity || 1);
    } else {
      updatedCart = [...cartItems, { ...productToAdd, quantity: productToAdd.quantity || 10 }];
    }
    
    set({ cartItems: updatedCart, isCartOpen: true });
    showToast(`Added "${productToAdd.name}" to cart!`);
  },
  updateCartItemQty: (itemId, newQty) => {
    if (newQty <= 0) {
      get().removeFromCart(itemId);
      return;
    }
    set((state) => ({
      cartItems: state.cartItems.map((item) => (item.id === itemId ? { ...item, quantity: newQty } : item)),
    }));
  },
  removeFromCart: (itemId) => {
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== itemId),
    }));
    get().showToast('Item removed from cart');
  },
  clearCart: () => set({ cartItems: [] }),

  // Wishlist State
  wishlist: [],
  toggleWishlist: (product) => {
    const { wishlist, showToast } = get();
    const exists = wishlist.some((item) => item.id === product.id);
    
    if (exists) {
      set({ wishlist: wishlist.filter((item) => item.id !== product.id) });
      showToast(`Removed "${product.name}" from wishlist.`);
    } else {
      set({ wishlist: [...wishlist, product] });
      showToast(`Saved "${product.name}" to wishlist!`);
    }
  },
}));
