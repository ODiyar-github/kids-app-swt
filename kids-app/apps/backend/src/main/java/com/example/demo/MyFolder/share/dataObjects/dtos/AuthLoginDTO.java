package com.example.demo.MyFolder.share.dataObjects.dtos;

public class AuthLoginDTO {
    private UserDTO user;
    private String username;
    private String password;

    public AuthLoginDTO() {}

    public void setUser(String username, String password, UserDTO user) {
        this.password = password;
        this.username = username;
        this.user = user;
    }

    public UserDTO getUser(String username, String password) {
        if (this.username == username && this.password == password) {
            return user;
        }
        return null;
    }
}
