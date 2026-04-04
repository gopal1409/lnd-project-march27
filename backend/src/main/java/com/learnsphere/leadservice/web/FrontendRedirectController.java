package com.learnsphere.leadservice.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FrontendRedirectController {

    @GetMapping({
            "/login/",
            "/courses/",
            "/blogs/",
            "/blog/",
            "/course/",
            "/learn/",
            "/enquiry/",
            "/admin/courses/"
    })
    public String redirectTrailingSlash(org.springframework.web.context.request.WebRequest request) {
        String path = request.getDescription(false).replace("uri=", "");
        if (path.endsWith("/") && path.length() > 1) {
            return "redirect:" + path.substring(0, path.length() - 1);
        }
        return "redirect:/";
    }
}
