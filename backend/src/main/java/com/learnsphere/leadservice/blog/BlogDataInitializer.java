package com.learnsphere.leadservice.blog;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class BlogDataInitializer implements ApplicationRunner {

    private final BlogService blogService;

    public BlogDataInitializer(BlogService blogService) {
        this.blogService = blogService;
    }

    @Override
    public void run(ApplicationArguments args) {
        blogService.seedBlogsIfEmpty();
    }
}
