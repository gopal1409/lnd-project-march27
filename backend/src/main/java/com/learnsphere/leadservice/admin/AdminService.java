package com.learnsphere.leadservice.admin;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

import static org.springframework.http.HttpStatus.UNAUTHORIZED;

@Service
public class AdminService {

    private final String consoleUsername;
    private final String consolePassword;

    public AdminService(
            @Value("${admin.console.username}") String consoleUsername,
            @Value("${admin.console.password}") String consolePassword
    ) {
        this.consoleUsername = consoleUsername;
        this.consolePassword = consolePassword;
    }

    public String login(AdminAuthRequest request) {
        String normalizedUsername = request.username().trim();
        String password = request.password().trim();
        if (!consoleUsername.equals(normalizedUsername) || !consolePassword.equals(password)) {
            throw new ResponseStatusException(UNAUTHORIZED, "Invalid admin credentials");
        }
        return Base64.getEncoder().encodeToString((consoleUsername + ":" + consolePassword).getBytes(StandardCharsets.UTF_8));
    }

    public void validateBasicAuth(String authorizationHeader) {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Basic ")) {
            throw new ResponseStatusException(UNAUTHORIZED, "Admin login required");
        }
        try {
            String encodedCredentials = authorizationHeader.substring(6).trim();
            String decodedCredentials = new String(Base64.getDecoder().decode(encodedCredentials), StandardCharsets.UTF_8);
            String expectedCredentials = consoleUsername + ":" + consolePassword;
            if (!expectedCredentials.equals(decodedCredentials)) {
                throw new ResponseStatusException(UNAUTHORIZED, "Invalid admin session");
            }
        } catch (IllegalArgumentException ex) {
            throw new ResponseStatusException(UNAUTHORIZED, "Invalid admin session");
        }
    }
}
