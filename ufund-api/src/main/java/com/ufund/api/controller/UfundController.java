package com.ufund.api.controller;

import org.apache.catalina.connector.Response;
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

import com.ufund.api.model.Ufund;

import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * @author
 * @author
 * @author
 * @author
 */

@RestController
@RequestMapping("") //add the request like the heroes controller does
public class UfundController {
 
    
    public UfundController(/*TODO*/){
        /* TODO */
    }

    /*TODO*/
    @GetMapping("/{id}")
    public ResponseEntity<Ufund> get(@PathVariable int id){
        /*TODO*/
        return new ResponseEntity<Ufund>(HttpStatus.ACCEPTED);
    }

    /*TODO*/
    /**
     * TODO 
     * add other functions such as search, return all, etc
     */
}
