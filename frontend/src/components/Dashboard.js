import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { restaurantAPI, orderAPI } from '../services/api';
import RestaurantCard from './RestaurantCard';
import OrderModal from './OrderModal';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();

  useEffect(() => {
    fetchRestaurants();
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchRestaurants = async () => {
    try {
      const response = await restaurantAPI.getAll();
      setRestaurants(response.data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await orderAPI.getUserOrders(user.id);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleOrderPlaced = () => {
    fetchOrders();
    setSelectedRestaurant(null);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="container">
          <h1>🍽️ Restaurant Inventory</h1>
          <div className="header-actions">
            <span className="welcome-text">Welcome, {user?.username}!</span>
            <button onClick={logout} className="btn btn-secondary">Logout</button>
          </div>
        </div>
      </header>

      <main className="container">
        <section className="restaurants-section">
          <h2 className="section-title">Available Restaurants</h2>
          {restaurants.length === 0 ? (
            <p className="empty-state">No restaurants available</p>
          ) : (
            <div className="grid grid-3">
              {restaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  onSelect={() => setSelectedRestaurant(restaurant)}
                />
              ))}
            </div>
          )}
        </section>

        <section className="orders-section">
          <h2 className="section-title">My Orders</h2>
          {orders.length === 0 ? (
            <p className="empty-state">No orders yet</p>
          ) : (
            <div className="orders-list">
              {orders.map((order) => (
                <div key={order.id} className="order-card card">
                  <div className="order-header">
                    <h3>{order.restaurantName}</h3>
                    <span className={`status-badge status-${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="order-items">
                    {order.items.map((item, index) => (
                      <div key={index} className="order-item">
                        <span>{item.name} x{item.quantity}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="order-total">
                    <strong>Total: ${order.totalAmount.toFixed(2)}</strong>
                  </div>
                  <div className="order-date">
                    {new Date(order.orderDate).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {selectedRestaurant && (
        <OrderModal
          restaurant={selectedRestaurant}
          userId={user.id}
          onClose={() => setSelectedRestaurant(null)}
          onOrderPlaced={handleOrderPlaced}
        />
      )}
    </div>
  );
};

export default Dashboard;

