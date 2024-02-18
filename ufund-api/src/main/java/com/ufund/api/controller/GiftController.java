package com.ufund.api.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

import com.ufund.api.model.Gift;
import com.ufund.api.persistence.GiftDAO;

/**
 * Handles the REST API requests for the Gift resource
 * 
 * {@literal @}RestController Spring annotation identifies this class as a REST API method handler to the Spring framework
 * 
 * @author Howard Kong
 * @author
 * @author
 * @author
 */

@RestController
@RequestMapping("gifts") //add the request like the heroes controller does
public class GiftController {
    /*
     * TODO
     * Implement CRUD operation functions
     * Add additional functions (search, return all, etc)
     */

    private static final Logger LOG = Logger.getLogger(GiftController.class.getName());
    private GiftDAO giftDAO;

    /**
     * Create a REST API controller to respond to requests
     * 
     * @param giftDAO The {@link GiftDAO Gift Data Access Object} to perform CRUD operations
     *                This dependency is injected by the Spring Framework
     */
    public GiftController(GiftDAO giftDAO){
        this.giftDAO = giftDAO;
    }

    /**
     * Respond to the GET request for a {@linkplain Gift gift} for the given id
     * 
     * @param id The id used to locate the {@link Gift gift}
     * @return ResponseEntity with {@link Gift gift} object and HTTP status of OK if found
     *         ResponseEntity with HTTP status of NOT_FOUND if not found
     *         ResponseEntity with HTTP status of INTERNAL_SERVER_ERROR otherwise
     */
    @GetMapping("/{id}")
    public ResponseEntity<Gift> getGift(@PathVariable int id) {
        // TODO
        LOG.info("GET /gifts/" + id);

        try {
            Gift gift = giftDAO.getItem(id);
            if (gift != null)
                return new ResponseEntity<>(HttpStatus.OK);
            else
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        catch (IOException ioe) {
            LOG.log(Level.SEVERE, ioe.getLocalizedMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Respond to the GET request for all {@linkplain Gift gifts}
     * 
     * @return ResponseEntity with array of {@link Gift gift} objects (may be empty) and HTTP status of OK
     *         ResponseEntity with HTTP status of INTERNAL_SERVER_ERROR otherwise
     */
    @GetMapping("")
    public ResponseEntity<Gift[]> getAllGifts() {
        // TODO
        LOG.info("GET /gifts");

        try {
            Gift[] gifts = giftDAO.getItems();

            return new ResponseEntity<>(gifts, HttpStatus.OK);
        }
        catch (IOException ioe) {
            LOG.log(Level.SEVERE, ioe.getLocalizedMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Respond to the GET request for all {@linkplain Gift gifts} whose name contains
     * the text in name
     * 
     * @param name The name parameter which contains the text used to find the {@link Gift gifts}
     * @return ResponseEntity with array of {@link Gift gift} objects (may be empty) and HTTP status of OK
     *         ResponseEntity with HTTP status of INTERNAL_SERVER_ERROR otherwise
     *
     * Example: Find all gifts that contain the text "ma"
     * GET http://localhost:8080/gifts/?name=ma
     */
    @GetMapping("/")
    public ResponseEntity<Gift[]> searchGifts(@RequestParam String name) {
        // TODO
        LOG.info("GET /gifts/?name=" + name);

        try {
            Gift[] allGifts = giftDAO.getItems();
            ArrayList<Gift> matchingGifts = new ArrayList<>();

            for (Gift gift : allGifts)
                if (gift.getName().contains(name))
                    matchingGifts.add(gift);

            Gift[] gifts = matchingGifts.toArray(new Gift[matchingGifts.size()]);

            return new ResponseEntity<>(gifts, HttpStatus.OK);
        }
        catch (IOException ioe) {
            LOG.log(Level.SEVERE, ioe.getLocalizedMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Create a {@linkplain Gift gift} with the provided gift object
     * 
     * @param gift - The {@link Gift gift} to create
     * @return ResponseEntity with created {@link Gift gift} object and HTTP status of CREATED
     *         ResponseEntity with HTTP status of CONFLICT if {@link Gift gift} object already exists
     *         ResponseEntity with HTTP status of INTERNAL_SERVER_ERROR otherwise
     */
    @PostMapping("")
    public ResponseEntity<Gift> createGift(@RequestBody Gift gift) {
        // TODO
        LOG.info("POST /gifts/" + gift.getId());

        try {
            Gift[] gifts = giftDAO.getItems();
            for (Gift a_gift : gifts)
                if (a_gift.getName().equals(gift.getName()))
                    return new ResponseEntity<>(HttpStatus.CONFLICT);

            Gift newGift = giftDAO.createItem(gift);

            if (newGift != null)
                return new ResponseEntity<>(newGift, HttpStatus.OK);
            else
                return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        catch (IOException ioe) {
            LOG.log(Level.SEVERE, ioe.getLocalizedMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update the {@linkplain Gift gift} with the provided {@linkplain Gift gift} object, if it exists
     * 
     * @param gift The {@link Gift gift} to update
     * @return ResponseEntity with updated {@link Gift gift} object and HTTP status of OK if updated
     *         ResponseEntity with HTTP status of NOT_FOUND if not found
     *         ResponseEntity with HTTP status of INTERNAL_SERVER_ERROR otherwise
     */
    @PutMapping("")
    public ResponseEntity<Gift> updateGift(@RequestBody Gift gift) {
        // TODO
        LOG.info("PUT /users/" + gift.getId());

        try {
            Gift updatedGift = giftDAO.updateItem(gift);

            if (updatedGift != null)
                return new ResponseEntity<>(updatedGift, HttpStatus.OK);
            else
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        catch (IOException ioe) {
            LOG.log(Level.SEVERE, ioe.getLocalizedMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Delete a {@linkplain Gift gift} with the given id
     * 
     * @param id The id of the {@link Gift gift} to delete
     * @return ResponseEntity HTTP status of OK if deleted
     *         ResponseEntity with HTTP status of NOT_FOUND if not found
     *         ResponseEntity with HTTP status of INTERNAL_SERVER_ERROR otherwise
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Gift> deleteGift(@PathVariable int id) {
        // TODO
        LOG.info("DELETE /users/" + id);

        try {
            boolean hasBeenDeleted = giftDAO.deleteItem(id);

            if (hasBeenDeleted)
                return new ResponseEntity<>(HttpStatus.OK);
            else
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        catch (IOException ioe) {
            LOG.log(Level.SEVERE, ioe.getLocalizedMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
