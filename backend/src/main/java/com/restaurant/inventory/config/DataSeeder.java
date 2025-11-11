package com.restaurant.inventory.config;

import com.restaurant.inventory.model.MenuItem;
import com.restaurant.inventory.model.Restaurant;
import com.restaurant.inventory.model.User;
import com.restaurant.inventory.repository.RestaurantRepository;
import com.restaurant.inventory.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Component
public class DataSeeder implements CommandLineRunner {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private RestaurantRepository restaurantRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) throws Exception {
        // Seed users
        if (userRepository.count() == 0) {
            User admin = new User("admin", "admin@restaurant.com", passwordEncoder.encode("admin123"), "ADMIN");
            User user1 = new User("john", "john@example.com", passwordEncoder.encode("user123"), "USER");
            User user2 = new User("jane", "jane@example.com", passwordEncoder.encode("user123"), "USER");
            
            userRepository.saveAll(Arrays.asList(admin, user1, user2));
            System.out.println("Sample users created:");
            System.out.println("Admin - Username: admin, Password: admin123");
            System.out.println("User - Username: john, Password: user123");
            System.out.println("User - Username: jane, Password: user123");
        }
        
        // Seed restaurants
        if (restaurantRepository.count() == 0) {
            Restaurant restaurant1 = new Restaurant(
                "Pizza Palace",
                "Authentic Italian pizzas with fresh ingredients",
                "123 Main St, New York, NY 10001",
                "+1-555-0101",
                "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800",
                Arrays.asList(
                    createMenuItem("Margherita Pizza", "Classic tomato, mozzarella, and basil", 12.99, 50, "Pizza"),
                    createMenuItem("Pepperoni Pizza", "Pepperoni and mozzarella cheese", 14.99, 45, "Pizza"),
                    createMenuItem("Hawaiian Pizza", "Ham, pineapple, and mozzarella", 15.99, 40, "Pizza"),
                    createMenuItem("Caesar Salad", "Fresh romaine lettuce with Caesar dressing", 8.99, 30, "Salad"),
                    createMenuItem("Garlic Bread", "Fresh baked bread with garlic butter", 5.99, 60, "Appetizer")
                )
            );
            
            Restaurant restaurant2 = new Restaurant(
                "Burger House",
                "Gourmet burgers made with premium beef",
                "456 Oak Ave, Los Angeles, CA 90001",
                "+1-555-0102",
                "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
                Arrays.asList(
                    createMenuItem("Classic Burger", "Beef patty, lettuce, tomato, onion, pickles", 9.99, 60, "Burger"),
                    createMenuItem("Cheese Burger", "Classic burger with cheddar cheese", 10.99, 55, "Burger"),
                    createMenuItem("Bacon Burger", "Burger with crispy bacon and cheese", 12.99, 50, "Burger"),
                    createMenuItem("French Fries", "Crispy golden fries", 4.99, 100, "Side"),
                    createMenuItem("Onion Rings", "Battered and fried onion rings", 5.99, 80, "Side")
                )
            );
            
            Restaurant restaurant3 = new Restaurant(
                "Sushi Master",
                "Fresh sushi and Japanese cuisine",
                "789 Pine St, San Francisco, CA 94102",
                "+1-555-0103",
                "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800",
                Arrays.asList(
                    createMenuItem("Salmon Sashimi", "Fresh salmon slices", 18.99, 25, "Sashimi"),
                    createMenuItem("California Roll", "Crab, avocado, cucumber", 8.99, 40, "Roll"),
                    createMenuItem("Dragon Roll", "Eel, cucumber, avocado", 14.99, 35, "Roll"),
                    createMenuItem("Miso Soup", "Traditional Japanese soup", 3.99, 50, "Soup"),
                    createMenuItem("Edamame", "Steamed soybeans", 5.99, 60, "Appetizer")
                )
            );
            
            restaurantRepository.saveAll(Arrays.asList(restaurant1, restaurant2, restaurant3));
            System.out.println("Sample restaurants created!");
        }
    }
    
    private MenuItem createMenuItem(String name, String description, double price, int quantity, String category) {
        MenuItem item = new MenuItem(name, description, price, quantity, category);
        item.setId(UUID.randomUUID().toString());
        return item;
    }
}

