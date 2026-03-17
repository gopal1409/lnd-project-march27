package com.learnsphere.leadservice.lead;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record SignupLeadRequest(
        @NotBlank @Email @Size(max = 120) String email,
        @NotBlank
        @Pattern(regexp = "^[0-9+()\\-\\s]{7,20}$", message = "Phone number must be 7 to 20 characters")
        String phoneNumber
) {
}
