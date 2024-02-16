package com.ufund.api.persistence;

import java.io.IOException;

import com.ufund.api.model.User;

/**
 * Interface for User object persistence
 * 
 * @author Howard Kong
 * @author
 * @author
 * @author
 */
public interface UserDAO {
     
    /**
     * TODO 
     * Add all the functions that get used and necessary parameters
     * Implement functions in FileDAO
     * Update Javadocs
     */

    /**
     * Retrieve all {@linkplain Hero heroes}
     * 
     * @return An array of {@link Hero hero} objects, may be empty

     * @throws IOException if an issue with underlying storage
     */
    User[] getUsers() throws IOException;
    
    /**
     * Find all {@linkplain Hero heroes} whose name contains the given text
     * 
     * @param containsText The text to match against
     * 
     * @return An array of {@link Hero heroes} whose nemes contains the given text, may be empty
     * 
     * @throws IOException if an issue with underlying storage
     */
    User[] find(String containsText) throws IOException;
    
    /**
     * Retrieve a {@linkplain Hero hero} with the given id
     * 
     * @param id The id of the {@link Hero hero} to get
     * 
     * @return a {@link Hero hero} object with the matching id
     *         null if no {@link Hero hero} with a matching id is found
     * 
     * @throws IOException if an issue with underlying storage
     */
    User getUser(int id) throws IOException;

    /**
     * Create and save a {@linkplain Hero hero}
     * 
     * @param hero {@linkplain Hero hero} object to be created and saved
     * 
     * The id of the hero object is ignored and a new uniqe id is assigned
     *
     * @return new {@link Hero hero} if successful
     *         false otherwise 
     * 
     * @throws IOException if an issue with underlying storage
     */
    User createUser(User user) throws IOException;

    /**
     * Update and save a {@linkplain Hero hero}
     * 
     * @param {@link Hero hero} object to be updated and saved
     * 
     * @return updated {@link Hero hero} if successful
     *         null if {@link Hero hero} could not be found
     * 
     * @throws IOException if underlying storage cannot be accessed
     */
    User updateUser(User user) throws IOException;

    /**
     * Delete a {@linkplain Hero hero} with the given id
     * 
     * @param id The id of the {@link Hero hero}
     * 
     * @return true if the {@link Hero hero} was deleted
     *         false if hero with the given id does not exist
     * 
     * @throws IOException if underlying storage cannot be accessed
     */
    boolean deleteUser(int id) throws IOException;
}
