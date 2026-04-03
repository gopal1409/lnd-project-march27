package com.learnsphere.leadservice.blog;

import com.learnsphere.leadservice.admin.AdminService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/blogs")
@CrossOrigin(origins = "*")
public class BlogController {

    private final BlogService blogService;
    private final AdminService adminService;

    public BlogController(BlogService blogService, AdminService adminService) {
        this.blogService = blogService;
        this.adminService = adminService;
    }

    @GetMapping
    public List<Blog> getBlogs() {
        return blogService.getAllBlogs();
    }

    @GetMapping("/{id}")
    public Blog getBlog(@PathVariable Long id) {
        return blogService.getBlogById(id);
    }

    @PostMapping
    public Blog createBlog(
            @RequestHeader(value = "Authorization", required = false) String authorizationHeader,
            @Valid @RequestBody BlogCreateRequest request
    ) {
        adminService.validateBasicAuth(authorizationHeader);
        return blogService.createBlog(request);
    }

    @PutMapping("/{id}")
    public Blog updateBlog(
            @PathVariable Long id,
            @RequestHeader(value = "Authorization", required = false) String authorizationHeader,
            @Valid @RequestBody BlogCreateRequest request
    ) {
        adminService.validateBasicAuth(authorizationHeader);
        return blogService.updateBlog(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteBlog(
            @PathVariable Long id,
            @RequestHeader(value = "Authorization", required = false) String authorizationHeader
    ) {
        adminService.validateBasicAuth(authorizationHeader);
        blogService.deleteBlog(id);
    }
}
