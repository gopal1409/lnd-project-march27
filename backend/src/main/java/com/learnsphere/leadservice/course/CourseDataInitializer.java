package com.learnsphere.leadservice.course;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class CourseDataInitializer implements ApplicationRunner {

    private final CourseService courseService;

    public CourseDataInitializer(CourseService courseService) {
        this.courseService = courseService;
    }

    @Override
    public void run(ApplicationArguments args) {
        courseService.seedCoursesIfEmpty();
    }
}
