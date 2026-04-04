package com.learnsphere.leadservice.web;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

final class FrontendPathResolver {

    private FrontendPathResolver() {
    }

    static Path resolveFrontendRoot() {
        Path workingDir = Paths.get("").toAbsolutePath().normalize();
        List<Path> candidates = List.of(
                Paths.get("/app/frontend"),
                workingDir,
                workingDir.resolve("backend").normalize(),
                workingDir.resolve("..").normalize()
        );

        for (Path candidate : candidates) {
            Path repoRoot = looksLikeRepoRoot(candidate) ? candidate : candidate.resolve("..").normalize();
            if (looksLikeRepoRoot(repoRoot)) {
                return repoRoot;
            }
        }

        return workingDir;
    }

    private static boolean looksLikeRepoRoot(Path path) {
        return Files.exists(path.resolve("index.html"))
                && Files.isDirectory(path.resolve("assets"))
                && Files.isDirectory(path.resolve("pages"))
                && Files.isDirectory(path.resolve("components"));
    }
}
