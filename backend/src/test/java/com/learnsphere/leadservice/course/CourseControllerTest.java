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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
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
        Course course = new Course("DevSecOps", "Security-first delivery", 49999, "Why it matters", "About the toolchain", "What is it?\nIt is practical.", "Full trainer content");
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
        Course course = new Course("Platform Engineering", "Build internal developer platforms", 35000, "Why learn", "Toolchain details", "Question?\nAnswer.", "Full trainer content");
        ReflectionTestUtils.setField(course, "id", 8L);
        doNothing().when(adminService).validateBasicAuth(eq("Basic YWRtaW46QWRtaW5AMTIz"));
        when(courseService.createCourse(any(CourseCreateRequest.class))).thenReturn(course);

        mockMvc.perform(post("/api/courses")
                        .header("Authorization", "Basic YWRtaW46QWRtaW5AMTIz")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "title": "Platform Engineering",
                                  "description": "Build internal developer platforms",
                                  "price": 35000,
                                  "whyLearn": "Why learn",
                                  "toolchainOverview": "Toolchain details",
                                  "faqContent": "Question?\\nAnswer.",
                                  "readmeContent": "Full trainer content"
                                }
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(8))
                .andExpect(jsonPath("$.title").value("Platform Engineering"))
                .andExpect(jsonPath("$.price").value(35000));
    }

    @Test
    void updateCourseReturnsUpdatedCourseForAuthorizedAdmin() throws Exception {
        Course course = new Course("Azure DevOps", "Updated content", 36000, "Updated why", "Updated toolchain", "Who is this for?\nTeams.", "Updated trainer content");
        ReflectionTestUtils.setField(course, "id", 5L);
        doNothing().when(adminService).validateBasicAuth(eq("Basic YWRtaW46QWRtaW5AMTIz"));
        when(courseService.updateCourse(eq(5L), any(CourseCreateRequest.class))).thenReturn(course);

        mockMvc.perform(put("/api/courses/5")
                        .header("Authorization", "Basic YWRtaW46QWRtaW5AMTIz")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "title": "Azure DevOps",
                                  "description": "Updated content",
                                  "price": 36000,
                                  "whyLearn": "Updated why",
                                  "toolchainOverview": "Updated toolchain",
                                  "faqContent": "Who is this for?\\nTeams.",
                                  "readmeContent": "Updated trainer content"
                                }
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(5))
                .andExpect(jsonPath("$.title").value("Azure DevOps"))
                .andExpect(jsonPath("$.whyLearn").value("Updated why"));
    }

    @Test
    void deleteCourseReturnsOkForAuthorizedAdmin() throws Exception {
        doNothing().when(adminService).validateBasicAuth(eq("Basic YWRtaW46QWRtaW5AMTIz"));

        mockMvc.perform(delete("/api/courses/4")
                        .header("Authorization", "Basic YWRtaW46QWRtaW5AMTIz"))
                .andExpect(status().isOk());
    }
}
