package com.example.demo.MyFolder.share.util;

import org.springframework.stereotype.Component;

import com.example.demo.MyFolder.share.dataObjects.dtos.JsonData;

@Component
public class SingleDataPacketHolder {
    private JsonData jsonData;

    public void setJsonData(JsonData jsonData) {
        this.jsonData = jsonData;
    }

    public JsonData getData() {
        if (jsonData != null) {
            return this.jsonData;
        }
        return null;
    }
}
