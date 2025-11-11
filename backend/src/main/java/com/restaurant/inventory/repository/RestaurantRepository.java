package com.restaurant.inventory.repository;

import com.restaurant.inventory.model.Restaurant;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RestaurantRepository extends MongoRepository<Restaurant, String> {
}

