package com.hirevia.service.Impl;

import com.hirevia.config.JwtProvider;
import com.hirevia.enums.UserRole;
import com.hirevia.exceptions.AlreadyExistsException;
import com.hirevia.exceptions.InvalidDataException;
import com.hirevia.exceptions.NotFoundException;
import com.hirevia.models.Company;
import com.hirevia.models.Employer;
import com.hirevia.models.User;
import com.hirevia.repositories.CompanyRepository;
import com.hirevia.repositories.EmployerRepository;
import com.hirevia.repositories.UserRepository;
import com.hirevia.requests.LoginUserRequest;
import com.hirevia.requests.RegistrationUserRequest;
import com.hirevia.responses.AuthResponse;
import com.hirevia.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmployerRepository employerRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Override
    public AuthResponse registerUser(RegistrationUserRequest request) {
        User isExists = userRepository.findByEmail(request.getEmail());

        if (isExists != null) {
            throw new AlreadyExistsException("User Already Registered!");
        }

        User user = new User();

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setResume(request.getResume());
        user.setPhoneNumber(request.getPhoneNumber());

        UserRole role = request.getRole() != null ? request.getRole() : UserRole.CANDIDATE;

        user.setRole(role);

        userRepository.save(user);

        if (role == UserRole.EMPLOYER) {
            Employer employer = new Employer();
            employer.setUser(user);

            String companyName = request.getCompany().getName();

            Optional<Company> existingCompany = companyRepository.findByName(companyName);
            Company company;

            company = existingCompany.orElseGet(() -> companyRepository.save(request.getCompany()));

            employer.setCompany(company);
            employerRepository.save(employer);
        }


        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + user.getRole()));

        Authentication authentication = new UsernamePasswordAuthenticationToken(request.getEmail(), null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtProvider.generateToken(authentication);

        return new AuthResponse(jwt, user.getRole(), "User Registered Successfully!");
    }

    @Override
    public AuthResponse loginUser(LoginUserRequest request) {
        User user = userRepository.findByEmail(request.getEmail());

        if (user == null) {
            throw new NotFoundException("User Not Found!");
        }

        // Check password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new InvalidDataException("Invalid email or password!");
        }

        // Build authorities list
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()));

        // Create Authentication object
        Authentication authentication =
                new UsernamePasswordAuthenticationToken(user.getEmail(), null, authorities);

        // Set authentication context
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Generate JWT
        String jwt = jwtProvider.generateToken(authentication);

        // Return response
        return new AuthResponse(jwt, user.getRole(), "Login Successful!");
    }

}
