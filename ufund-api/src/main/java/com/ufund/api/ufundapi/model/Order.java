package com.ufund.api.ufundapi.model;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Represents a purchase Order
 * 
 * @author Howard Kong
 */
public class Order {
    private static int ID = 0;

    @JsonProperty("id") private int orderId;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss") 
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") 
    @JsonProperty("date") private LocalDateTime orderDate;
    @JsonProperty("items") private List<OrderItem> orderItems;

    /**
     * Create an order
     * @param date The date of the order
     * @param items The items ordered by the user
     * 
     * {@literal @}JsonProperty is used in serialization and deserialization
     * of the JSON object to the Java object in mapping the fields.  If a field
     * is not provided in the JSON object, the Java field gets the default Java
     * value, i.e. 0 for int
     */
    public Order(@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
                 @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
                 @JsonProperty("date") LocalDateTime orderDate,
                 @JsonProperty("items") List<OrderItem> orderItems) {
        this.orderId = ID++;
        this.orderDate = orderDate;
        this.orderItems = orderItems;
    }

    /**
     * Retrieve the id of the order
     * @return The id of the order
     */
    public int getOrderId() {
        return orderId;
    }

    /**
     * Retrieve the date of the order
     * @return The date of the order
     */
    public LocalDateTime getOrderDate() {
        return orderDate;
    }

    /**
     * Retrieve the items of the order
     * @return The items of the order
     */
    public List<OrderItem> getOrderItems() {
        return orderItems;
    }
    
    /**
     * Set the date of the order
     * @param orderDate The date of the order
     */
    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = orderDate;
    }

    /**
     * Set the items of the order
     * @param orderItems The items of the order
     */
    public void setOrderItems(List<OrderItem> orderItems) {
        this.orderItems = orderItems;
    }
}
