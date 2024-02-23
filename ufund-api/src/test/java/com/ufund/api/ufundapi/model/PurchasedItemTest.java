package com.ufund.api.ufundapi.model;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

/**
 * Test the Purchased Item class
 * 
 * @author Howard Kong
 */
@Tag("Model-tier")
public class PurchasedItemTest {
    @Test
    public void testCreatePurchasedItem() {
        // Setup
        int expectedId = 1;
        int expectedItemAmount = 150;

        // Invoke
        PurchasedItem purchasedItem = new PurchasedItem(expectedId, expectedItemAmount);

        // Analyze
        assertNotEquals(purchasedItem, null);
        assertEquals(expectedId, purchasedItem.getItemId());
        assertEquals(expectedItemAmount, purchasedItem.getItemAmount());
    }

    @Test
    public void testSetItemId() {
        // Setup
        int id = 1;
        int itemAmount = 100;
        PurchasedItem purchasedItem = new PurchasedItem(id, itemAmount);

        int expectedId = 2;

        // Invoke
        purchasedItem.setItemId(expectedId);

        // Analyze
        assertEquals(expectedId, purchasedItem.getItemId());
    }

    @Test
    public void testSetItemAmount() {
        // Setup
        int id = 1;
        int itemAmount = 100;
        PurchasedItem purchasedItem = new PurchasedItem(id, itemAmount);

        int expectedItemAmount = 250;

        // Invoke
        purchasedItem.setItemAmount(expectedItemAmount);

        // Analyze
        assertEquals(expectedItemAmount, purchasedItem.getItemAmount());
    }

    @Test
    public void testSetItemAmountZero() {
        // Setup
        int id = 1;
        int itemAmount = 100;
        PurchasedItem purchasedItem = new PurchasedItem(id, itemAmount);

        int newItemAmount = -10;
        int expectedItemAmount = 0;

        // Invoke
        purchasedItem.setItemAmount(newItemAmount);

        // Analyze
        assertEquals(expectedItemAmount, purchasedItem.getItemAmount());
    }
}
