package com.hirevia.service.Impl;

import com.hirevia.config.JwtProvider;
import com.hirevia.exceptions.NotFoundException;
import com.hirevia.models.User;
import com.hirevia.repositories.UserRepository;
import com.hirevia.requests.UserEditProfileRequest;
import com.hirevia.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtProvider jwtProvider;

    @Override
    public User findByJwt(String jwt) {
        String email = jwtProvider.getEmailFromJwtToken(jwt);

        User user = userRepository.findByEmail(email);

        if (user == null) {
            throw new NotFoundException("User Not Found!");
        }

        return user;
    }

    @Override
    public User findById(Long userId) {
        userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User Not Found!"));
        return null;
    }

    @Override
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public void deleteUser(Long userId) {
        User user = this.findById(userId);
        userRepository.delete(user);
    }


    @Override
    public User getLoggedInUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();


        if (authentication == null || !authentication.isAuthenticated()) {
            throw new NotFoundException("No authenticated user found");
        }

        String username = authentication.getName();
        User user = userRepository.findByEmail(username);

        if (user == null) {
            throw new NotFoundException("User not found with email: " + username);
        }

        return user;
    }

    @Override
    public User editProfile(User user, UserEditProfileRequest request) {
        // update fields
        if (request.getFullName() != null)
            user.setFullName(request.getFullName());

        if (request.getPhoneNumber() != null)
            user.setPhoneNumber(request.getPhoneNumber());

        if (request.getLocation() != null)
            user.setLocation(request.getLocation());

        if (request.getExperience() != null)
            user.setExperience(request.getExperience());

        if (request.getSkills() != null)
            user.setSkills(request.getSkills());

        if (request.getResume() != null)
            user.setResume(request.getResume());

        if (request.getProfilePicture() != null)
            user.setProfilePicture(request.getProfilePicture());

        if (request.getBio() != null)
            user.setBio(request.getBio());

        return userRepository.save(user);
    }


}
