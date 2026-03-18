package com.learnsphere.leadservice.admin;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record AdminAuthRequest(
        @NotBlank @Size(max = 120) String username,
        @NotBlank @Size(max = 120) String password
) {
}
