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

import com.ufund.api.model.User;
import com.ufund.api.persistence.UserDAO;

/**
 * Handles the REST API requests for the User resource
 * 
 * {@literal @}RestController Spring annotation identifies this class as a REST API method handler to the Spring framework
 * 
 * @author Howard Kong
 * @author
 * @author
 * @author
 */

@RestController
@RequestMapping("users") //add the request like the heroes controller does
public class UserController {
    /*
     * TODO
     * Implement CRUD operation functions
     * Add additional functions (search, return all, etc)
     */

    private static final Logger LOG = Logger.getLogger(UserController.class.getName());
    private UserDAO userDAO;

    /**
     * Create a REST API controller to respond to requests
     * 
     * @param userDAO The {@link UserDAO User Data Access Object} to perform CRUD operations
     *                 This dependency is injected by the Spring Framework
     */
    public UserController(UserDAO userDAO){
        this.userDAO = userDAO;
    }

    /**
     * Respond to the GET request for a {@linkplain User user} for the given id
     * 
     * @param id The id used to locate the {@link User user}
     * @return ResponseEntity with {@link User user} object and HTTP status of OK if found
     *         ResponseEntity with HTTP status of NOT_FOUND if not found
     *         ResponseEntity with HTTP status of INTERNAL_SERVER_ERROR otherwise
     */
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable int id) {
        // TODO
        LOG.info("GET /users/" + id);

        try {
            User user = userDAO.getUser(id);
            if (user != null)
                return new ResponseEntity<>(user, HttpStatus.OK);
            else
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        catch (IOException ioe) {
            LOG.log(Level.SEVERE, ioe.getLocalizedMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Respond to the GET request for all {@linkplain User users}
     * 
     * @return ResponseEntity with array of {@link User user} objects (may be empty) and HTTP status of OK
     *         ResponseEntity with HTTP status of INTERNAL_SERVER_ERROR otherwise
     */
    @GetMapping("")
    public ResponseEntity<User[]> getAllUsers() {
        // TODO
        LOG.info("GET /users");

        try {
            User[] users = userDAO.getUsers();

            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (IOException ioe) {
            LOG.log(Level.SEVERE, ioe.getLocalizedMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Respond to the GET request for all {@linkplain User users} whose name contains the text in name
     * 
     * @param name The name parameter which contains the text used to find the {@link User users}
     * @return ResponseEntity with array of {@link User user} objects (may be empty) and HTTP status of OK
     *         ResponseEntity with HTTP status of INTERNAL_SERVER_ERROR otherwise
     *
     * Example: Find all users that contain the text "ma"
     * GET http://localhost:8080/users/?name=ma
     */
    @GetMapping("/")
    public ResponseEntity<User[]> searchUsers(@RequestParam String username) {
        // TODO
        LOG.info("GET /users/?username=" + username);

        try {
            User[] allUsers = userDAO.getUsers();
            ArrayList<User> matchingUsers = new ArrayList<>();

            for (User user : allUsers)
                if (user.getUsername().contains(username))
                    matchingUsers.add(user);

            User[] users = matchingUsers.toArray(new User[matchingUsers.size()]);
            return new ResponseEntity<>(HttpStatus.OK);
        } 
        catch (IOException ioe) {
            LOG.log(Level.SEVERE, ioe.getLocalizedMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Create a {@linkplain User user} with the provided user object
     * 
     * @param user - The {@link User user} to create
     * @return ResponseEntity with created {@link User user} object and HTTP status of CREATED
     *         ResponseEntity with HTTP status of CONFLICT if {@link User user} object already exists
     *         ResponseEntity with HTTP status of INTERNAL_SERVER_ERROR otherwise
     */
    @PostMapping("")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        // TODO
        LOG.info("POST /users/" + user.getId());

        try {
            User[] users = userDAO.getUsers();

            for (User a_user : users)
                if (a_user.getUsername().equals(user.getUsername()))
                    return new ResponseEntity<>(HttpStatus.CONFLICT);

            User newUser = userDAO.createUser(user);
            
            return new ResponseEntity<>(HttpStatus.CREATED);
        }
        catch (IOException ioe) {
            LOG.log(Level.SEVERE, ioe.getLocalizedMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update the {@linkplain User user} with the provided {@linkplain User user} object, if it exists
     * 
     * @param user The {@link User user} to update
     * @return ResponseEntity with updated {@link User user} object and HTTP status of OK if updated
     *         ResponseEntity with HTTP status of NOT_FOUND if not found
     *         ResponseEntity with HTTP status of INTERNAL_SERVER_ERROR otherwise
     */
    @PutMapping("")
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        // TODO
        LOG.info("PUT /users/" + user.getId());

        try {
            User updatedUser = userDAO.updateUser(user);

            if (updatedUser != null)
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
     * Delete a {@linkplain User user} with the given id
     * 
     * @param id The id of the {@link User user} to delete
     * 
     * @return ResponseEntity HTTP status of OK if deleted
     *         ResponseEntity with HTTP status of NOT_FOUND if not found
     *         ResponseEntity with HTTP status of INTERNAL_SERVER_ERROR otherwise
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable int id) {
        // TODO
        LOG.info("DELETE /users/" + id);

        try {
            boolean hasBeenDeleted = userDAO.deleteUser(id);

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
