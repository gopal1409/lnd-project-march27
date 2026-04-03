package com.learnsphere.leadservice.blog;

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

import java.time.LocalDateTime;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.http.HttpStatus.NOT_FOUND;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(BlogController.class)
@Import(ApiExceptionHandler.class)
class BlogControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private BlogService blogService;

    @MockBean
    private AdminService adminService;

    @Test
    void getBlogsReturnsPublishedBlogs() throws Exception {
        Blog blog = new Blog("Wix Style Content", "Summary", "Body", "Editorial", "Team", "");
        ReflectionTestUtils.setField(blog, "createdAt", LocalDateTime.now());
        when(blogService.getAllBlogs()).thenReturn(List.of(blog));

        mockMvc.perform(get("/api/blogs"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("Wix Style Content"))
                .andExpect(jsonPath("$[0].category").value("Editorial"));
    }

    @Test
    void getBlogReturnsNotFoundMessageWhenMissing() throws Exception {
        when(blogService.getBlogById(77L))
                .thenThrow(new ResponseStatusException(NOT_FOUND, "Blog not found"));

        mockMvc.perform(get("/api/blogs/77"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value("Blog not found"));
    }

    @Test
    void createBlogReturnsCreatedBlogForAuthorizedAdmin() throws Exception {
        Blog blog = new Blog("Designing Better Blog Pages", "Short summary", "Long content", "Design", "LearnSphere Editorial", "");
        ReflectionTestUtils.setField(blog, "id", 3L);
        ReflectionTestUtils.setField(blog, "createdAt", LocalDateTime.now());
        doNothing().when(adminService).validateBasicAuth(eq("Basic YWRtaW46QWRtaW5AMTIz"));
        when(blogService.createBlog(any(BlogCreateRequest.class))).thenReturn(blog);

        mockMvc.perform(post("/api/blogs")
                        .header("Authorization", "Basic YWRtaW46QWRtaW5AMTIz")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "title": "Designing Better Blog Pages",
                                  "summary": "Short summary",
                                  "content": "Long content",
                                  "category": "Design",
                                  "authorName": "LearnSphere Editorial",
                                  "coverImageUrl": ""
                                }
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(3))
                .andExpect(jsonPath("$.title").value("Designing Better Blog Pages"))
                .andExpect(jsonPath("$.authorName").value("LearnSphere Editorial"));
    }

    @Test
    void updateBlogReturnsUpdatedBlogForAuthorizedAdmin() throws Exception {
        Blog blog = new Blog("Updated Blog", "Updated summary", "Updated content", "DevOps", "Editor", "");
        ReflectionTestUtils.setField(blog, "id", 4L);
        ReflectionTestUtils.setField(blog, "createdAt", LocalDateTime.now());
        doNothing().when(adminService).validateBasicAuth(eq("Basic YWRtaW46QWRtaW5AMTIz"));
        when(blogService.updateBlog(eq(4L), any(BlogCreateRequest.class))).thenReturn(blog);

        mockMvc.perform(put("/api/blogs/4")
                        .header("Authorization", "Basic YWRtaW46QWRtaW5AMTIz")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "title": "Updated Blog",
                                  "summary": "Updated summary",
                                  "content": "Updated content",
                                  "category": "DevOps",
                                  "authorName": "Editor",
                                  "coverImageUrl": ""
                                }
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(4))
                .andExpect(jsonPath("$.title").value("Updated Blog"));
    }

    @Test
    void deleteBlogReturnsOkForAuthorizedAdmin() throws Exception {
        doNothing().when(adminService).validateBasicAuth(eq("Basic YWRtaW46QWRtaW5AMTIz"));

        mockMvc.perform(delete("/api/blogs/4")
                        .header("Authorization", "Basic YWRtaW46QWRtaW5AMTIz"))
                .andExpect(status().isOk());
    }
}
