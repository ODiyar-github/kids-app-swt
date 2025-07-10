package com.example.demo.MyFolder.config;

import org.lightcouch.CouchDbClient;
import org.lightcouch.CouchDbProperties;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CouchDbConfig {

    @Bean
    public CouchDbProperties couchDbProperties(
            @Value("${couchdb.protocol}") String protocol,
            @Value("${couchdb.host}") String host,
            @Value("${couchdb.port}") int port,
            @Value("${couchdb.username}") String username,
            @Value("${couchdb.password}") String password,
            @Value("${couchdb.database}") String dbName) {

        CouchDbProperties properties = new CouchDbProperties();
        properties.setDbName(dbName);
        properties.setHost(host);
        properties.setPort(port);
        properties.setProtocol(protocol);
        properties.setUsername(username);
        properties.setPassword(password);
        properties.setCreateDbIfNotExist(true);
        properties.setConnectionTimeout(0);
        properties.setSocketTimeout(0);
        return properties;
    }

    @Bean
    public CouchDbClient couchDbClient(CouchDbProperties properties) {
        return new CouchDbClient(properties);
    }
}