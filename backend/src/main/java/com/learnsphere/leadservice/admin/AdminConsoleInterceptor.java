package com.learnsphere.leadservice.admin;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class AdminConsoleInterceptor implements HandlerInterceptor {

    private final AdminService adminService;

    public AdminConsoleInterceptor(AdminService adminService) {
        this.adminService = adminService;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String authorization = request.getHeader("Authorization");
        try {
            adminService.validateBasicAuth(authorization);
            return true;
        } catch (org.springframework.web.server.ResponseStatusException ex) {
            response.setHeader("WWW-Authenticate", "Basic realm=\"LearnSphere Admin\"");
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Authentication required");
            return false;
        }
    }
}
