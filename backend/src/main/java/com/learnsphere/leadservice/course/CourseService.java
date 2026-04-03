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

    public Course createCourse(CourseCreateRequest request) {
        Course course = new Course(
                request.title().trim(),
                request.description().trim(),
                request.price() == null ? 0 : request.price(),
                request.whyLearn().trim(),
                request.toolchainOverview().trim(),
                request.faqContent().trim()
        );
        return courseRepository.save(course);
    }

    public Course updateCourse(Long id, CourseCreateRequest request) {
        Course course = getCourseById(id);
        course.setTitle(request.title().trim());
        course.setDescription(request.description().trim());
        course.setPrice(request.price() == null ? 0 : request.price());
        course.setWhyLearn(request.whyLearn().trim());
        course.setToolchainOverview(request.toolchainOverview().trim());
        course.setFaqContent(request.faqContent().trim());
        return courseRepository.save(course);
    }

    public void seedCoursesIfEmpty() {
        if (courseRepository.count() > 0) {
            return;
        }

        courseRepository.saveAll(List.of(
                new Course(
                        "DevSecOps and CI/CD Master Program",
                        "Master Jenkins, GitLab CI/CD, GitHub Actions, Azure DevOps, ArgoCD, Spinnaker, Codefresh, Octopus Deploy, and enterprise DevSecOps delivery patterns.",
                        49999,
                        "Learn how secure delivery pipelines reduce release risk, improve quality gates, and help teams move quickly without skipping governance.",
                        "This program covers the end-to-end CI/CD toolchain including source control workflows, pipeline automation, artifact handling, release strategies, and embedded security checks.",
                        "What will I learn?\nYou will learn practical DevSecOps delivery workflows across modern CI/CD platforms.\n\nWho is this for?\nIt is designed for engineers, release teams, cloud practitioners, and learners moving into platform roles.\n\nDo I need prior experience?\nBasic software delivery familiarity helps, but the path starts from the fundamentals and builds upward."
                ),
                new Course(
                        "Docker Kubernetes and OpenShift Bootcamp",
                        "Build real-world containerization and orchestration skills with Docker, Kubernetes, Helm, OpenShift, Rancher, AKS, EKS, GKE, and service mesh with Istio.",
                        45999,
                        "Container and orchestration skills are now a core requirement for modern application delivery, scaling, and platform operations.",
                        "The toolchain focus includes container packaging, cluster orchestration, deployment workflows, Helm, managed Kubernetes services, and platform operations patterns.",
                        "Why learn Kubernetes?\nIt is widely used for running production workloads at scale.\n\nWill this include hands-on labs?\nYes, the program is structured around guided practical exercises.\n\nIs OpenShift covered too?\nYes, the learning path includes both upstream Kubernetes and enterprise platform variants."
                ),
                new Course(
                        "AWS Azure and GCP Cloud Engineering",
                        "Learn multi-cloud architecture across AWS, Microsoft Azure, and Google Cloud Platform with hybrid cloud foundations and production deployment strategies.",
                        52999,
                        "Multi-cloud knowledge helps engineers compare services, design resilient solutions, and work effectively across enterprise cloud estates.",
                        "This course explains cloud foundations, platform services, deployment models, networking, security, and operational design across the leading cloud providers.",
                        "Do I need experience in all three clouds?\nNo, the course is designed to build comparative understanding across AWS, Azure, and GCP.\n\nWhat is the benefit of multi-cloud learning?\nIt improves architectural judgment and helps you work across varied enterprise environments.\n\nIs architecture included?\nYes, the course connects cloud services to practical design decisions."
                ),
                new Course(
                        "Terraform and Infrastructure as Code",
                        "Design repeatable infrastructure using Terraform, CloudFormation, Ansible, Vault, Consul, Puppet, Chef, and platform automation for modern environments.",
                        44999,
                        "Infrastructure as Code improves consistency, reviewability, and deployment safety for modern infrastructure teams.",
                        "The program focuses on Terraform-first infrastructure workflows while also explaining adjacent automation tools, state strategy, reusable modules, and safe environment promotion.",
                        "Why does IaC matter?\nIt reduces drift and makes infrastructure changes repeatable.\n\nWill I learn only Terraform?\nTerraform is central, but the course also explains adjacent IaC and automation tools.\n\nDoes this include real workflow design?\nYes, the content connects code structure to practical team delivery patterns."
                ),
                new Course(
                        "GitOps with ArgoCD and Flux",
                        "Learn GitOps delivery using ArgoCD, Flux, Kubernetes, Helm, declarative deployment workflows, environment promotion, rollback strategies, and production-ready GitOps operations.",
                        43999,
                        "GitOps gives teams safer change control, clearer audit trails, and more repeatable deployment workflows.",
                        "The content covers Git-based deployment models, reconciliation, cluster delivery workflows, rollout controls, and production-ready GitOps operating practices.",
                        "What tools are covered?\nThe focus is on ArgoCD, Flux, Kubernetes, Helm, and related GitOps workflows.\n\nIs this only for advanced users?\nNo, the material starts with the core GitOps model and builds into advanced operations.\n\nWill I understand production use cases?\nYes, the course connects concepts to realistic deployment scenarios."
                ),
                new Course(
                        "GitOps SRE and Platform Engineering",
                        "Advance your career with GitOps, observability engineering, SRE practices, cloud native architecture, platform engineering, release management, and enterprise DevOps platforms.",
                        47999,
                        "This path is valuable for engineers who want to connect reliability, platform thinking, and delivery operations into one role-ready skill set.",
                        "The toolchain spans GitOps workflows, reliability practices, observability, internal platforms, and operational standards used by modern engineering organizations.",
                        "Who should take this course?\nIt is ideal for engineers moving toward SRE, platform engineering, or senior delivery roles.\n\nIs observability included?\nYes, observability and operational visibility are part of the curriculum.\n\nDoes it cover platform thinking?\nYes, the program explains how internal platforms improve developer experience and consistency."
                ),
                new Course(
                        "Observability and DevSecOps Toolchain",
                        "Implement Prometheus, Grafana, ELK, Splunk, SonarQube, Trivy, Snyk, Selenium, quality gates, static analysis, and secure software delivery pipelines.",
                        42999,
                        "Observability and security tooling help teams detect issues earlier, improve confidence, and operate software delivery with much better visibility.",
                        "This course connects monitoring, logging, alerting, code quality, scanning, and secure pipeline implementation into one practical engineering toolchain.",
                        "Which tools are covered?\nThe course includes observability, scanning, and code-quality tooling used in modern delivery teams.\n\nIs this focused on implementation or concepts?\nIt covers both foundational understanding and practical workflow usage.\n\nWhy pair observability with DevSecOps?\nBecause delivery quality depends on both visibility and secure engineering controls."
                )
        ));
    }
}
