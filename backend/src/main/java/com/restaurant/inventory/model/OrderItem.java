package com.restaurant.inventory.model;

public class OrderItem {
    private String menuItemId;
    private String name;
    private int quantity;
    private double price;
    
    public OrderItem() {}
    
    public OrderItem(String menuItemId, String name, int quantity, double price) {
        this.menuItemId = menuItemId;
        this.name = name;
        this.quantity = quantity;
        this.price = price;
    }
    
    public String getMenuItemId() {
        return menuItemId;
    }
    
    public void setMenuItemId(String menuItemId) {
        this.menuItemId = menuItemId;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public int getQuantity() {
        return quantity;
    }
    
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
    
    public double getPrice() {
        return price;
    }
    
    public void setPrice(double price) {
        this.price = price;
    }
}

