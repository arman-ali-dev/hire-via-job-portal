package com.hirevia.controllers.candidate;

import com.hirevia.enums.AppliedStatus;
import com.hirevia.models.Application;
import com.hirevia.models.Job;
import com.hirevia.models.User;
import com.hirevia.requests.ApplyJobRequest;
import com.hirevia.service.ApplicationService;
import com.hirevia.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @Autowired
    private UserService userService;


    @PostMapping("/{jobId}")
    public ResponseEntity<Application> applyForJobHandler(@RequestBody ApplyJobRequest request,
                                                          @PathVariable Long jobId,
                                                          @RequestHeader("Authorization") String jwt) {
        User user = userService.findByJwt(jwt);
        Application application = applicationService.applyForJob(jobId, user, request);
        return new ResponseEntity<>(application, HttpStatus.CREATED);
    }

    @GetMapping("/check/{jobId}")
    public ResponseEntity<Boolean> hasUserAppliedForJobHandler(@PathVariable Long jobId,
                                                               @RequestHeader("Authorization") String jwt) {
        User user = userService.findByJwt(jwt);
        boolean hasApplied = applicationService.hasUserApplied(jobId, user.getId());
        return new ResponseEntity<>(hasApplied, HttpStatus.OK);
    }

    @GetMapping("/job/{jobId}")
    public ResponseEntity<List<Application>> getApplicationsByJobHandler(@PathVariable Long jobId) {
        List<Application> applications = applicationService.getApplicationByJob(jobId);
        return new ResponseEntity<>(applications, HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<List<Application>> getApplicationsByUserHandler(@RequestHeader("Authorization") String jwt) {
        User user = userService.findByJwt(jwt);
        List<Application> applications = applicationService.getApplicationsByUser(user.getId());
        return new ResponseEntity<>(applications, HttpStatus.OK);
    }

    @GetMapping("/{applicationId}")
    public ResponseEntity<Application> getApplicationByIdHandler(@PathVariable Long applicationId) {
        Application application = applicationService.getApplicationById(applicationId);
        return new ResponseEntity<>(application, HttpStatus.OK);
    }

    @DeleteMapping("/{applicationId}")
    public ResponseEntity<String> deleteApplicationHandler(@PathVariable Long applicationId) throws AccessDeniedException {
        applicationService.deleteApplication(applicationId);
        return new ResponseEntity<>("Application deleted successfully!", HttpStatus.NO_CONTENT);
    }
}
