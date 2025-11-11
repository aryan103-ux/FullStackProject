import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { restaurantAPI } from '../services/api';
import RestaurantForm from './RestaurantForm';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [editingRestaurant, setEditingRestaurant] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();

  useEffect(() => {
    fetchRestaurants();
  }, []);

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

  const handleCreate = () => {
    setEditingRestaurant(null);
    setShowForm(true);
  };

  const handleEdit = (restaurant) => {
    setEditingRestaurant(restaurant);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this restaurant?')) {
      try {
        await restaurantAPI.delete(id);
        fetchRestaurants();
      } catch (error) {
        console.error('Error deleting restaurant:', error);
        alert('Failed to delete restaurant');
      }
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingRestaurant(null);
  };

  const handleFormSubmit = () => {
    fetchRestaurants();
    handleFormClose();
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <div className="container">
          <h1>🍽️ Restaurant Inventory - Admin Panel</h1>
          <div className="header-actions">
            <span className="welcome-text">Welcome, {user?.username}!</span>
            <button onClick={logout} className="btn btn-secondary">Logout</button>
          </div>
        </div>
      </header>

      <main className="container">
        <div className="admin-actions">
          <button onClick={handleCreate} className="btn btn-primary">
            + Add New Restaurant
          </button>
        </div>

        <section className="restaurants-section">
          <h2 className="section-title">Restaurants</h2>
          {restaurants.length === 0 ? (
            <p className="empty-state">No restaurants. Create one to get started!</p>
          ) : (
            <div className="grid grid-2">
              {restaurants.map((restaurant) => (
                <div key={restaurant.id} className="admin-restaurant-card card">
                  <div className="restaurant-image">
                    <img src={restaurant.imageUrl || 'https://via.placeholder.com/300x200'} alt={restaurant.name} />
                  </div>
                  <div className="restaurant-info">
                    <h3>{restaurant.name}</h3>
                    <p>{restaurant.description}</p>
                    <p className="restaurant-address">📍 {restaurant.address}</p>
                    <p className="restaurant-phone">📞 {restaurant.phone}</p>
                    <div className="restaurant-menu-count">
                      {restaurant.menu?.length || 0} menu items
                    </div>
                    <div className="restaurant-actions">
                      <button
                        onClick={() => handleEdit(restaurant)}
                        className="btn btn-secondary"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(restaurant.id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {showForm && (
        <RestaurantForm
          restaurant={editingRestaurant}
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};

export default AdminDashboard;

