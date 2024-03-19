package com.ufund.api.ufundapi.controller;

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
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import com.ufund.api.ufundapi.model.CartItem;
import com.ufund.api.ufundapi.model.Order;
import com.ufund.api.ufundapi.model.OrderItem;
import com.ufund.api.ufundapi.model.User;
import com.ufund.api.ufundapi.persistence.UserDAO;

/**
 * Handles the REST API requests for the User resource
 * 
 * {@literal @}RestController Spring annotation identifies this class as a REST API method handler to the Spring framework
 * 
 * @author Howard Kong
 * @author Austin Kunkel
 * @author
 * @author
 */

@RestController
@RequestMapping("users")
public class UserController {

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
        LOG.info("GET /users/" + id);
        try {
            User user = userDAO.getUser(id);

            if (user != null)
                return new ResponseEntity<User>(user, HttpStatus.OK);
            else
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        catch (IOException ioe) {
            LOG.log(Level.SEVERE, ioe.getLocalizedMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Respond to the GET request for a {@linkplain User user} for the given email
     * 
     * @param email The email used to locate the {@link User user}
     * @return ResponseEntity with {@link User user} object and HTTP status of OK if found
     *         ResponseEntity with HTTP status of NOT_FOUND if not found
     *         ResponseEntity with HTTP status of INTERNAL_SERVER_ERROR otherwise
     */
    @GetMapping("/email/")
    public ResponseEntity<User> getUserByEmail(@RequestParam String email) {
        LOG.info("GET /users/email/?email=" + email);
        try {
            User user = userDAO.getUserByEmail(email);

            if (user != null)
                return new ResponseEntity<User>(user, HttpStatus.OK);
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
        LOG.info("GET /users");

        try {
            User[] allUsers = userDAO.getUsers();
            return new ResponseEntity<User[]>(allUsers, HttpStatus.OK);
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
     * GET http://localhost:8080/users/?username=ma
     */
    @GetMapping("/")
    public ResponseEntity<User[]> searchUsers(@RequestParam String username) {
        LOG.info("GET /users/?username=" + username);

        try {
            username = username.toLowerCase();
            User[] matchingUsers = userDAO.findUsers(username);
            return new ResponseEntity<User[]>(matchingUsers, HttpStatus.OK);
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
        LOG.info("POST /users/" + user.getId());

        try {
            if (userDAO.getUserByEmail(user.getEmail()) != null) // check if there is a user with the email
                return new ResponseEntity<>(HttpStatus.CONFLICT);

            User newUser = userDAO.createUser(user);

            if (newUser != null)
                return new ResponseEntity<User>(newUser, HttpStatus.CREATED);
            else
                return new ResponseEntity<User>(newUser, HttpStatus.CONFLICT);
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
        LOG.info("PUT /users/" + user.getId());

        try {
            User updatedUser = userDAO.updateUser(user);

            if (updatedUser != null)
                return new ResponseEntity<User>(updatedUser, HttpStatus.OK);
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
     * @return ResponseEntity HTTP status of OK if deleted
     *         ResponseEntity with HTTP status of NOT_FOUND if not found
     *         ResponseEntity with HTTP status of INTERNAL_SERVER_ERROR otherwise
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable int id) {
        LOG.info("DELETE /users/" + id);

        try {
            boolean deleted = userDAO.deleteUser(id);

            if (deleted == true)
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
     * Respond to the GET request for the cart of the {@linkplain User user}
     * 
     * @param id The id of the {@link User user}
     * @return ResponseEntity with array of {@link CartItem cartItem} objects (may be empty) and HTTP status of OK
     *         ResponseEntity with HTTP status of NOT_FOUND if not found
     *         ResponseEntity with HTTP status of INTERNAL_SERVER_ERROR otherwise
     */
    @GetMapping("/{id}/cart")
    public ResponseEntity<CartItem[]> getUserCart(@PathVariable int id) {
        /*
         * TODO
         * Does not work for admin as admin does not have a cart/purchases
         */
        
        LOG.info("GET /users/" + id + "/cart");

        try {
            User user = userDAO.getUser(id);
            if (user == null)
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);

            List<CartItem> userCart = user.getCart();
            CartItem[] cart = userCart.toArray(new CartItem[userCart.size()]);
            
            return new ResponseEntity<CartItem[]>(cart, HttpStatus.OK);
        }
        catch (IOException ioe) {
            LOG.log(Level.SEVERE, ioe.getLocalizedMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update the cart of the {@linkplain User user} with the provided id and {@linkplain CartItem cartItem} object, if it exists
     * 
     * @param id The id of the {@link User user} to update
     * @param cartItem The cart item to update for the {@link User user}
     * @return ResponseEntity with updated {@link User user} object and HTTP status of OK if updated
     *         ResponseEntity with HTTP status of NOT_FOUND if not found
     *         ResponseEntity with HTTP status of INTERNAL_SERVER_ERROR otherwise
     */
    @PostMapping("/{id}/cart")
    public ResponseEntity<User> addItemUserCart(@PathVariable int id, @RequestBody CartItem cartItem) {
        /*
         * TODO
         * Does not work for admin as admin does not have a cart/purchases
         */
        
        LOG.info("PUT /users/" + id + "/cart/" + cartItem.getItemId());

        try {
            User user = userDAO.getUser(id);
            if (user == null)
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);

            List<CartItem> userCart = user.getCart();
            userCart.add(cartItem);

            User newUser = new User(user.getId(), user.getUsername(), user.getPassword(), user.getEmail(), userCart, user.getOrders());
            User updatedUser = userDAO.updateUser(newUser);

            if (updatedUser != null)
                return new ResponseEntity<User>(updatedUser, HttpStatus.OK);
            else 
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        catch (IOException ioe) {
            LOG.log(Level.SEVERE, ioe.getLocalizedMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    /**
     * Update the cart of the {@linkplain User user} with the provided id and {@linkplain CartItem cartItem} object, if it exists
     * 
     * @param id The id of the {@link User user} to update
     * @param cartItem The cart item to update for the {@link User user}
     * @return ResponseEntity with updated {@link User user} object and HTTP status of OK if updated
     *         ResponseEntity with HTTP status of NOT_FOUND if not found
     *         ResponseEntity with HTTP status of INTERNAL_SERVER_ERROR otherwise
     */
    @PutMapping("/{id}/cart")
    public ResponseEntity<User> updateItemUserCart(@PathVariable int id, @RequestBody CartItem cartItem) {
        /*
         * TODO
         * Does not work for admin as admin does not have a cart/purchases
         */
        
        LOG.info("PUT /users/" + id + "/cart/" + cartItem.getItemId());

        throw new UnsupportedOperationException("Unimplemented method");
        // try {
        //    
        // }
        // catch (IOException ioe) {
        //     LOG.log(Level.SEVERE, ioe.getLocalizedMessage());
        //     return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        // }
    }

    /**
     * Respond to the GET request for the purchases of the {@linkplain User user}
     * 
     * @param id The id of the {@link User user}
     * @return ResponseEntity with array of {@link OrderItem purchasedItem} objects (may be empty) and HTTP status of OK
     *         ResponseEntity with HTTP status of NOT_FOUND if not found
     *         ResponseEntity with HTTP status of INTERNAL_SERVER_ERROR otherwise
     */
    @GetMapping("/{id}/purchases")
    public ResponseEntity<Order[]> getUserOrders(@PathVariable int id) {
        /*
         * TODO
         * Does not work for admin as admin does not have a cart/purchases
         */
        
        LOG.info("GET /users/" + id + "/purchases");

        try {
            User user = userDAO.getUser(id);
            if (user == null)
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);

            List<Order> userOrders = user.getOrders();
            Order[] orders = userOrders.toArray(new Order[userOrders.size()]);
            
            return new ResponseEntity<Order[]>(orders, HttpStatus.OK);
        }
        catch (IOException ioe) {
            LOG.log(Level.SEVERE, ioe.getLocalizedMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Checkout the cart of the {@linkplain User user} with the provided id and update the user's cart and purchases
     * 
     * @param id The id of the {@link User user} to checkout cart
     * @return ResponseEntity with updated {@link User user} object and HTTP status of OK if updated
     *         ResponseEntity with HTTP status of NOT_FOUND if user not found
     *         ResponseEntity with HTTP status of CONFLICT if cart is empty
     *         ResponseEntity with HTTP status of INTERNAL_SERVER_ERROR otherwise
     */
    @PostMapping("/{id}/cart/checkout")
    public ResponseEntity<Order> userCheckout(@PathVariable int id) {
        /*
         * TODO
         * Does not work for admin as admin does not have a cart/purchases
         */
        
        LOG.info("POST /users/" + id + "/cart/checkout");

        try {
            User user = userDAO.getUser(id);

            if (user == null)
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);

            List<CartItem> userCart = user.getCart();
            if (userCart == null)
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            
            List<OrderItem> orderItems = new ArrayList<>(userCart.size());
            for (CartItem item : userCart) {
                OrderItem newOrderItem = new OrderItem(item.getItemId(), item.getItemAmount());
                orderItems.add(newOrderItem);
            }

            // Create new order and add it to a user's orders
            Order newOrder = new Order(LocalDateTime.now(), orderItems);
            user.getOrders().add(newOrder);

            return new ResponseEntity<Order>(newOrder, HttpStatus.OK);
        }
        catch (IOException ioe) {
            LOG.log(Level.SEVERE, ioe.getLocalizedMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
