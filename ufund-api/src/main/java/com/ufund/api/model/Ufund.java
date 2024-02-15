package com.ufund.api.model;

import java.util.logging.Logger;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * @author
 * @author
 * @author
 * @author
 */

 //might have to change the name of this class to need or something like that
public class Ufund {
    // private static final Logger LOG = Logger.getLogger(ufund.class.getName());
    @JsonProperty("id") private int id;
    @JsonProperty("name") private String name;

    public Ufund(@JsonProperty("id") int id, @JsonProperty("name") String name){
        this.id = id;
        this.name = name;
    }

    /**
     * Retrieves the id of the hero
     * @return The id of the hero
     */
    public int getId() {return id;}

    /**
     * Sets the name of the hero - necessary for JSON object to Java object deserialization
     * @param name The name of the hero
     */
    public void setName(String name) {this.name = name;}

    /**
     * Retrieves the name of the hero
     * @return The name of the hero
     */
    public String getName() {return name;}

    /*TODO*/
    /*
     *Should probably add more functions 
     */

}
