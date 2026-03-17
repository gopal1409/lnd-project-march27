package com.learnsphere.leadservice.course;

import com.learnsphere.leadservice.common.ApiExceptionHandler;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.http.HttpStatus.NOT_FOUND;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(CourseController.class)
@Import(ApiExceptionHandler.class)
class CourseControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CourseService courseService;

    @Test
    void getCoursesReturnsAvailableCourses() throws Exception {
        Course course = new Course("DevSecOps", "Security-first delivery", 49999);
        when(courseService.getAllCourses()).thenReturn(List.of(course));

        mockMvc.perform(get("/api/courses"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("DevSecOps"))
                .andExpect(jsonPath("$[0].price").value(49999));
    }

    @Test
    void getCourseByIdReturnsNotFoundMessageWhenMissing() throws Exception {
        when(courseService.getCourseById(999L))
                .thenThrow(new ResponseStatusException(NOT_FOUND, "Course not found"));

        mockMvc.perform(get("/api/courses/999"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value("Course not found"));
    }
}
