package com.learnsphere.leadservice.lead;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseEnquiryRepository extends JpaRepository<CourseEnquiry, Long> {
    java.util.List<CourseEnquiry> findAllByOrderByCreatedAtDesc();
}
