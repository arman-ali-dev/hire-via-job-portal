package com.hirevia.controllers.employer;

import com.hirevia.enums.AppliedStatus;
import com.hirevia.models.Application;
import com.hirevia.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.util.List;

@RestController
@RequestMapping("/api/employer/applications")
public class ApplicationManagementController {


    @Autowired
    private ApplicationService applicationService;

    @PutMapping("/{applicationId}/status")
    public ResponseEntity<Application> updateApplicationStatusHandler(
            @PathVariable Long applicationId, @RequestParam AppliedStatus status) throws AccessDeniedException {
        Application updatedApplication = applicationService.updateApplicationStatus(applicationId, status);
        return new ResponseEntity<>(updatedApplication, HttpStatus.OK);
    }

    @GetMapping("/{employerId}")
    public ResponseEntity<List<Application>> getApplicationsHandler(@PathVariable Long employerId) {
        List<Application> applications = applicationService.getApplicationsByEmployer(employerId);
        return new ResponseEntity<>(applications, HttpStatus.OK);
    }

    @GetMapping("/{employerId}/search")
    public ResponseEntity<List<Application>> searchApplicationsHandler(
            @RequestParam(required = false) String keyword,
            @PathVariable Long employerId
    ) {

        List<Application> applications = applicationService.searchApplications(employerId, keyword);
        return new ResponseEntity<>(applications, HttpStatus.OK);
    }


}
