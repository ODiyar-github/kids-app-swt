package com.example.demo.services.api.feedbackService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.services.couchdb.CouchDbStorage;
import com.example.demo.share.dataObjects.dtos.JsonData;
import com.example.demo.share.dataObjects.util.AppFeedback;
import com.example.demo.share.interfaces.MessageHandler;
import com.example.demo.share.util.RabbitMqPattern;
import com.example.demo.share.util.SingleDataPacketHolder;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * @file CreateFeedbackHandler.java
 * @description This MessageHandler is responsible for processing RabbitMQ messages
 * that request the creation of new application feedback. It deserializes the feedback data,
 * assigns a unique ID, adds it to the main application data (`JsonData`),
 * and then persists the updated data to CouchDB.
 */

/**
 * @class CreateFeedbackHandler
 * @description A Spring Component that implements the `MessageHandler` interface
 * to handle requests for creating application feedback. It interacts with
 * `ObjectMapper` for data conversion, `CouchDbStorage` for persistence,
 * and `SingleDataPacketHolder` for in-memory data management.
 */
@Component
public class CreateFeedbackHandler implements MessageHandler {

    /**
     * @private
     * @property {ObjectMapper} objectMapper - An instance of Jackson `ObjectMapper` for converting
     * data between Map and DTO objects.
     */
    private final ObjectMapper objectMapper;
    /**
     * @private
     * @property {CouchDbStorage} couchdbStorage - An instance of `CouchDbStorage` for interacting
     * with the CouchDB database.
     */
    private final CouchDbStorage couchdbStorage;
    /**
     * @private
     * @property {SingleDataPacketHolder} jsonDataHolder - An instance of `SingleDataPacketHolder`
     * that holds the entire application data (`JsonData`) in-memory.
     */
    private final SingleDataPacketHolder jsonDataHolder;

    /**
     * @constructor
     * @description Creates a new instance of `CreateFeedbackHandler`.
     * Dependencies (`ObjectMapper`, `CouchDbStorage`, `SingleDataPacketHolder`)
     * are automatically injected by Spring.
     * @param {ObjectMapper} objectMapper - The injected `ObjectMapper`.
     * @param {CouchDbStorage} couchdbStorage - The injected `CouchDbStorage`.
     * @param {SingleDataPacketHolder} jsonDataHolder - The injected `SingleDataPacketHolder`.
     */
    @Autowired
    public CreateFeedbackHandler(ObjectMapper objectMapper, CouchDbStorage couchdbStorage,
            SingleDataPacketHolder jsonDataHolder) {
        this.objectMapper = objectMapper;
        this.couchdbStorage = couchdbStorage;
        this.jsonDataHolder = jsonDataHolder;
    }

    /**
     * @method getPattern
     * @description Returns the RabbitMQ pattern that this handler is responsible for.
     * @returns {RabbitMqPattern} The `RabbitMqPattern.APP_CREATE_FEEDBACK`.
     */
    @Override
    public RabbitMqPattern getPattern() {
        // This is the pattern that the handler responds to
        return RabbitMqPattern.APP_CREATE_FEEDBACK;
    }

    /**
     * @method handle
     * @description Processes the incoming message containing new application feedback data.
     * Deserializes the data, generates a unique ID for the feedback (if not provided),
     * adds it to the existing feedback list within the `JsonData` object,
     * updates the `JsonData` in CouchDB, and refreshes the `SingleDataPacketHolder`.
     * @param {Map<String, Object>} data - The payload of the message, containing the `AppFeedback` object.
     * @returns {Object} A Map with status information (`"status"`, `"message"`, `"feedbackId"`, `"documentId"`, `"documentRev"`)
     * on success, or an error response Map on failure.
     */
    @Override
    public Object handle(Map<String, Object> data) {
        System.out.println("⬅️ Backend receives RabbitMQ request: " + getPattern().name());
        try {
            // 1. Deserialize AppFeedback data from the RabbitMQ message
            AppFeedback newFeedback = null;
            try {
                newFeedback = objectMapper.convertValue(data, AppFeedback.class);
            } catch (IllegalArgumentException e) {
                System.err.println("❌ Error deserializing AppFeedback: " + e.getMessage());
                return null;
            }
            // 2. Generate a unique feedbackId and set the timestamp (if not already present)
            if (newFeedback.getFeedbackId() == null || newFeedback.getFeedbackId().isEmpty()) {
                newFeedback.setFeedbackId(UUID.randomUUID().toString());
            }

            // 3. Get the current main document (JsonData) from the SingleDataPacketHolder
            JsonData currentJsonData = jsonDataHolder.getData();

            if (currentJsonData == null) {
                System.err.println("❌ Error: Main data not initialized. Cannot add feedback.");
                throw new IllegalStateException("Application data in holder is null.");
            }

            // 4. Ensure the list for feedbacks exists in the JsonData object
            List<AppFeedback> feedbackList = currentJsonData.getFeedBackAppData();
            if (feedbackList == null) {
                feedbackList = new ArrayList<>();
                currentJsonData.setFeedBackAppData(feedbackList);
            }

            // 5. Add the new feedback to the list
            feedbackList.add(newFeedback);
            System.out.println("New feedback added. Current count: " + feedbackList.size());

            currentJsonData.setFeedBackAppData(feedbackList);
            // 6. Update the entire JsonData document in CouchDB
            // The `update` method in CouchDbStorage updates the _rev in the passed object.
            currentJsonData = this.couchdbStorage.update(currentJsonData);

            // 7. Update the SingleDataPacketHolder with the latest state
            jsonDataHolder.setJsonData(currentJsonData);

            System.out.println("✅ App feedback successfully saved to CouchDB. New revision: "
                    + jsonDataHolder.getData().get_rev());

            // 8. Build a success response for the BFF/Frontend
            Map<String, Object> response = new HashMap<>();
            response.put("status", "SUCCESS");
            response.put("message", "Feedback successfully created and saved.");
            response.put("feedbackId", newFeedback.getFeedbackId());
            response.put("documentId", currentJsonData.get_id());
            response.put("documentRev", jsonDataHolder.getData().get_rev());
            return response;

        } catch (Exception e) {
            System.err.println("❗ Error creating/saving app feedback: " + e.getMessage());
            e.printStackTrace();
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "ERROR");
            errorResponse.put("message", "Error processing feedback: " + e.getMessage());
            return errorResponse;
        }
    }
}
