package com.learnsphere.leadservice.course;

import com.learnsphere.leadservice.admin.AdminService;
import com.learnsphere.leadservice.common.ApiExceptionHandler;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.http.HttpStatus.NOT_FOUND;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(CourseController.class)
@Import(ApiExceptionHandler.class)
class CourseControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CourseService courseService;

    @MockBean
    private AdminService adminService;

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

    @Test
    void createCourseReturnsCreatedCourseForAuthorizedAdmin() throws Exception {
        Course course = new Course("Platform Engineering", "Build internal developer platforms", 0);
        ReflectionTestUtils.setField(course, "id", 8L);
        doNothing().when(adminService).validateBasicAuth(eq("Basic YWRtaW46QWRtaW5AMTIz"));
        when(courseService.createCourse(any(CourseCreateRequest.class))).thenReturn(course);

        mockMvc.perform(post("/api/courses")
                        .header("Authorization", "Basic YWRtaW46QWRtaW5AMTIz")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "title": "Platform Engineering",
                                  "description": "Build internal developer platforms"
                                }
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(8))
                .andExpect(jsonPath("$.title").value("Platform Engineering"))
                .andExpect(jsonPath("$.price").value(0));
    }
}
