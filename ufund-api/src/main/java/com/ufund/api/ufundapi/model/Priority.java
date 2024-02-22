package com.ufund.api.ufundapi.model;

public enum Priority {
    NONE(0),
    LOW(1),
    MID(2),
    HIGH(3),
    SEVERE(4);

    private int priorityNumber;

    Priority(int priorityNumber) {
        this.priorityNumber = priorityNumber;
    }

    /**
     * Retrieve the number of the enumerated type 
     * @return The number of the enumerated type
     */
    public int getNumber() {
        return priorityNumber;
    }

    /**
     * Get a priority level based on the priority number provided
     * 
     * @param priorityNumber
     * @return The Priority level associated with the number
     */
    public static Priority getPriority(int priorityNumber) {
        for (Priority priority : Priority.values()) {
            if (priority.getNumber() == priorityNumber)
                return priority;
        }

        return Priority.NONE;
    }
}
