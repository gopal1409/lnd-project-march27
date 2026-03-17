package com.learnsphere.leadservice.lead;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeadService {

    private final LeadRepository leadRepository;

    public LeadService(LeadRepository leadRepository) {
        this.leadRepository = leadRepository;
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
}
