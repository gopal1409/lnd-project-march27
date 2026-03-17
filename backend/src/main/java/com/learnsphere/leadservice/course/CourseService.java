package com.learnsphere.leadservice.course;

import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
public class CourseService {

    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Course getCourseById(Long id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Course not found"));
    }

    public void seedCoursesIfEmpty() {
        if (courseRepository.count() > 0) {
            return;
        }

        courseRepository.saveAll(List.of(
                new Course(
                        "DevSecOps and CI/CD Master Program",
                        "Master Jenkins, GitLab CI/CD, GitHub Actions, Azure DevOps, ArgoCD, Spinnaker, Codefresh, Octopus Deploy, and enterprise DevSecOps delivery patterns.",
                        49999
                ),
                new Course(
                        "Docker Kubernetes and OpenShift Bootcamp",
                        "Build real-world containerization and orchestration skills with Docker, Kubernetes, Helm, OpenShift, Rancher, AKS, EKS, GKE, and service mesh with Istio.",
                        45999
                ),
                new Course(
                        "AWS Azure and GCP Cloud Engineering",
                        "Learn multi-cloud architecture across AWS, Microsoft Azure, and Google Cloud Platform with hybrid cloud foundations and production deployment strategies.",
                        52999
                ),
                new Course(
                        "Terraform and Infrastructure as Code",
                        "Design repeatable infrastructure using Terraform, CloudFormation, Ansible, Vault, Consul, Puppet, Chef, and platform automation for modern environments.",
                        44999
                ),
                new Course(
                        "GitOps with ArgoCD and Flux",
                        "Learn GitOps delivery using ArgoCD, Flux, Kubernetes, Helm, declarative deployment workflows, environment promotion, rollback strategies, and production-ready GitOps operations.",
                        43999
                ),
                new Course(
                        "GitOps SRE and Platform Engineering",
                        "Advance your career with GitOps, observability engineering, SRE practices, cloud native architecture, platform engineering, release management, and enterprise DevOps platforms.",
                        47999
                ),
                new Course(
                        "Observability and DevSecOps Toolchain",
                        "Implement Prometheus, Grafana, ELK, Splunk, SonarQube, Trivy, Snyk, Selenium, quality gates, static analysis, and secure software delivery pipelines.",
                        42999
                )
        ));
    }
}
