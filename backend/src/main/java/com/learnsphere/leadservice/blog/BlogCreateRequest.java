package com.learnsphere.leadservice.blog;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record BlogCreateRequest(
        @NotBlank @Size(max = 180) String title,
        @NotBlank @Size(max = 500) String summary,
        @NotBlank @Size(max = 12000) String content,
        @NotBlank @Size(max = 80) String category,
        @NotBlank @Size(max = 120) String authorName,
        @Size(max = 500) String coverImageUrl
) {
}
