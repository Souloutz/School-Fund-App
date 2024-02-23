package com.ufund.api.ufundapi.model;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

/**
 * Test the User class
 * 
 * @author Howard Kong
 */
@Tag("Model-tier")
public class UserTest {
    @Test
    public void testCreateUser() {
        // Setup
        int expectedId = 99;
        String expectedUsername = "User";
        String expectedPassword = "User";
        String expectedEmail = "user@gmail.com";
        List<CartItem> expectedCart = null;
        List<PurchasedItem> expectedPurchases = null;

        // Invoke
        User user = new User(expectedId, expectedUsername, expectedPassword, expectedEmail, expectedCart, expectedPurchases);

        // Analyze
        assertNotEquals(user, null);
        assertEquals(expectedId, user.getId());
        assertEquals(expectedUsername, user.getUsername());
        assertEquals(expectedPassword, user.getPassword());
        assertEquals(expectedEmail, user.getEmail());
        assertEquals(expectedCart, user.getCart());
        assertEquals(expectedPurchases, user.getPurchases());
    }

    @Test
    public void testSetUsername() {
        // Setup
        int id = 99;
        String username = "User";
        String password = "User";
        String email = "user@gmail.com";
        List<CartItem> cart = null;
        List<PurchasedItem> purchases = null;
        User user = new User(id, username, password, email, cart, purchases);

        String expectedUsername = "Username";

        // Invoke
        user.setUsername(expectedUsername);

        // Analyze
        assertEquals(expectedUsername, user.getUsername());
    }

    @Test
    public void testSetPassword() {
        // Setup
        int id = 99;
        String username = "User";
        String password = "User";
        String email = "user@gmail.com";
        List<CartItem> cart = null;
        List<PurchasedItem> purchases = null;
        User user = new User(id, username, password, email, cart, purchases);

        String expectedPassword = "password";

        // Invoke
        user.setPassword(expectedPassword);

        // Analyze
        assertEquals(expectedPassword, user.getPassword());
    }

    @Test
    public void testSetEmail() {
        // Setup
        int id = 99;
        String username = "User";
        String password = "User";
        String email = "user@gmail.com";
        List<CartItem> cart = null;
        List<PurchasedItem> purchases = null;
        User user = new User(id, username, password, email, cart, purchases);

        String expectedEmail = "user@yahoo.com";

        // Invoke
        user.setEmail(expectedEmail);

        // Analyze
        assertEquals(expectedEmail, user.getEmail());
    }

    @Test
    public void testSetCart() {
        // Setup
        int id = 99;
        String username = "User";
        String password = "User";
        String email = "user@gmail.com";
        List<CartItem> cart = null;
        List<PurchasedItem> purchases = null;
        User user = new User(id, username, password, email, cart, purchases);

        List<CartItem> expectedCart = new ArrayList<>();
        expectedCart.add(new CartItem(1, 100));

        // Invoke
        user.setCart(expectedCart);

        // Analyze
        assertEquals(expectedCart, user.getCart());
    }

    @Test
    public void testSetPurchases() {
        // Setup
        int id = 99;
        String username = "User";
        String password = "User";
        String email = "user@gmail.com";
        List<CartItem> cart = null;
        List<PurchasedItem> purchases = null;
        User user = new User(id, username, password, email, cart, purchases);

        List<PurchasedItem> expectedPurchases = new ArrayList<>();
        expectedPurchases.add(new PurchasedItem(1, 100));

        // Invoke
        user.setPurchases(expectedPurchases);

        // Analyze
        assertEquals(expectedPurchases, user.getPurchases());
    }

    @Test
    public void testToString() {
        // Setup
        int id = 99;
        String username = "User";
        String password = "User";
        String email = "user@gmail.com";
        List<CartItem> cart = null;
        List<PurchasedItem> purchases = null;

        String expectedString = String.format(User.STRING_FORMAT, id, username, email);
        User user = new User(id, username, password, email, cart, purchases);

        // Invoke
        String actualString = user.toString();

        // Analyze
        assertEquals(expectedString, actualString);
    }
}