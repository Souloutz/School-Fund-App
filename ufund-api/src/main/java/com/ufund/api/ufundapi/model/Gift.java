package com.ufund.api.ufundapi.model;

import java.util.logging.Logger;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Represents a Gift item
 * 
 * @author Howard Kong
 * @author
 * @author
 * @author
 */
public class Gift {
    
    private static final Logger LOG = Logger.getLogger(Gift.class.getName());

    // Package private for tests
    static final String STRING_FORMAT = "Gift [id = %d, name = %s, description = %s, price = %f, amount needed = %d]";

    @JsonProperty("id") private int id;
    @JsonProperty("name") private String name;
    @JsonProperty("description") private String description;
    @JsonProperty("price") private double price;
    @JsonProperty("amount_needed") private int amount_needed;

    /**
     * Create a gift with the given fields
     * @param id The id of the gift
     * @param name The name of the gift
     * @param description The description of the gift
     * @param price The price of the gift
     * @param amount_needed The amount of the gift needed
     * 
     * {@literal @}JsonProperty is used in serialization and deserialization
     * of the JSON object to the Java object in mapping the fields.  If a field
     * is not provided in the JSON object, the Java field gets the default Java
     * value, i.e. 0 for int
     */
    public Gift(@JsonProperty("id") int id, 
                @JsonProperty("name") String name,
                @JsonProperty("description") String description,
                @JsonProperty("price") double price,
                @JsonProperty("amount_needed") int amount_needed) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.amount_needed = amount_needed;
    }

    /**
     * Retrieve the id of the gift
     * @return The id of the gift
     */
    public int getId() {
        return id;
    }

    /**
     * Retrieve the name of the gift
     * @return The name of the gift
     */
    public String getName() {
        return name;
    }

    /**
     * Retrieve the description of the gift
     * @return The description of the gift
     */
    public String getDescription() {
        return description;
    }

    /**
     * Retrieve the price of the gift
     * @return The price of the gift
     */
    public double getPrice() {
        return price;
    }

    /**
     * Retrieve the amount needed of the gift
     * @return The amount of the gift needed
     */
    public int getAmountNeeded() {
        return amount_needed;
    }

    /**
     * Set the name of the gift - necessary for JSON object to Java object deserialization
     * @param name The name of the gift
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Set the description of the gift - necessary for JSON object to Java object deserialization
     * @param description The description of the gift
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * Set the price of the gift - necessary for JSON object to Java object deserialization
     * @param price The price of the gift
     */
    public void setPrice(double price) {
        this.price = price;
    }

    /**
     * Set the amount of the gift needed - necessary for JSON object to Java object deserialization
     * @param amount_needed The amount of the gift needed
     */
    public void setAmountNeeded(int amount_needed) {
        this.amount_needed = amount_needed;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String toString() {
        return String.format(STRING_FORMAT, id, name, description, price, amount_needed);
    }
}
