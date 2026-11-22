import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useAuth } from './AuthContext';
import { getProductById } from '../data/products';

const ShopContext = createContext(null);
const API = '/api';

function readLocal(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function ShopProvider({ children }) {
  const { token } = useAuth();
  const [cart, setCart] = useState(() => readLocal('pawquest_cart', []));
  const [wishlist, setWishlist] = useState(() => readLocal('pawquest_wishlist', []));
  const [toast, setToast] = useState(null);
  const hydratedFor = useRef('');

  useEffect(() => { localStorage.setItem('pawquest_cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('pawquest_wishlist', JSON.stringify(wishlist)); }, [wishlist]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    async function syncFromServer() {
      if (!token) { hydratedFor.current = ''; return; }
      if (hydratedFor.current === token) return;
      try {
        const [cartRes, wishRes] = await Promise.all([
          fetch(`${API}/cart`, { headers: { 'x-user-id': token } }),
          fetch(`${API}/wishlist`, { headers: { 'x-user-id': token } })
        ]);
        if (cartRes.ok) {
          const data = await cartRes.json();
          const serverItems = Array.isArray(data.items) ? data.items : [];
          setCart((local) => mergeCart(serverItems, local));
        }
        if (wishRes.ok) {
          const data = await wishRes.json();
          const serverItems = Array.isArray(data.items) ? data.items : [];
          setWishlist((local) => Array.from(new Set([...serverItems, ...local])));
        }
        hydratedFor.current = token;
      } catch {
        // keep local state if server unavailable
      }
    }
    syncFromServer();
  }, [token]);

  useEffect(() => {
    async function push() {
      if (!token) return;
      try {
        await fetch(`${API}/cart`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'x-user-id': token },
          body: JSON.stringify({ items: cart })
        });
      } catch {}
    }
    push();
  }, [cart, token]);

  useEffect(() => {
    async function push() {
      if (!token) return;
      try {
        await fetch(`${API}/wishlist`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'x-user-id': token },
          body: JSON.stringify({ items: wishlist })
        });
      } catch {}
    }
    push();
  }, [wishlist, token]);

  const notify = (message, type = 'success') => setToast({ message, type });

  const addToCart = (productId, qty = 1) => {
    const product = getProductById(productId);
    if (!product) return;
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      if (existing) {
        return prev.map((i) => i.productId === productId ? { ...i, quantity: Math.min(i.quantity + qty, 99) } : i);
      }
      return [...prev, { productId, quantity: qty }];
    });
    notify(`${product.name} added to cart`);
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((i) => i.productId !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    const qty = Math.max(1, Math.min(99, Number(quantity) || 1));
    setCart((prev) => prev.map((i) => i.productId === productId ? { ...i, quantity: qty } : i));
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId) => {
    const product = getProductById(productId);
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        notify(`${product?.name || 'Item'} removed from wishlist`, 'info');
        return prev.filter((id) => id !== productId);
      }
      notify(`${product?.name || 'Item'} saved to wishlist`);
      return [...prev, productId];
    });
  };

  const cartDetailed = useMemo(() => cart.map((item) => {
    const product = getProductById(item.productId);
    return product ? { ...item, product, lineTotal: product.price * item.quantity } : null;
  }).filter(Boolean), [cart]);

  const cartCount = useMemo(() => cart.reduce((s, i) => s + i.quantity, 0), [cart]);
  const cartTotal = useMemo(() => cartDetailed.reduce((s, i) => s + i.lineTotal, 0), [cartDetailed]);

  const value = {
    cart, wishlist, cartDetailed, cartCount, cartTotal, toast,
    addToCart, removeFromCart, updateQuantity, clearCart, toggleWishlist, notify
  };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

function mergeCart(serverItems, localItems) {
  const map = new Map();
  [...serverItems, ...localItems].forEach((item) => {
    if (!item || !item.productId) return;
    const prev = map.get(item.productId) || 0;
    map.set(item.productId, Math.min(99, prev + (Number(item.quantity) || 1)));
  });
  return Array.from(map.entries()).map(([productId, quantity]) => ({ productId, quantity }));
}

export function useShop() {
  return useContext(ShopContext);
}
