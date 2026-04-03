package com.learnsphere.leadservice.course;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CourseCreateRequest(
        @NotBlank @Size(max = 150) String title,
        @NotBlank @Size(max = 2000) String description,
        Integer price,
        @NotBlank @Size(max = 5000) String whyLearn,
        @NotBlank @Size(max = 8000) String toolchainOverview,
        @NotBlank @Size(max = 8000) String faqContent
) {
}
