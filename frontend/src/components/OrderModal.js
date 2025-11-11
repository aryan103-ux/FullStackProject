import React, { useState } from 'react';
import { orderAPI } from '../services/api';
import '../styles/OrderModal.css';

const OrderModal = ({ restaurant, userId, onClose, onOrderPlaced }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const addToCart = (menuItem) => {
    const itemId = menuItem.id || menuItem.menuItemId || Math.random().toString();
    const existingItem = cart.find(item => item.menuItemId === itemId);
    if (existingItem) {
      setCart(cart.map(item =>
        item.menuItemId === itemId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, {
        menuItemId: itemId,
        name: menuItem.name,
        quantity: 1,
        price: menuItem.price
      }]);
    }
  };

  const updateQuantity = (menuItemId, delta) => {
    setCart(cart.map(item => {
      if (item.menuItemId === menuItemId) {
        const newQuantity = item.quantity + delta;
        if (newQuantity <= 0) {
          return null;
        }
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(Boolean));
  };

  const removeFromCart = (menuItemId) => {
    setCart(cart.filter(item => item.menuItemId !== menuItemId));
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return;

    setLoading(true);
    try {
      const order = {
        userId,
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
        items: cart,
        totalAmount: getTotal(),
        status: 'PENDING'
      };

      await orderAPI.create(order);
      onOrderPlaced();
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{restaurant.name} - Menu</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div className="menu-section">
            <h3>Menu Items</h3>
            <div className="menu-items">
              {restaurant.menu?.map((item, index) => (
                <div key={index} className="menu-item card">
                  <div className="menu-item-info">
                    <h4>{item.name}</h4>
                    <p className="menu-item-description">{item.description}</p>
                    <div className="menu-item-footer">
                      <span className="menu-item-price">${item.price.toFixed(2)}</span>
                      <span className="menu-item-stock">Stock: {item.quantity}</span>
                    </div>
                  </div>
                  <button
                    className="btn btn-primary"
                    onClick={() => addToCart(item)}
                    disabled={item.quantity === 0}
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="cart-section">
            <h3>Cart ({cart.length})</h3>
            {cart.length === 0 ? (
              <p className="empty-cart">Your cart is empty</p>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div key={item.menuItemId} className="cart-item">
                      <div className="cart-item-info">
                        <span className="cart-item-name">{item.name}</span>
                        <span className="cart-item-price">${item.price.toFixed(2)}</span>
                      </div>
                      <div className="cart-item-controls">
                        <button
                          className="quantity-btn"
                          onClick={() => updateQuantity(item.menuItemId, -1)}
                        >
                          -
                        </button>
                        <span className="cart-item-quantity">{item.quantity}</span>
                        <button
                          className="quantity-btn"
                          onClick={() => updateQuantity(item.menuItemId, 1)}
                        >
                          +
                        </button>
                        <button
                          className="remove-btn"
                          onClick={() => removeFromCart(item.menuItemId)}
                        >
                          Remove
                        </button>
                      </div>
                      <div className="cart-item-total">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cart-total">
                  <strong>Total: ${getTotal().toFixed(2)}</strong>
                </div>
                <button
                  className="btn btn-success place-order-btn"
                  onClick={handlePlaceOrder}
                  disabled={loading}
                >
                  {loading ? 'Placing Order...' : 'Place Order'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;

