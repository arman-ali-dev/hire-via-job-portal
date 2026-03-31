package com.hirevia.requests;

import com.hirevia.enums.UserRole;
import com.hirevia.models.Company;
import lombok.Data;

import java.util.List;

@Data
public class RegistrationUserRequest {
    private String fullName;
    private String email;
    private String password;
    private String resume;
    private List<String> skills;
    private String location;
    private String phoneNumber;
    private UserRole role;
    private Company company;
}
