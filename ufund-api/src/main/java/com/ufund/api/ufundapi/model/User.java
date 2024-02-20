package com.ufund.api.ufundapi.model;

import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Represents a User
 * 
 * @author Howard Kong
 * @author Austin Kunkel
 * @author
 * @author
 */
public class User {
    /**
     * TODO
     * Edit Javadocs
     * Add/remove fields and functions
     */

    private static final Logger LOG = Logger.getLogger(User.class.getName());

    // Package private for tests
    static final String STRING_FORMAT = "User [id = %d, name = %s, email = %s]";

    @JsonProperty("id") private int id;
    @JsonProperty("username") private String username;
    @JsonProperty("password") private String password;
    @JsonProperty("email") private String email;
    @JsonProperty("cart") private Map<Integer, Integer> cart; // Integer (Foreign Key), Integer (Amount)
    @JsonProperty("purchases") private Map<Integer, Integer> purchases; // Integer (Foreign Key), Integer (Amount)

    /**
     * Create a user with the given fields
     * @param id The id of the user
     * @param username The name of the user
     * @param password The description of the user
     * @param email The email of the user
     * @param cart The cart of the user
     * @param purchases The purchases the user has made
     * 
     * {@literal @}JsonProperty is used in serialization and deserialization
     * of the JSON object to the Java object in mapping the fields.  If a field
     * is not provided in the JSON object, the Java field gets the default Java
     * value, i.e. 0 for int
     */
    public User(@JsonProperty("id") int id, 
                @JsonProperty("username") String username,
                @JsonProperty("password") String password,
                @JsonProperty("email") String email,
                @JsonProperty("cart") Map<Integer, Integer> cart,
                @JsonProperty("purchases") Map<Integer, Integer> purchases) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        cart = new HashMap<>();
        purchases = new HashMap<>();
    }

    /**
     * Retrieve the id of the user
     * @return The id of the user
     */
    public int getId() {
        return id;
    }

    /**
     * Retrieve the username of the user
     * @return The username of the user
     */
    public String getUsername() {
        return username;
    }

    /**
     * Retrieve the password of the user
     * @return The password of the user
     */
    public String getPassword() {
        return password;
    }

    /**
     * Retrieve the email of the user
     * @return The email of the user
     */
    public String getEmail() {
        return email;
    }

    /**
     * Retrieve the cart of the user
     * @return The cart of the user
     */
    public Map<Integer, Integer> getCart() {
        return cart;
    }

    /**
     * Retrieve the purchases of the user
     * @return The purchases of the user
     */
    public Map<Integer, Integer> getPurchases() {
        return purchases;
    }

    /**
     * Set the username of the user - necessary for JSON object to Java object deserialization
     * @param username The username of the user
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * Set the password of the user - necessary for JSON object to Java object deserialization
     * @param password The password of the user
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * Set the email of the user - necessary for JSON object to Java object deserialization
     * @param email The email of the user
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * Set the cart of the user - necessary for JSON object to Java object deserialization
     * @param cart The cart of the user
     */
    public void setCart(Map<Integer, Integer> cart) {
        this.cart = cart;
    }

    /**
     * Set the purchases of the user - necessary for JSON object to Java object deserialization
     * @param purchases The purchases of the user
     */
    public void setPurchases(Map<Integer, Integer> purchases) {
        this.purchases = purchases;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String toString() {
        return String.format(STRING_FORMAT, id, username, email);
    }
}
