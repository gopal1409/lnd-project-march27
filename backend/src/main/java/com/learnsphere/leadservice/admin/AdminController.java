package com.learnsphere.leadservice.admin;

import com.learnsphere.leadservice.blog.BlogService;
import com.learnsphere.leadservice.lead.LeadService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AdminController {

    private final LeadService leadService;
    private final BlogService blogService;

    public AdminController(LeadService leadService, BlogService blogService) {
        this.leadService = leadService;
        this.blogService = blogService;
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

    @GetMapping("/admin/blogs")
    public String blogConsole(Model model) {
        model.addAttribute("blogs", blogService.getAllBlogs());
        return "admin-blogs";
    }
}
