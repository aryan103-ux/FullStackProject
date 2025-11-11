import React, { useState, useEffect } from 'react';
import { restaurantAPI } from '../services/api';
import '../styles/RestaurantForm.css';

const RestaurantForm = ({ restaurant, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    phone: '',
    imageUrl: '',
    menu: []
  });
  const [menuItem, setMenuItem] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    category: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (restaurant) {
      setFormData({
        name: restaurant.name || '',
        description: restaurant.description || '',
        address: restaurant.address || '',
        phone: restaurant.phone || '',
        imageUrl: restaurant.imageUrl || '',
        menu: restaurant.menu || []
      });
    }
  }, [restaurant]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleMenuItemChange = (e) => {
    setMenuItem({
      ...menuItem,
      [e.target.name]: e.target.value
    });
  };

  const addMenuItem = () => {
    if (menuItem.name && menuItem.price && menuItem.quantity) {
      const newItem = {
        ...menuItem,
        id: Math.random().toString(),
        price: parseFloat(menuItem.price),
        quantity: parseInt(menuItem.quantity)
      };
      setFormData({
        ...formData,
        menu: [...formData.menu, newItem]
      });
      setMenuItem({ name: '', description: '', price: '', quantity: '', category: '' });
    }
  };

  const removeMenuItem = (index) => {
    setFormData({
      ...formData,
      menu: formData.menu.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (restaurant) {
        await restaurantAPI.update(restaurant.id, formData);
      } else {
        await restaurantAPI.create(formData);
      }
      onSubmit();
    } catch (error) {
      console.error('Error saving restaurant:', error);
      alert('Failed to save restaurant. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content form-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{restaurant ? 'Edit Restaurant' : 'Create Restaurant'}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="restaurant-form">
          <div className="form-group">
            <label className="label">Restaurant Name</label>
            <input
              type="text"
              name="name"
              className="input"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="label">Description</label>
            <textarea
              name="description"
              className="input"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              required
            />
          </div>

          <div className="form-group">
            <label className="label">Address</label>
            <input
              type="text"
              name="address"
              className="input"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="label">Phone</label>
            <input
              type="text"
              name="phone"
              className="input"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="label">Image URL</label>
            <input
              type="url"
              name="imageUrl"
              className="input"
              value={formData.imageUrl}
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="menu-section">
            <h3>Menu Items</h3>
            
            <div className="menu-item-form">
              <input
                type="text"
                name="name"
                className="input"
                placeholder="Item name"
                value={menuItem.name}
                onChange={handleMenuItemChange}
              />
              <input
                type="text"
                name="description"
                className="input"
                placeholder="Description"
                value={menuItem.description}
                onChange={handleMenuItemChange}
              />
              <input
                type="number"
                name="price"
                className="input"
                placeholder="Price"
                step="0.01"
                value={menuItem.price}
                onChange={handleMenuItemChange}
              />
              <input
                type="number"
                name="quantity"
                className="input"
                placeholder="Stock quantity"
                value={menuItem.quantity}
                onChange={handleMenuItemChange}
              />
              <input
                type="text"
                name="category"
                className="input"
                placeholder="Category"
                value={menuItem.category}
                onChange={handleMenuItemChange}
              />
              <button
                type="button"
                onClick={addMenuItem}
                className="btn btn-secondary"
              >
                Add Item
              </button>
            </div>

            <div className="menu-items-list">
              {formData.menu.map((item, index) => (
                <div key={index} className="menu-item-display">
                  <div>
                    <strong>{item.name}</strong> - ${item.price} (Stock: {item.quantity})
                    {item.category && <span className="category-badge">{item.category}</span>}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeMenuItem(index)}
                    className="btn btn-danger btn-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : restaurant ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RestaurantForm;

