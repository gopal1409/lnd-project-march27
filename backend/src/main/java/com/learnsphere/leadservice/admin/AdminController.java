package com.learnsphere.leadservice.admin;

import com.learnsphere.leadservice.lead.LeadService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AdminController {

    private final LeadService leadService;

    public AdminController(LeadService leadService) {
        this.leadService = leadService;
    }

    @GetMapping("/admin/signups")
    public String signupConsole(Model model) {
        model.addAttribute("leads", leadService.getAllSignupLeads());
        return "admin-signups";
    }

    @GetMapping("/admin/course-enquiries")
    public String courseEnquiryConsole(Model model) {
        model.addAttribute("enquiries", leadService.getAllCourseEnquiries());
        return "admin-course-enquiries";
    }
}
