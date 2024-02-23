package com.ufund.api.ufundapi.model;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Represents a Gift item purchased by a User
 * 
 * @author Howard Kong
 */
public class PurchasedItem {
    @JsonProperty("id") private int itemId;
    @JsonProperty("amount") private int itemAmount; // Can not be less than 0

    /**
     * Create a purchased item
     * @param itemId The id of the gift
     * @param itemAmount The amount of the gift purchased
     * 
     * {@literal @}JsonProperty is used in serialization and deserialization
     * of the JSON object to the Java object in mapping the fields.  If a field
     * is not provided in the JSON object, the Java field gets the default Java
     * value, i.e. 0 for int
     */
    public PurchasedItem(@JsonProperty("id") int itemId,
                         @JsonProperty("amount") int itemAmount) {
        this.itemId = itemId;
        this.itemAmount = itemAmount;
    }

    /**
     * Retrieve the id of the item
     * @return The id of the item
     */
    public int getItemId() {
        return itemId;
    }

    /**
     * Retrieve the amount of the item
     * @return The amount of the item
     */
    public int getItemAmount() {
        return itemAmount;
    }

    /**
     * Set the id of the item
     * @param itemId The id of the item
     */
    public void setItemId(int itemId) {
        this.itemId = itemId;
    }

    /**
     * Set the amount of the item
     * @param itemAmount The amount of the item
     */
    public void setItemAmount(int itemAmount) {
        if (itemAmount < 0)
            itemAmount = 0;

        this.itemAmount = itemAmount;
    }
}