package com.ufund.api.ufundapi.model;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.apache.tomcat.jni.Local;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

/**
 * Test the Order class
 * 
 * @author Christopher Brooks
 */
@Tag("Model-tier")
public class OrderTest {
    
    @Test
    public void testGetOrderID(){
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
}