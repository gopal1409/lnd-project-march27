package com.learnsphere.leadservice.lead;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record CourseEnquiryRequest(
        @NotBlank @Size(max = 120) String name,
        @NotBlank @Email @Size(max = 120) String email,
        @NotBlank
        @Pattern(regexp = "^\\+[0-9]{1,4}$", message = "Country code must start with + followed by 1 to 4 digits")
        String phoneCountryCode,
        @NotBlank
        @Pattern(regexp = "^[0-9()\\-\\s]{6,20}$", message = "Phone number must be 6 to 20 characters")
        String phoneNumber,
        @NotBlank @Size(max = 160) String companyName,
        @NotBlank @Size(max = 40) String teamSize,
        @NotBlank @Size(max = 40) String preferredTrainingMode,
        @NotNull Long courseId,
        @Size(max = 2000) String message
) {
}
