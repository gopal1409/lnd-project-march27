package com.learnsphere.leadservice.lead;

import com.learnsphere.leadservice.course.Course;
import com.learnsphere.leadservice.course.CourseService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class LeadServiceTest {

    @Mock
    private LeadRepository leadRepository;

    @Mock
    private CourseEnquiryRepository courseEnquiryRepository;

    @Mock
    private CourseService courseService;

    @InjectMocks
    private LeadService leadService;

    @Test
    void createSignupLeadNormalizesAndPersistsFields() {
        SignupLeadRequest request = new SignupLeadRequest("  USER@Example.COM ", " +91 9876543210 ");
        Lead savedLead = new Lead();
        savedLead.setEmail("user@example.com");
        savedLead.setPhoneNumber("+91 9876543210");
        savedLead.setSource("signup-modal");

        when(leadRepository.save(org.mockito.ArgumentMatchers.any(Lead.class))).thenReturn(savedLead);

        Lead result = leadService.createSignupLead(request);

        ArgumentCaptor<Lead> captor = ArgumentCaptor.forClass(Lead.class);
        verify(leadRepository).save(captor.capture());
        Lead persistedLead = captor.getValue();

        assertThat(persistedLead.getEmail()).isEqualTo("user@example.com");
        assertThat(persistedLead.getPhoneNumber()).isEqualTo("+91 9876543210");
        assertThat(persistedLead.getSource()).isEqualTo("signup-modal");
        assertThat(result.getEmail()).isEqualTo("user@example.com");
    }

    @Test
    void getAllSignupLeadsReturnsRepositoryResultsInDescendingOrder() {
        Lead latest = new Lead();
        latest.setEmail("latest@example.com");
        Lead oldest = new Lead();
        oldest.setEmail("oldest@example.com");

        when(leadRepository.findAllByOrderByCreatedAtDesc()).thenReturn(List.of(latest, oldest));

        List<Lead> result = leadService.getAllSignupLeads();

        assertThat(result).containsExactly(latest, oldest);
    }

    @Test
    void createCourseEnquiryPersistsSelectedCourseAndPhoneParts() {
        Course course = new Course("DevSecOps", "Security-first delivery", 49999, "Why it matters", "Toolchain overview", "What is it?\nIt is practical.");
        org.springframework.test.util.ReflectionTestUtils.setField(course, "id", 3L);
        CourseEnquiry saved = new CourseEnquiry();
        saved.setName("Alex");
        saved.setEmail("alex@example.com");
        saved.setPhoneCountryCode("+91");
        saved.setPhoneNumber("9876543210");
        saved.setCompanyName("Acme Corp");
        saved.setTeamSize("26-50");
        saved.setPreferredTrainingMode("Hybrid");
        saved.setCourseId(3L);
        saved.setCourseTitle("DevSecOps");

        when(courseService.getCourseById(3L)).thenReturn(course);
        when(courseEnquiryRepository.save(org.mockito.ArgumentMatchers.any(CourseEnquiry.class))).thenReturn(saved);

        CourseEnquiry result = leadService.createCourseEnquiry(new CourseEnquiryRequest(
                " Alex ",
                " ALEX@example.com ",
                "+91",
                " 9876543210 ",
                " Acme Corp ",
                "26-50",
                "Hybrid",
                3L,
                " Need weekday batch "
        ));

        ArgumentCaptor<CourseEnquiry> captor = ArgumentCaptor.forClass(CourseEnquiry.class);
        verify(courseEnquiryRepository).save(captor.capture());
        CourseEnquiry persisted = captor.getValue();

        assertThat(persisted.getName()).isEqualTo("Alex");
        assertThat(persisted.getEmail()).isEqualTo("alex@example.com");
        assertThat(persisted.getPhoneCountryCode()).isEqualTo("+91");
        assertThat(persisted.getPhoneNumber()).isEqualTo("9876543210");
        assertThat(persisted.getCompanyName()).isEqualTo("Acme Corp");
        assertThat(persisted.getTeamSize()).isEqualTo("26-50");
        assertThat(persisted.getPreferredTrainingMode()).isEqualTo("Hybrid");
        assertThat(persisted.getCourseId()).isEqualTo(3L);
        assertThat(persisted.getCourseTitle()).isEqualTo("DevSecOps");
        assertThat(persisted.getMessage()).isEqualTo("Need weekday batch");
        assertThat(result.getCourseTitle()).isEqualTo("DevSecOps");
    }
}
