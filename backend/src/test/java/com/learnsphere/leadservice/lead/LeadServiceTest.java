package com.learnsphere.leadservice.lead;

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
}
