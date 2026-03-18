package com.learnsphere.leadservice.lead;

import com.learnsphere.leadservice.admin.AdminService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.learnsphere.leadservice.common.ApiExceptionHandler;

@WebMvcTest(LeadController.class)
@Import(ApiExceptionHandler.class)
class LeadControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private LeadService leadService;

    @MockBean
    private AdminService adminService;

    @Test
    void createSignupLeadReturnsCreatedResponse() throws Exception {
        Lead savedLead = new Lead();
        ReflectionTestUtils.setField(savedLead, "id", 1L);
        savedLead.setEmail("user@example.com");
        savedLead.setPhoneNumber("+1 5551234567");
        savedLead.setSource("signup-modal");

        when(leadService.createSignupLead(any(SignupLeadRequest.class))).thenReturn(savedLead);

        mockMvc.perform(post("/api/leads/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "email": "user@example.com",
                                  "phoneNumber": "+1 5551234567"
                                }
                                """))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.message").value("Signup lead captured successfully"))
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.email").value("user@example.com"));
    }

    @Test
    void createSignupLeadRejectsInvalidPayload() throws Exception {
        mockMvc.perform(post("/api/leads/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "email": "invalid-email",
                                  "phoneNumber": "12"
                                }
                                """))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Validation failed"))
                .andExpect(jsonPath("$.errors.email").exists())
                .andExpect(jsonPath("$.errors.phoneNumber").value("Phone number must be 7 to 20 characters"));
    }
}
