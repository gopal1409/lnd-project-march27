package com.learnsphere.leadservice.web;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;

@Configuration
public class FrontendResourceConfig implements WebMvcConfigurer {

    private final String frontendRoot;

    public FrontendResourceConfig() {
        Path root = FrontendPathResolver.resolveFrontendRoot();
        this.frontendRoot = root.toUri().toString();
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/assets/**")
                .addResourceLocations(frontendRoot + "assets/");
        registry.addResourceHandler("/components/**")
                .addResourceLocations(frontendRoot + "components/");
        registry.addResourceHandler("/pages/**")
                .addResourceLocations(frontendRoot + "pages/");
    }
}
