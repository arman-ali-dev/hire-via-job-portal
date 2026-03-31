package com.hirevia.service.Impl;

import com.hirevia.config.JwtProvider;
import com.hirevia.enums.JobTiming;
import com.hirevia.enums.UserRole;
import com.hirevia.exceptions.InvalidDataException;
import com.hirevia.exceptions.NotFoundException;
import com.hirevia.models.*;
import com.hirevia.repositories.*;
import com.hirevia.requests.CreateJobRequest;
import com.hirevia.service.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;
import java.util.ArrayList;
import java.util.List;

@Service
public class JobServiceImpl implements JobService {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private CompanyService companyService;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmployerRepository employerRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private SavedJobRepository savedJobRepository;



    @Override
    public Job createJob(String jwt, CreateJobRequest request) throws AccessDeniedException {

        String email = jwtProvider.getEmailFromJwtToken(jwt);
        User user = userRepository.findByEmail(email);

        if (!user.getRole().equals(UserRole.EMPLOYER)) {
            throw new AccessDeniedException("You are not authorized to create a job");
        }

        Employer employer = employerRepository.findByUserId(user.getId());
        if (employer == null) {
            throw new AccessDeniedException("Employer profile not found");
        }

        System.out.println("CATEGORY ID = " + request.getCategoryId());
        System.out.println("COMPANY ID = " + request.getCompanyId());


        Category category = categoryService.getCategoryById(request.getCategoryId());
        Company company = companyService.getCompanyById(request.getCompanyId());


        if (request.getTitle() == null || request.getTitle().trim().isEmpty())
            throw new InvalidDataException("Job title is required!");

        if (request.getDescription() == null || request.getDescription().trim().isEmpty())
            throw new InvalidDataException("Job description is required!");

        if (request.getResponsibilities() == null || request.getResponsibilities().isEmpty())
            throw new InvalidDataException("At least one responsibility is required!");

        if (request.getRequiredSkills() == null || request.getRequiredSkills().isEmpty())
            throw new InvalidDataException("At least one skill is required!");

        if (request.getRequiredExperience() == null || request.getRequiredExperience().trim().isEmpty())
            throw new InvalidDataException("Experience is required!");

        if (request.getAvgSalary() == null || request.getAvgSalary().trim().isEmpty())
            throw new InvalidDataException("Salary is required!");

        Job job = new Job();
        job.setTitle(request.getTitle());
        job.setDescription(request.getDescription());
        job.setCategory(category);
        job.setResponsibilities(request.getResponsibilities());
        job.setRequiredSkills(request.getRequiredSkills());
        job.setRequiredExperience(request.getRequiredExperience());
        job.setAvgSalary(request.getAvgSalary());
        job.setCompany(company);
        job.setEmployer(employer);
        job.setTiming(JobTiming.valueOf(request.getTiming()));

        Job savedJob = jobRepository.save(job);

        category.setOpenPositions(category.getOpenPositions() + 1);
        categoryRepository.save(category);

        return savedJob;
    }


