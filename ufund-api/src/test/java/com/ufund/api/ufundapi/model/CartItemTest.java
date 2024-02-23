package com.ufund.api.ufundapi.model;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

/**
 * Test the Cart Item class
 * 
 * @author Howard Kong
 */
@Tag("Model-tier")
public class CartItemTest {
    @Test
    public void testCreateCartItem() {
        // Setup
        int expectedId = 1;
        int expectedItemAmount = 100;

        // Invoke
        CartItem cartItem = new CartItem(expectedId, expectedItemAmount);

        // Analyze
        assertNotEquals(cartItem, null);
        assertEquals(expectedId, cartItem.getItemId());
        assertEquals(expectedItemAmount, cartItem.getItemAmount());
    }

    @Test
    public void testSetItemId() {
        // Setup
        int id = 1;
        int itemAmount = 100;
        CartItem cartItem = new CartItem(id, itemAmount);

        int expectedId = 2;

        // Invoke
        cartItem.setItemId(expectedId);

        // Analyze
        assertEquals(expectedId, cartItem.getItemId());
    }

    @Test
    public void testSetItemAmount() {
        // Setup
        int id = 1;
        int itemAmount = 100;
        CartItem cartItem = new CartItem(id, itemAmount);

        int expectedItemAmount = 250;

        // Invoke
        cartItem.setItemAmount(expectedItemAmount);

        // Analyze
        assertEquals(expectedItemAmount, cartItem.getItemAmount());
    }

    @Test
    public void testSetItemAmountZero() {
        // Setup
        int id = 1;
        int itemAmount = 100;
        CartItem cartItem = new CartItem(id, itemAmount);

        int newItemAmount = -10;
        int expectedItemAmount = 0;

        // Invoke
        cartItem.setItemAmount(newItemAmount);

        // Analyze
        assertEquals(expectedItemAmount, cartItem.getItemAmount());
    }

    @Test
    public void testIncrement() {
        // Setup
        int id = 1;
        int itemAmount = 100;
        CartItem cartItem = new CartItem(id, itemAmount);

        int expectedItemAmount = 101;

        // Invoke
        cartItem.incrementItemAmount();

        // Analyze
        assertEquals(expectedItemAmount, cartItem.getItemAmount());
    }

    @Test
    public void testDecrement() {
        // Setup
        int id = 1;
        int itemAmount = 100;
        CartItem cartItem = new CartItem(id, itemAmount);

        int expectedItemAmount = 99;

        // Invoke
        cartItem.decrementItemAmount();

        // Analyze
        assertEquals(expectedItemAmount, cartItem.getItemAmount());
    }
}
