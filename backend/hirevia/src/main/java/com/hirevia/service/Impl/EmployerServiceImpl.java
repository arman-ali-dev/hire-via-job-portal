package com.hirevia.service.Impl;

import com.hirevia.exceptions.NotFoundException;
import com.hirevia.models.Employer;
import com.hirevia.models.User;
import com.hirevia.repositories.EmployerRepository;
import com.hirevia.service.EmployerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployerServiceImpl implements EmployerService {

    @Autowired
    private EmployerRepository employerRepository;

    @Override
    public Employer getEmployerById(Long employerId) {
        return employerRepository.findById(employerId).orElseThrow(() -> new NotFoundException("Employer Not Found!"));
    }

    @Override
    public Employer getEmployer(User user) {
        Employer employer = employerRepository.findByUserId(user.getId());
        if (employer == null) {
            throw new NotFoundException("Employer not found!");
        }

        return employer;
    }
}
