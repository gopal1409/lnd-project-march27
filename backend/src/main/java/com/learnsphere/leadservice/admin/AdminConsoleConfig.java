package com.learnsphere.leadservice.admin;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class AdminConsoleConfig implements WebMvcConfigurer {

    private final AdminConsoleInterceptor adminConsoleInterceptor;

    public AdminConsoleConfig(AdminConsoleInterceptor adminConsoleInterceptor) {
        this.adminConsoleInterceptor = adminConsoleInterceptor;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(adminConsoleInterceptor)
                .addPathPatterns("/admin/**");
    }
}
