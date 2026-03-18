package com.learnsphere.leadservice.lead;

import com.learnsphere.leadservice.course.Course;
import com.learnsphere.leadservice.course.CourseService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeadService {

    private final LeadRepository leadRepository;
    private final CourseEnquiryRepository courseEnquiryRepository;
    private final CourseService courseService;

    public LeadService(
            LeadRepository leadRepository,
            CourseEnquiryRepository courseEnquiryRepository,
            CourseService courseService
    ) {
        this.leadRepository = leadRepository;
        this.courseEnquiryRepository = courseEnquiryRepository;
        this.courseService = courseService;
    }

    public Lead createSignupLead(SignupLeadRequest request) {
        Lead lead = new Lead();
        lead.setEmail(request.email().trim().toLowerCase());
        lead.setPhoneNumber(request.phoneNumber().trim());
        lead.setSource("signup-modal");
        return leadRepository.save(lead);
    }

    public List<Lead> getAllSignupLeads() {
        return leadRepository.findAllByOrderByCreatedAtDesc();
    }

    public List<CourseEnquiry> getAllCourseEnquiries() {
        return courseEnquiryRepository.findAllByOrderByCreatedAtDesc();
    }

    public CourseEnquiry createCourseEnquiry(CourseEnquiryRequest request) {
        Course course = courseService.getCourseById(request.courseId());

        CourseEnquiry enquiry = new CourseEnquiry();
        enquiry.setName(request.name().trim());
        enquiry.setEmail(request.email().trim().toLowerCase());
        enquiry.setPhoneCountryCode(request.phoneCountryCode().trim());
        enquiry.setPhoneNumber(request.phoneNumber().trim());
        enquiry.setCompanyName(request.companyName().trim());
        enquiry.setTeamSize(request.teamSize().trim());
        enquiry.setPreferredTrainingMode(request.preferredTrainingMode().trim());
        enquiry.setCourseId(course.getId());
        enquiry.setCourseTitle(course.getTitle());
        enquiry.setMessage(request.message() == null ? null : request.message().trim());
        return courseEnquiryRepository.save(enquiry);
    }
}
