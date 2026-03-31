package com.hirevia.requests;

import lombok.Data;

import java.util.List;

@Data
public class UserEditProfileRequest {

    private String fullName;
    private String phoneNumber;
    private String location;
    private String experience;
    private List<String> skills;
    private String resume;
    private String profilePicture;
    private String bio;
}
