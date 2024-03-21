package com.ufund.api.ufundapi.model;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;

/**
 * Test the Order class
 * 
 * @author Christopher Brooks
 */
@Tag("Model-tier")
@TestMethodOrder(MethodOrderer.MethodName.class) // This is kind of a hack. Read below:
    //
    // The getOrderID test below checks if the order ID is equal to 0 and 1. Since the order ID increases by
    // 1 starting at 0, it is expected that the first two orders ID's are 0 and 1. However, JUnit can run tests in
    // any order, so the rest of the tests in this file can be run first, which will make the ID something else.

    // This makes the tests run in alphabetical order, the reason for the 'A' in the name before this.
    // 
public class OrderTest {
    
    @Test
    public void AtestGetOrderID(){
        // Setup
        int expectedID = 0;
        List<OrderItem> orderItems = new ArrayList<OrderItem>();
        Order orderTest = new Order(LocalDateTime.now(), orderItems);
        Order orderTest2 = new Order(LocalDateTime.now(), orderItems);

        // Invoke
        int orderID = orderTest.getOrderId();
        int orderID2 = orderTest2.getOrderId();
        // Each time you create a new order, it's given an ID incremented by 1, starting from 0.

        // Analyze
        assertEquals(expectedID, orderID); // Test if first order has ID 0.
        assertEquals(expectedID + 1, orderID2); // Test if second order has ID 1.
    }

    @Test
    public void testGetOrderDate() {
        // Setup
        LocalDateTime time = LocalDateTime.now();
        List<OrderItem> orderItems = new ArrayList<OrderItem>();
        Order orderTest = new Order(time, orderItems);

        // Invoke
        LocalDateTime orderTime = orderTest.getOrderDate();

        // Analyze
        assertEquals(time, orderTime);
    }

    @Test
    public void testSetOrderDate() {
        // Setup
        LocalDateTime timeNow = LocalDateTime.now();
        LocalDateTime timeRandom = LocalDateTime.of(2000, 1 ,1, 1, 1 ,1); // Set the order date to something random
        List<OrderItem> orderItems = new ArrayList<OrderItem>();
        Order orderTest = new Order(timeRandom, orderItems);

        // Invoke
        orderTest.setOrderDate(timeNow); // change to timeNow

        // Analyze
        assertEquals(timeNow, orderTest.getOrderDate());
    }

    @Test
    public void testSetOrderItems() {
        // Setup

        List<OrderItem> orderItems = new ArrayList<OrderItem>();
        orderItems.add(new OrderItem(1, 1));
        Order orderTest = new Order(LocalDateTime.now(), orderItems);

        // Invoke
        orderTest.setOrderItems(orderItems);

        // Analyze
        assertEquals(orderItems, orderTest.getOrderItems());
    }
}