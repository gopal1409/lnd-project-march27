package com.learnsphere.leadservice.web;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.CacheControl;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.nio.file.Path;

@Controller
public class FrontendController {

    private final Resource indexHtml;

    public FrontendController() {
        Path indexPath = FrontendPathResolver.resolveFrontendRoot().resolve("index.html");
        this.indexHtml = new FileSystemResource(indexPath);
    }

    @GetMapping({
            "/",
            "/login",
            "/courses",
            "/blogs",
            "/blog",
            "/course",
            "/learn",
            "/enquiry",
            "/admin/courses"
    })
    public ResponseEntity<Resource> frontendApp() {
        return ResponseEntity.ok()
                .contentType(MediaType.TEXT_HTML)
                .cacheControl(CacheControl.noCache())
                .body(indexHtml);
    }
}
