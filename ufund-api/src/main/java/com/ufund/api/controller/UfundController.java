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
import java.util.logging.Level;
import java.util.logging.Logger;

import com.ufund.api.model.Ufund;
import com.ufund.api.persistence.UfundDAO;

/**
 * Handles the REST API requests for the Gift resource
 * 
 * {@literal @}RestController Spring annotation identifies this class as a REST API
 * method handler to the Spring framework
 * 
 * @author Howard Kong
 * @author
 * @author
 * @author
 */

@RestController
@RequestMapping("") //add the request like the heroes controller does
public class UfundController {
    /*
     * TODO
     * Update references to ufundDAO and ufund -> gift?
     * Implement CRUD operation functions
     * Add additional functions (search, return all, etc)
     */

    private static final Logger LOG = Logger.getLogger(UfundController.class.getName());
    private UfundDAO ufundDAO;

    /**
     * Create a REST API controller to respond to requests
     * 
     * @param ufundDAO The {@link UfundDAO Ufund Data Access Object} to perform CRUD operations
     *
     * This dependency is injected by the Spring Framework
     */
    public UfundController(UfundDAO ufundDAO){
        this.ufundDAO = ufundDAO;
    }

    /**
     * Responds to the GET request for a {@linkplain Hero hero} for the given id
     * 
     * @param id The id used to locate the {@link Hero hero}
     * 
     * @return ResponseEntity with {@link Hero hero} object and HTTP status of OK if found<br>
     * ResponseEntity with HTTP status of NOT_FOUND if not found<br>
     * ResponseEntity with HTTP status of INTERNAL_SERVER_ERROR otherwise
     */
    @GetMapping("/{id}")
    public ResponseEntity<Ufund> getUfund(@PathVariable int id) {
        // TODO
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * Responds to the GET request for all {@linkplain Hero heroes}
     * 
     * @return ResponseEntity with array of {@link Hero hero} objects (may be empty) and
     * HTTP status of OK<br>
     * ResponseEntity with HTTP status of INTERNAL_SERVER_ERROR otherwise
     */
    @GetMapping("")
    public ResponseEntity<Ufund[]> getAllUfunds() {
        // TODO
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * Responds to the GET request for all {@linkplain Hero heroes} whose name contains
     * the text in name
     * 
     * @param name The name parameter which contains the text used to find the {@link Hero heroes}
     * 
     * @return ResponseEntity with array of {@link Hero hero} objects (may be empty) and
     * HTTP status of OK<br>
     * ResponseEntity with HTTP status of INTERNAL_SERVER_ERROR otherwise
     * <p>
     * Example: Find all heroes that contain the text "ma"
     * GET http://localhost:8080/heroes/?name=ma
     */
    @GetMapping("/")
    public ResponseEntity<Ufund[]> searchUfunds(@RequestParam String name) {
        // TODO
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * Creates a {@linkplain Hero hero} with the provided hero object
     * 
     * @param hero - The {@link Hero hero} to create
     * 
     * @return ResponseEntity with created {@link Hero hero} object and HTTP status of CREATED<br>
     * ResponseEntity with HTTP status of CONFLICT if {@link Hero hero} object already exists<br>
     * ResponseEntity with HTTP status of INTERNAL_SERVER_ERROR otherwise
     */
    @PostMapping("")
    public ResponseEntity<Ufund> createUfund(@RequestBody Ufund hero) {
        // TODO
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    /**
     * Updates the {@linkplain Hero hero} with the provided {@linkplain Hero hero} object, if it exists
     * 
     * @param hero The {@link Hero hero} to update
     * 
     * @return ResponseEntity with updated {@link Hero hero} object and HTTP status of OK if updated<br>
     * ResponseEntity with HTTP status of NOT_FOUND if not found<br>
     * ResponseEntity with HTTP status of INTERNAL_SERVER_ERROR otherwise
     */
    @PutMapping("")
    public ResponseEntity<Ufund> updateUfund(@RequestBody Ufund hero) {
        // TODO
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * Deletes a {@linkplain Hero hero} with the given id
     * 
     * @param id The id of the {@link Hero hero} to deleted
     * 
     * @return ResponseEntity HTTP status of OK if deleted<br>
     * ResponseEntity with HTTP status of NOT_FOUND if not found<br>
     * ResponseEntity with HTTP status of INTERNAL_SERVER_ERROR otherwise
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Ufund> deleteUfund(@PathVariable int id) {
        // TODO
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
