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

import com.ufund.api.model.Ufund;

/**
 * Implements the functionality for JSON file-based peristance for Heroes
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
public class UfundFileDAO implements UfundDAO {
    /*
     * TODO
     * Update references to ufund
     * Implement functions
     */
    private static final Logger LOG = Logger.getLogger(UfundFileDAO.class.getName());
    Map<Integer, Ufund> ufunds;     // Provides a local cache of the hero objects
                                    // so that we don't need to read from the file
                                    // each time
    private ObjectMapper objectMapper;  // Provides conversion between Hero
                                        // objects and JSON text format written
                                        // to the file
    private static int nextId;  // The next Id to assign to a new hero
    private String filename;    // Filename to read from and write to

     /**
     * Creates a Hero File Data Access Object
     * 
     * @param filename Filename to read from and write to
     * @param objectMapper Provides JSON Object to/from Java Object serialization and deserialization
     * 
     * @throws IOException when file cannot be accessed or read from
     */
    public UfundFileDAO(@Value("${gifts.file}") String filename, ObjectMapper objectMapper) throws IOException {
        this.filename = filename;
        this.objectMapper = objectMapper;
        load();  // load the heroes from the file
    }

    /**
     * Generates the next id for a new {@linkplain Hero hero}
     * 
     * @return The next id
     */
    private synchronized static int nextId() {
        int id = nextId;
        ++nextId;
        return id;
    }

    /**
     * Generates an array of {@linkplain Hero heroes} from the tree map
     * 
     * @return  The array of {@link Hero heroes}, may be empty
     */
    private Ufund[] getHeroesArray() {
        return getHeroesArray(null);
    }

    /**
     * Generates an array of {@linkplain Hero heroes} from the tree map for any
     * {@linkplain Hero heroes} that contains the text specified by containsText
     * <br>
     * If containsText is null, the array contains all of the {@linkplain Hero heroes}
     * in the tree map
     * 
     * @return  The array of {@link Hero heroes}, may be empty
     */
    private Ufund[] getHeroesArray(String containsText) { // if containsText == null, no filter
        ArrayList<Ufund> heroArrayList = new ArrayList<>();

        for (Ufund hero : ufunds.values()) {
            if (containsText == null || hero.getName().contains(containsText)) {
                heroArrayList.add(hero);
            }
        }

        Ufund[] heroArray = new Ufund[heroArrayList.size()];
        heroArrayList.toArray(heroArray);
        return heroArray;
    }

    /**
     * Saves the {@linkplain Hero heroes} from the map into the file as an array of JSON objects
     * 
     * @return true if the {@link Hero heroes} were written successfully
     * 
     * @throws IOException when file cannot be accessed or written to
     */
    private boolean save() throws IOException {
        Ufund[] heroArray = getHeroesArray();

        // Serializes the Java Objects to JSON objects into the file
        // writeValue will thrown an IOException if there is an issue
        // with the file or reading from the file
        objectMapper.writeValue(new File(filename),heroArray);
        return true;
    }

    /**
     * Loads {@linkplain Hero heroes} from the JSON file into the map
     * <br>
     * Also sets next id to one more than the greatest id found in the file
     * 
     * @return true if the file was read successfully
     * 
     * @throws IOException when file cannot be accessed or read from
     */
    private boolean load() throws IOException {
        ufunds = new TreeMap<>();
        nextId = 0;

        // Deserializes the JSON objects from the file into an array of heroes
        // readValue will throw an IOException if there's an issue with the file
        // or reading from the file
        Ufund[] heroArray = objectMapper.readValue(new File(filename), Ufund[].class);

        // Add each hero to the tree map and keep track of the greatest id
        for (Ufund hero : heroArray) {
            ufunds.put(hero.getId(),hero);
            if (hero.getId() > nextId)
                nextId = hero.getId();
        }
        // Make the next id one greater than the maximum from the file
        ++nextId;
        return true;
    }

    @Override
    public Ufund[] getItems() throws IOException {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getItems'");
    }

    @Override
    public Ufund[] find(String containsText) throws IOException {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'find'");
    }

    @Override
    public Ufund getItem(int id) throws IOException {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getItem'");
    }

    @Override
    public Ufund createItem(Ufund item) throws IOException {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'createItem'");
    }

    @Override
    public Ufund updateItem(Ufund item) throws IOException {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateItem'");
    }

    @Override
    public boolean deleteItem(int id) throws IOException {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteItem'");
    }
}