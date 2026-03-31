package com.hirevia.requests;

import lombok.Data;

import java.util.List;

@Data
public class CreateJobRequest {
    private String title;
    private String description;
    private Long categoryId;
    private List<String> responsibilities;
    private String requiredExperience;
    private String avgSalary;
    private List<String> requiredSkills;
    private Long companyId;
    private String timing;
}