    @Override
    public Job updateJob(Long jobId, Job job, String jwt) throws AccessDeniedException {
        String email = jwtProvider.getEmailFromJwtToken(jwt);
        User user = userRepository.findByEmail(email);

        if (!user.getRole().equals(UserRole.EMPLOYER)) {
            throw new AccessDeniedException("You are not authorized to create a job");
        }

        Employer employer = employerRepository.findByUserId(user.getId());

        if (employer == null) {
            throw new AccessDeniedException("Employer profile not found");
        }
        Job existingJob = this.getJobById(jobId);

        if (job.getTitle() != null && !job.getTitle().trim().isEmpty()) {
            existingJob.setTitle(job.getTitle());
        }

        if (job.getDescription() != null && !job.getDescription().trim().isEmpty()) {
            existingJob.setDescription(job.getDescription());
        }

        if (job.getCategory() != null) {
            existingJob.setCategory(job.getCategory());
        }

        if (job.getResponsibilities() != null && !job.getResponsibilities().isEmpty()) {
            existingJob.setResponsibilities(job.getResponsibilities());
        }

        if (job.getRequiredSkills() != null && !job.getRequiredSkills().isEmpty()) {
            existingJob.setRequiredSkills(job.getRequiredSkills());
        }

        if (job.getRequiredExperience() != null && !job.getRequiredExperience().trim().isEmpty()) {
            existingJob.setRequiredExperience(job.getRequiredExperience());
        }

        if (job.getAvgSalary() != null && !job.getAvgSalary().trim().isEmpty()) {
            existingJob.setAvgSalary(job.getAvgSalary());
        }

        if (job.getCompany() != null) {
            existingJob.setCompany(job.getCompany());
        }

        if (job.getEmployer() != null) {
            existingJob.setEmployer(job.getEmployer());
        }

        if (job.getTiming() != null) {
            existingJob.setTiming(job.getTiming());
        }

        existingJob.setActive(job.isActive());

        return jobRepository.save(existingJob);
    }


    @Override
    public Job getJobById(Long jobId) {
        return jobRepository.findById(jobId).orElseThrow(() -> new NotFoundException("Job Not Found!"));
    }

    @Override
    @Transactional
    public void deleteJob(Long jobId, String jwt) throws AccessDeniedException {
        String email = jwtProvider.getEmailFromJwtToken(jwt);
        User user = userRepository.findByEmail(email);

        if (!user.getRole().equals(UserRole.EMPLOYER)) {
            throw new AccessDeniedException("You are not authorized to create a job");
        }

        Employer employer = employerRepository.findByUserId(user.getId());

        if (employer == null) {
            throw new AccessDeniedException("Employer profile not found");
        }


        savedJobRepository.deleteByJobId(jobId);
        applicationRepository.deleteByJobId(jobId);

        Job job = this.getJobById(jobId);
        jobRepository.delete(job);
    }

    @Override
    public List<Job> getAllJobs() {
        return jobRepository.findAllByOrderByCreatedAtDesc();
    }


    @Override
    public List<Job> getJobsByEmployer(Long employerId) {
        return jobRepository.findByEmployerId(employerId);
    }

    @Override
    public List<Job> getJobsByCategory(Long categoryId) {
        return jobRepository.findByCategoryId(categoryId);
    }

    @Override
    public List<Job> searchJobs(String keyword, String location) {
        System.out.println(location + " " + keyword);




        return jobRepository.searchJobs(keyword, location);
    }

    @Override
    public List<Job> sortJobs(String fieldName, String order) {
        List<String> allowedFields = List.of("title", "createdAt", "avgSalary", "requiredExperience");

        if (!allowedFields.contains(fieldName)) {
            throw new InvalidDataException("Invalid sort field: " + fieldName);
        }

        Sort.Direction direction;
        if (order == null || order.equalsIgnoreCase("asc")) {
            direction = Sort.Direction.ASC;
        } else if (order.equalsIgnoreCase("desc")) {
            direction = Sort.Direction.DESC;
        } else {
            throw new InvalidDataException("Invalid sort order: must be 'asc' or 'desc'.");
        }

        return jobRepository.findAll(Sort.by(direction, fieldName));
    }

    @Override
    public List<Job> GetJobsByCompany(Long companyId) {
        return jobRepository.findByCompanyId(companyId);
    }

    @Override
    public List<Job> getRecommendedJobs(User user) {

        if (user.getSkills() == null || user.getSkills().isEmpty()) {
            return jobRepository.findAll();
        }

        List<Job> matchedJobs = jobRepository.findRecommendedJobs(
                user.getSkills()
        );

        List<Long> appliedJobIds =
                applicationRepository.findAppliedJobIdsByUser(user.getId());

        return matchedJobs.stream()
                .filter(job -> !appliedJobIds.contains(job.getId()))
                .toList();
    }


}
