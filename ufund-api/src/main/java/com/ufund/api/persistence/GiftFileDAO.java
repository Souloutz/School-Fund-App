package com.ufund.api.persistence;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Map;
import java.util.TreeMap;
import java.util.logging.Logger;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.ufund.api.model.Gift;

/**
 * Implements the functionality for JSON file-based peristance for Gifts
 * 
 * {@literal @}Component Spring annotation instantiates a single instance of this
 * class and injects the instance into other classes as needed
 * 
 * @author Howard Kong
 * @author
 * @author
 * @author
 */
@Component
public class GiftFileDAO implements GiftDAO {
    /*
     * TODO
     * Update references to ufund
     * Implement functions
     */
    private static final Logger LOG = Logger.getLogger(GiftFileDAO.class.getName());
    Map<Integer, Gift> gifts;     // Provides a local cache of the gift objects so that we don't need to read from the file each time
    private ObjectMapper objectMapper;  // Provides conversion between Gift objects and JSON text format written to the file
    private static int nextId;  // The next Id to assign to a new gift
    private String filename;    // Filename to read from and write to

     /**
     * Create a Gift File Data Access Object
     * 
     * @param filename Filename to read from and write to
     * @param objectMapper Provides JSON Object to/from Java Object serialization and deserialization
     * @throws IOException when file cannot be accessed or read from
     */
    public GiftFileDAO(@Value("${gifts.file}") String filename, ObjectMapper objectMapper) throws IOException {
        this.filename = filename;
        this.objectMapper = objectMapper;
        load();  // load the gifts from the file
    }

    /**
     * Generate the next id for a new {@linkplain Gift gift}
     * 
     * @return The next id
     */
    private synchronized static int nextId() {
        int id = nextId;
        ++nextId;
        return id;
    }

    /**
     * Generate an array of {@linkplain Gift gifts} from the tree map
     * 
     * @return The array of {@link Gift gifts}, may be empty
     */
    private Gift[] getGiftsArray() {
        return getGiftsArray(null);
    }

    /**
     * Generate an array of {@linkplain Gift gifts} from the tree map for any
     * {@linkplain Gift gifts} that contains the text specified by containsText
     *
     * If containsText is null, the array contains all of the {@linkplain Gift gifts} in the tree map
     * 
     * @return The array of {@link Gift gifts}, may be empty
     */
    private Gift[] getGiftsArray(String containsText) { // if containsText == null, no filter
        ArrayList<Gift> giftsArrayList = new ArrayList<>();

        for (Gift gift : gifts.values()) {
            if (containsText == null || gift.getName().contains(containsText)) {
                giftsArrayList.add(gift);
            }
        }

        Gift[] giftsArray = new Gift[giftsArrayList.size()];
        giftsArrayList.toArray(giftsArray);
        return giftsArray;
    }

    /**
     * Save the {@linkplain Gift gifts} from the map into the file as an array of JSON objects
     * 
     * @return true if the {@link Gift gifts} were written successfully
     * @throws IOException when file cannot be accessed or written to
     */
    private boolean save() throws IOException {
        Gift[] giftsArray = getGiftsArray();

        // Serializes the Java Objects to JSON objects into the file
        // writeValue will thrown an IOException if there is an issue
        // with the file or reading from the file
        objectMapper.writeValue(new File(filename), giftsArray);
        return true;
    }

    /**
     * Loads {@linkplain Gift gifts} from the JSON file into the map
     * 
     * Also sets next id to one more than the greatest id found in the file
     * 
     * @return true if the file was read successfully
     * @throws IOException when file cannot be accessed or read from
     */
    private boolean load() throws IOException {
        gifts = new TreeMap<>();
        nextId = 0;

        // Deserializes the JSON objects from the file into an array of gifts
        // readValue will throw an IOException if there's an issue with the file
        // or reading from the file
        Gift[] giftsArray = objectMapper.readValue(new File(filename), Gift[].class);

        // Add each gift to the tree map and keep track of the greatest id
        for (Gift gift : giftsArray) {
            gifts.put(gift.getId(), gift);
            if (gift.getId() > nextId)
                nextId = gift.getId();
        }

        // Make the next id one greater than the maximum from the file
        ++nextId;
        return true;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Gift[] getItems() throws IOException {
        synchronized (gifts) {
            return getGiftsArray();
        }
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Gift[] findItem(String containsText) throws IOException {
        synchronized (gifts) {
            return getGiftsArray(containsText);
        }
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Gift getItem(int id) throws IOException {
        synchronized (gifts) {
            if (gifts.containsKey(id))
                return gifts.get(id);
            else
                return null;
        }
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Gift createItem(Gift item) throws IOException {
        synchronized (gifts) {
            Gift newGift = new Gift(nextId(), item.getName());
            gifts.put(newGift.getId(), newGift);
            save(); 

            return newGift;
        }
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Gift updateItem(Gift item) throws IOException {
        synchronized (gifts) {
            if (gifts.containsKey(item.getId()) == false)
                return null;

            gifts.put(item.getId(), item);
            save();
            return item;
        }
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public boolean deleteItem(int id) throws IOException {
        synchronized (gifts) {
            if (gifts.containsKey(id)) {
                gifts.remove(id);
                return save();
            }

            return false;
        }
    }
}