package com.example.demo.StorageService;


import org.lightcouch.CouchDbClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CouchDbConfig {

    @Bean
    public CouchDbClient couchDbClient(
            @Value("${couchdb.protocol}") String protocol,
            @Value("${couchdb.host}") String host,
            @Value("${couchdb.port}") int port,
            @Value("${couchdb.username}") String username,
            @Value("${couchdb.password}") String password,
            @Value("${couchdb.database}") String dbName) {

        return new CouchDbClient(dbName, true, protocol, host, port, username, password);
    }
}
