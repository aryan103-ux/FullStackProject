package com.restaurant.inventory.service;

import com.restaurant.inventory.model.Order;
import com.restaurant.inventory.model.Restaurant;
import com.restaurant.inventory.repository.OrderRepository;
import com.restaurant.inventory.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    
    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private RestaurantRepository restaurantRepository;
    
    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }
    
    public List<Order> getUserOrders(String userId) {
        return orderRepository.findByUserId(userId);
    }
    
    public List<Order> getRestaurantOrders(String restaurantId) {
        return orderRepository.findByRestaurantId(restaurantId);
    }
    
    public Optional<Order> getOrderById(String id) {
        return orderRepository.findById(id);
    }
    
    public Order updateOrderStatus(String id, String status) {
        Order order = orderRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(status);
        return orderRepository.save(order);
    }
}

