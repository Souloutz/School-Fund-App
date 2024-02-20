package com.ufund.api.ufundapi.persistence;

import java.io.IOException;

import com.ufund.api.ufundapi.model.Gift;

/**
 * Interface for Gift Item object persistence
 * 
 * @author Howard Kong
 * @author
 * @author
 * @author
 */
public interface GiftDAO {
     
    /**
     * TODO 
     * Add all the functions that get used and necessary parameters
     * Update Ufund class name -> Item? Need?
     * Implement functions in FileDAO
     * Update Javadocs
     */

    /**
     * Retrieve all {@linkplain Gift gifts}
     * 
     * @return An array of {@link Gift gift} objects, may be empty
     * @throws IOException if an issue with underlying storage
     */
    Gift[] getItems() throws IOException;
    
    /**
     * Find all {@linkplain Gift gifts} whose name contains the given text
     * 
     * @param containsText The text to match against
     * @return An array of {@link Gift gifts} whose names contains the given text, may be empty
     * @throws IOException if an issue with underlying storage
     */
    Gift[] findItem(String containsText) throws IOException;
    
    /**
     * Retrieve a {@linkplain Gift gift} with the given id
     * 
     * @param id The id of the {@link Gift gift} to get
     * @return a {@link Gift gift} object with the matching id
     *         null if no {@link Gift gift} with a matching id is found
     * @throws IOException if an issue with underlying storage
     */
    Gift getItem(int id) throws IOException;

    /**
     * Create and save a {@linkplain Gift gift}
     * 
     * @param gift {@linkplain Gift gift} object to be created and saved
     *             The id of the gift object is ignored and a new uniqe id is assigned
     * @return new {@link Gift gift} if successful
     *         false otherwise 
     * @throws IOException if an issue with underlying storage
     */
    Gift createItem(Gift gift) throws IOException;

    /**
     * Update and save a {@linkplain Gift gift}
     * 
     * @param {@link Gift gift} object to be updated and saved
     * @return updated {@link Gift gift} if successful
     *         null if {@link Gift gift} could not be found
     * @throws IOException if underlying storage cannot be accessed
     */
    Gift updateItem(Gift item) throws IOException;

    /**
     * Delete a {@linkplain Gift gift} with the given id
     * 
     * @param id The id of the {@link Gift gift}
     * @return true if the {@link Gift gift} was deleted
     *         false if gift with the given id does not exist
     * @throws IOException if underlying storage cannot be accessed
     */
    boolean deleteItem(int id) throws IOException;
}
