import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], tip: 0, donation: false });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchCart = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const response = await api.get('/cart');
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart({ items: [], tip: 0, donation: false });
    }
  }, [user]);

  const addToCart = async (productId, quantity = 1) => {
    if (!user) return;
    try {
      const response = await api.post('/cart/add', { productId, quantity });
      setCart(response.data);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (!user) return;
    try {
      const response = await api.put('/cart/update', { productId, quantity });
      setCart(response.data);
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const removeFromCart = async (productId) => {
    if (!user) return;
    try {
      const response = await api.delete(`/cart/remove/${productId}`);
      setCart(response.data);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateTipAndDonation = async (tip, donation) => {
    if (!user) return;
    try {
      const response = await api.put('/cart/update-tip', { tip, donation });
      setCart(response.data);
    } catch (error) {
      console.error('Error updating tip/donation:', error);
    }
  };

  const calculateTotals = () => {
    const subtotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryCharge = subtotal > 0 ? 25 : 0;
    const handlingCharge = subtotal > 0 ? 2 : 0;
    const smallCartCharge = subtotal > 0 && subtotal < 100 ? 20 : 0;
    const donation = cart.donation ? 1 : 0;
    const tip = cart.tip || 0;
    const total = subtotal + deliveryCharge + handlingCharge + smallCartCharge + donation + tip;
    
    return { subtotal, deliveryCharge, handlingCharge, smallCartCharge, donation, tip, total };
  };

  const clearCart = () => {
    setCart({ items: [], tip: 0, donation: false });
  };

  return (
    <CartContext.Provider value={{
      cart,
      loading,
      addToCart,
      updateQuantity,
      removeFromCart,
      updateTipAndDonation,
      calculateTotals,
      clearCart,
      fetchCart
    }}>
      {children}
    </CartContext.Provider>
  );
};