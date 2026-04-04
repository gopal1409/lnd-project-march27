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
                request.faqContent().trim(),
                request.readmeContent().trim()
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
        course.setReadmeContent(request.readmeContent().trim());
        return courseRepository.save(course);
    }

    public void deleteCourse(Long id) {
        Course course = getCourseById(id);
        courseRepository.delete(course);
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
                        "What will I learn?\nYou will learn practical DevSecOps delivery workflows across modern CI/CD platforms.\n\nWho is this for?\nIt is designed for engineers, release teams, cloud practitioners, and learners moving into platform roles.\n\nDo I need prior experience?\nBasic software delivery familiarity helps, but the path starts from the fundamentals and builds upward.",
                        "Enterprise DevSecOps curriculum with CI/CD pipeline design, automation patterns, labs, governance checkpoints, and production-oriented delivery workflows."
                ),
                new Course(
                        "Docker Kubernetes and OpenShift Bootcamp",
                        "Build real-world containerization and orchestration skills with Docker, Kubernetes, Helm, OpenShift, Rancher, AKS, EKS, GKE, and service mesh with Istio.",
                        45999,
                        "Container and orchestration skills are now a core requirement for modern application delivery, scaling, and platform operations.",
                        "The toolchain focus includes container packaging, cluster orchestration, deployment workflows, Helm, managed Kubernetes services, and platform operations patterns.",
                        "Why learn Kubernetes?\nIt is widely used for running production workloads at scale.\n\nWill this include hands-on labs?\nYes, the program is structured around guided practical exercises.\n\nIs OpenShift covered too?\nYes, the learning path includes both upstream Kubernetes and enterprise platform variants.",
                        "Corporate bootcamp covering container packaging, orchestration, platform operations, practical labs, and enterprise deployment patterns."
                ),
                new Course(
                        "AWS Azure and GCP Cloud Engineering",
                        "Learn multi-cloud architecture across AWS, Microsoft Azure, and Google Cloud Platform with hybrid cloud foundations and production deployment strategies.",
                        52999,
                        "Multi-cloud knowledge helps engineers compare services, design resilient solutions, and work effectively across enterprise cloud estates.",
                        "This course explains cloud foundations, platform services, deployment models, networking, security, and operational design across the leading cloud providers.",
                        "Do I need experience in all three clouds?\nNo, the course is designed to build comparative understanding across AWS, Azure, and GCP.\n\nWhat is the benefit of multi-cloud learning?\nIt improves architectural judgment and helps you work across varied enterprise environments.\n\nIs architecture included?\nYes, the course connects cloud services to practical design decisions.",
                        "Cross-cloud engineering curriculum with architecture comparison, deployment labs, networking and security coverage, and enterprise design guidance."
                ),
                new Course(
                        "Terraform and Infrastructure as Code",
                        "Corporate trainer version for working professionals: a 5-day Terraform with Azure curriculum covering foundations, Azure integration, enterprise module design, remote backend, policy enforcement, Azure DevOps pipeline flow, and a production-style capstone.",
                        44999,
                        "Infrastructure as Code improves consistency, reviewability, and deployment safety for modern infrastructure teams, and this trainer-led version is designed for corporate batches, DevOps engineers, and enterprise delivery teams.",
                        "The program focuses on Terraform-first Azure infrastructure workflows with trainer talking points, architecture flow, labs, exercises, remote state strategy, reusable modules, CI/CD integration, policy enforcement, and enterprise operating practices.",
                        "What will participants build?\nThey will provision Azure resource groups, networks, virtual machines, storage, Key Vault integrations, reusable modules, and Azure DevOps pipeline flows.\n\nWho is this course for?\nIt is designed for DevOps engineers, cloud engineers, system administrators, automation engineers, SRE engineers, and solution architects.\n\nDoes it include enterprise practices?\nYes, the curriculum covers remote backends, RBAC, secure secrets handling, policy enforcement, naming standards, tagging, troubleshooting, and capstone architecture.",
                        """
Terraform with Azure - Corporate Trainer Curriculum (5 Days)

Training Duration

- Duration: 5 Days
- Daily Time: 4-5 Hours
- Mode: Theory (40%) + Hands-on (60%)
- Level: Beginner to Advanced

Target Audience

- DevOps Engineers
- Cloud Engineers
- System Administrators
- Automation Engineers
- SRE Engineers
- Solution Architects

Prerequisites

Required knowledge:

- Basic Cloud concepts
- Basic Linux commands
- Networking basics
- Azure fundamentals (optional)

Nice to have:

- Git knowledge
- YAML understanding
- CI/CD basics

Learning Outcome (Corporate Skills)

- Build Azure infrastructure using Terraform
- Design reusable Terraform modules
- Implement remote backend securely
- Integrate Terraform with Azure DevOps
- Apply policy enforcement
- Follow enterprise standards
- Troubleshoot Terraform issues

DAY 1 - Terraform Foundations + Azure Integration

Module 1 - Enterprise IaC Concepts

Trainer Talking Points

Explain real problems:

Traditional approach:

- Developer raises ticket
- Infra team creates VM
- Network team configures firewall
- Security team approves

Time taken:

- 3 days to 3 weeks

IaC approach:

- Code to Pipeline to Infrastructure

Time:

- 20 minutes

Concepts to Explain

- Infrastructure as Code principles
- Idempotency
- Declarative model
- Version controlled infra
- Automation first mindset

Compare tools:

- Terraform vs ARM vs Bicep vs Pulumi

Why companies prefer Terraform:

- Multi-cloud
- Reusable modules
- Vendor neutral

Module 2 - Terraform Architecture Deep Dive

Explain internally:

- Terraform Core
- Providers
- State
- Plugins

Execution flow:

- Code to Plan to Graph to Apply

Explain dependency graph.

Lab 1 - Setup Environment

Install:

- Terraform
- Azure CLI
- VS Code
- Git

Login:

- az login

Verify:

- terraform version
- az account show

Module 3 - Azure Authentication (Enterprise Methods)

Explain 3 methods:

- CLI auth (learning)
- Service principal (production)
- Managed identity (best practice)

Explain why service principal is used in CI/CD.

Create SP:

- az ad sp create-for-rbac --role="Contributor"

Explain output fields:

- client_id
- client_secret
- tenant_id
- subscription_id

Lab 2 - First Terraform Deployment

Create:

- Resource Group

Files:

- main.tf

Sample:

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "rg" {
  name     = "corp-rg"
  location = "East US"
}

Run:

- terraform init
- terraform plan
- terraform apply

Trainer must explain plan output carefully.

DAY 2 - Terraform Language Mastery

Module 4 - Terraform Language Internals

Deep concepts:

- Resource lifecycle
- Meta arguments
- count
- for_each
- depends_on
- lifecycle

Example:

lifecycle {
  prevent_destroy = true
}

Explain real scenario:

- Production DB protection

Module 5 - Variables Enterprise Usage

Explain:

- Input variables
- Locals
- Output variables

Variable hierarchy:

- default
- tfvars
- CLI
- environment

Explain precedence order.

Lab 3 - Variables Implementation

Create:

- variables.tf

Sample:

variable "location" {
  type = string
}

terraform.tfvars:

location = "East US"

Use:

- location = var.location

Module 6 - State Internals (Critical Enterprise Topic)

Trainer must explain deeply:

- Why state exists
- How Terraform tracks infra
- Drift detection
- State corruption scenarios
- State locking importance

Lab 4 - Remote Backend (Important)

Create:

- Storage account
- Container

Configure backend:

terraform {
  backend "azurerm" {
    resource_group_name  = "tfstate-rg"
    storage_account_name = "corpstate123"
    container_name       = "state"
    key                  = "prod.tfstate"
  }
}

Explain migration.

Command:

- terraform init

DAY 3 - Azure Infrastructure Deployment

Module 7 - Network Architecture Design

Trainer must draw architecture:

- Internet
- Load balancer
- Web subnet
- App subnet
- DB subnet

Explain:

- Network segmentation

Lab 5 - Build Network Stack

Deploy:

- Resource group
- VNET
- Subnet
- NSG

Skills learned:

- Terraform references

Example:

resource "azurerm_subnet" "subnet" {
  name                 = "web"
  virtual_network_name = azurerm_virtual_network.vnet.name
}

Module 8 - Virtual Machine Enterprise Deployment

Explain:

- VM components
- NIC
- Disk
- Image
- Availability set

Explain production VM design.

Lab 6 - VM Deployment

Deploy:

- Linux VM
- NIC
- Public IP
- NSG

Exercise:

- SSH test

Module 9 - Storage + Key Vault

Explain:

- Storage tiers
- Blob
- File share
- Key Vault importance

Secrets must not be in code.

DAY 4 - Enterprise Terraform Design

Module 10 - Module Design Patterns

Explain:

- Monolithic vs modular

Enterprise module design:

- Inputs
- Outputs
- Naming standards

Example structure:

- modules/network
- modules/compute
- modules/security

Lab 7 - Create Reusable Modules

Create:

- Network module

Call:

module "network" {
  source = "./modules/network"
}

Module 11 - Workspaces vs Environment Folders

Explain best practice:

- Workspaces are not ideal for enterprise
- Better approach is env/dev and env/prod

Explain why.

Module 12 - Provisioners Reality

Explain:

- Provisioners are last resort

Better approach:

- Cloud init
- Packer
- Ansible

Explain anti-patterns.

DAY 5 - DevOps Integration + Enterprise Practices

Module 13 - Terraform with Azure DevOps

Enterprise pipeline flow:

- Git push
- Pipeline triggers
- Terraform plan
- Approval
- Apply

Explain approval gates.

Lab 8 - Azure DevOps Pipeline

Pipeline stages:

- Validate
- Security scan
- Plan
- Manual approval
- Apply

Module 14 - Policy Enforcement

Explain:

- Terraform Sentinel
- OPA
- Azure Policy

Real rules:

- Mandatory tags
- Approved regions
- VM size restriction

Example rule:

- Allow only Standard_B2s and Standard_D2s

Module 15 - Security Practices (Very Important)

Enterprise must follow:

- Never commit secrets
- Use Key Vault
- Use service principals with minimal permissions
- State encryption
- RBAC

Sensitive example:

variable "db_password" {
  sensitive = true
}

Module 16 - Enterprise Folder Structure

Corporate standard:

- terraform-project/modules/network
- terraform-project/modules/compute
- terraform-project/modules/security
- terraform-project/env/dev
- terraform-project/env/prod
- terraform-project/shared
- terraform-project/backend
- terraform-project/pipelines

Explain separation.

Final Capstone Project (Corporate Scenario)

Build production Azure infrastructure with:

- Internet
- Load balancer
- 2 Web VMs
- App VM
- DB VM
- NSG
- Remote state
- Modules

Requirements:

- Use modules
- Use remote state
- Use variables
- Use outputs
- Follow naming standard

Assignments

- Assignment 1: Create VNET module
- Assignment 2: Deploy 2 environments
- Assignment 3: Add remote backend
- Assignment 4: Add tagging policy
- Assignment 5: Import existing resource

Interview Questions Section

Trainer must discuss:

- What is Terraform state?
- What happens if state is deleted?
- Difference between count vs for_each?
- Module vs workspace?
- Terraform refresh?
- Backend vs provider?

Scenario questions:

- How to recover state corruption?
- How to import infrastructure?
- How to handle drift?

Troubleshooting Section

Common issues:

- State lock failure
- Provider version conflict
- Authentication failure
- Dependency errors

Trainer must simulate error.

Enterprise Best Practices Checklist

Always use:

- Remote backend
- Modules
- Variables
- Naming standard
- Version pinning
- Tagging
- RBAC
- CI/CD

Never do:

- Hardcoded values
- Local state in team environments
- Secrets in code
- Manual changes in Azure without Terraform review

Bonus Enterprise Topics (If Batch is Strong)

- Terraform Cloud
- Cost estimation
- Drift detection
- Private module registry
- Terragrunt
- GitOps
- Zero downtime infrastructure

Trainer Material Available

- Trainer PPT structure
- Detailed lab guide
- Architecture diagrams
- Student handbook
- Trainer handbook
- Assessment questions
- Azure project
- DevOps pipeline project
- GitHub lab repo structure
- Evaluation sheet

Extended package option:

- Trainer PPT
- Lab manual
- Projects
- Assignments
- Interview kit
"""
                ),
                new Course(
                        "GitOps with ArgoCD and Flux",
                        "Learn GitOps delivery using ArgoCD, Flux, Kubernetes, Helm, declarative deployment workflows, environment promotion, rollback strategies, and production-ready GitOps operations.",
                        43999,
                        "GitOps gives teams safer change control, clearer audit trails, and more repeatable deployment workflows.",
                        "The content covers Git-based deployment models, reconciliation, cluster delivery workflows, rollout controls, and production-ready GitOps operating practices.",
                        "What tools are covered?\nThe focus is on ArgoCD, Flux, Kubernetes, Helm, and related GitOps workflows.\n\nIs this only for advanced users?\nNo, the material starts with the core GitOps model and builds into advanced operations.\n\nWill I understand production use cases?\nYes, the course connects concepts to realistic deployment scenarios.",
                        "GitOps curriculum with ArgoCD and Flux foundations, deployment workflows, rollback strategies, labs, and practical production operations."
                ),
                new Course(
                        "GitOps SRE and Platform Engineering",
                        "Advance your career with GitOps, observability engineering, SRE practices, cloud native architecture, platform engineering, release management, and enterprise DevOps platforms.",
                        47999,
                        "This path is valuable for engineers who want to connect reliability, platform thinking, and delivery operations into one role-ready skill set.",
                        "The toolchain spans GitOps workflows, reliability practices, observability, internal platforms, and operational standards used by modern engineering organizations.",
                        "Who should take this course?\nIt is ideal for engineers moving toward SRE, platform engineering, or senior delivery roles.\n\nIs observability included?\nYes, observability and operational visibility are part of the curriculum.\n\nDoes it cover platform thinking?\nYes, the program explains how internal platforms improve developer experience and consistency.",
                        "Advanced enterprise track covering GitOps, SRE, platform engineering, reliability practices, observability, and internal platform design."
                ),
                new Course(
                        "Observability and DevSecOps Toolchain",
                        "Implement Prometheus, Grafana, ELK, Splunk, SonarQube, Trivy, Snyk, Selenium, quality gates, static analysis, and secure software delivery pipelines.",
                        42999,
                        "Observability and security tooling help teams detect issues earlier, improve confidence, and operate software delivery with much better visibility.",
                        "This course connects monitoring, logging, alerting, code quality, scanning, and secure pipeline implementation into one practical engineering toolchain.",
                        "Which tools are covered?\nThe course includes observability, scanning, and code-quality tooling used in modern delivery teams.\n\nIs this focused on implementation or concepts?\nIt covers both foundational understanding and practical workflow usage.\n\nWhy pair observability with DevSecOps?\nBecause delivery quality depends on both visibility and secure engineering controls.",
                        "Enterprise toolchain curriculum covering monitoring, alerting, scanning, quality gates, secure pipeline design, and operational visibility."
                )
        ));
    }
}
