import React from 'react';
import '../styles/RestaurantCard.css';

const RestaurantCard = ({ restaurant, onSelect }) => {
  return (
    <div className="restaurant-card card" onClick={onSelect}>
      <div className="restaurant-image">
        <img src={restaurant.imageUrl || 'https://via.placeholder.com/300x200'} alt={restaurant.name} />
      </div>
      <div className="restaurant-info">
        <h3 className="restaurant-name">{restaurant.name}</h3>
        <p className="restaurant-description">{restaurant.description}</p>
        <div className="restaurant-details">
          <p className="restaurant-address">📍 {restaurant.address}</p>
          <p className="restaurant-phone">📞 {restaurant.phone}</p>
        </div>
        <div className="restaurant-menu-count">
          {restaurant.menu?.length || 0} items available
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;

