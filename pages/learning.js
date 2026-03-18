function learning(){
let topic=new URLSearchParams(location.search).get("topic")||"";
let guides={
"devsecops-cicd":{
title:"DevSecOps and CI/CD Practical Guide",
eyebrow:"Trending Course Article",
summary:"Learn how modern delivery teams build secure, repeatable CI/CD pipelines that move code from commit to production with quality gates, security scans, and reliable rollback patterns.",
tools:["Jenkins","GitHub Actions","GitLab CI/CD","Azure DevOps","ArgoCD","SonarQube","Trivy"],
practical:["Build a multi-stage pipeline for build, test, scan, and deploy","Add security checks like SAST, dependency scanning, and container scans","Automate environment promotion with approvals and rollback steps"],
projects:["Create a pipeline for a Java or Node service with unit tests and code coverage","Containerize the app and push a verified image to a registry","Deploy to Kubernetes through GitOps with ArgoCD"],
outcomes:["Understand end-to-end pipeline design","Reduce release risk with security-first automation","Ship faster with repeatable delivery workflows"]
},
"containerization-orchestration":{
title:"Containerization and Orchestration Practical Guide",
eyebrow:"Trending Course Article",
summary:"Build hands-on confidence with Docker, Kubernetes, and platform operations so you can package applications correctly and run them reliably at scale.",
tools:["Docker","Kubernetes","Helm","OpenShift","EKS","AKS","GKE","Rancher"],
practical:["Package applications with Docker best practices","Deploy multi-service apps to Kubernetes using manifests and Helm","Handle scaling, service exposure, config, and observability"],
projects:["Containerize a web app with environment-specific settings","Deploy it to Kubernetes with health checks and autoscaling","Add ingress, secrets, and logging for a production-like setup"],
outcomes:["Understand workloads, services, ingress, and scaling","Operate containerized apps with fewer deployment issues","Move from local containers to managed clusters confidently"]
},
"cloud-platforms":{
title:"Cloud Platforms Practical Guide",
eyebrow:"Trending Course Article",
summary:"Explore how teams design, deploy, and operate workloads across AWS, Azure, and GCP with a practical focus on services, architecture, and cost-aware delivery.",
tools:["AWS","Microsoft Azure","Google Cloud","Hybrid Cloud","Multi-cloud"],
practical:["Provision cloud infrastructure for web and API workloads","Compare compute, storage, networking, and IAM basics across providers","Design practical deployment paths for staging and production"],
projects:["Launch a cloud-hosted application stack with networking and identity","Set up monitoring, logging, and backup basics","Compare equivalent services across AWS, Azure, and GCP"],
outcomes:["Build a stronger multi-cloud foundation","Choose the right service patterns for team needs","Understand cloud deployment tradeoffs in real projects"]
},
"infrastructure-as-code":{
title:"Infrastructure as Code Practical Guide",
eyebrow:"Trending Course Article",
summary:"Learn how to define infrastructure in code so environments are repeatable, reviewable, and easier to scale across teams and business units.",
tools:["Terraform","CloudFormation","Ansible","Vault","Consul","Puppet","Chef"],
practical:["Write reusable IaC modules and environment definitions","Automate provisioning for networks, servers, databases, and app services","Manage configuration and secrets safely across environments"],
projects:["Provision a full staging environment using Terraform","Use Ansible for application configuration and setup","Introduce secret handling and remote state management"],
outcomes:["Reduce environment drift and manual setup","Standardize provisioning across teams","Support auditability and repeatability in delivery"]
},
"configuration-automation":{
title:"Configuration and Automation Practical Guide",
eyebrow:"Trending Course Article",
summary:"Use scripting and automation tools to remove repetitive operational work, standardize system setup, and improve team productivity.",
tools:["Ansible","Shell Scripting","PowerShell","Python","Automation Frameworks"],
practical:["Automate server preparation and application setup","Write scripts for backups, cleanup, health checks, and deployments","Create reusable operational tasks teams can run consistently"],
projects:["Automate Linux or Windows environment preparation","Build scripts for scheduled maintenance and deployment support","Create an Ansible playbook for app installation and verification"],
outcomes:["Reduce repetitive manual work","Improve consistency across operations tasks","Build automation habits that scale with your team"]
},
"version-control-scm":{
title:"Version Control and SCM Practical Guide",
eyebrow:"Trending Course Article",
summary:"Learn the practical workflows teams use in Git-based delivery, from branching and pull requests to release tagging and collaboration across engineering teams.",
tools:["Git","GitHub","GitLab","Bitbucket","SVN","Perforce"],
practical:["Use branching strategies that fit release cadence and team size","Manage pull requests, reviews, merges, and release tags","Handle conflicts and maintain clean repository history"],
projects:["Set up a team repo with branch protection and review rules","Walk through feature, release, and hotfix workflows","Create a tagged release process tied to deployment pipelines"],
outcomes:["Collaborate more confidently in shared repos","Reduce merge friction and release mistakes","Understand source control as part of the delivery lifecycle"]
},
"build-package-management":{
title:"Build and Package Management Practical Guide",
eyebrow:"Trending Course Article",
summary:"Understand how applications are built, versioned, packaged, and published so teams can create dependable artifacts for testing and release.",
tools:["Maven","Gradle","MSBuild","Ant","Nexus","Artifactory"],
practical:["Build reproducible application artifacts for multiple environments","Manage internal dependencies and package repositories","Use semantic versioning and release artifact promotion"],
projects:["Create a Maven or Gradle project with test and package stages","Publish versioned artifacts to a repository manager","Integrate package publishing into CI pipelines"],
outcomes:["Improve build consistency and release quality","Manage dependencies more safely","Create a stronger bridge between code and deployment"]
},
"monitoring-logging-observability":{
title:"Monitoring, Logging, and Observability Practical Guide",
eyebrow:"Trending Course Article",
summary:"Learn how teams detect issues, understand system behavior, and improve reliability through metrics, logs, dashboards, and alerting.",
tools:["Prometheus","Grafana","ELK Stack","Splunk","CloudWatch","EFK"],
practical:["Capture metrics and logs from applications and infrastructure","Build dashboards for service health and business signals","Create alerting strategies that reduce noise and speed up response"],
projects:["Instrument an app with metrics and log collection","Build Grafana dashboards for performance and uptime","Create alerts for error spikes, latency, and resource pressure"],
outcomes:["Troubleshoot systems faster","Gain better visibility into real production behavior","Support SRE and platform engineering practices"]
},
"security-devsecops-tools":{
title:"Security and DevSecOps Tools Practical Guide",
eyebrow:"Trending Course Article",
summary:"Shift security into everyday engineering workflows by integrating code checks, dependency scanning, image scanning, and policy-aware delivery.",
tools:["Snyk","Trivy","SonarQube","OWASP Dependency Check","Aqua","Coverity"],
practical:["Scan code, dependencies, and containers during delivery","Use quality gates and policy checks before deployment","Understand practical remediation workflows for findings"],
projects:["Add dependency and image scanning to a CI pipeline","Block releases on critical findings with sensible rules","Generate reports teams can use during sprint planning"],
outcomes:["Catch risks earlier in delivery","Make security part of the build process","Improve engineering ownership of secure releases"]
},
"alm-collaboration-tools":{
title:"ALM and Collaboration Tools Practical Guide",
eyebrow:"Trending Course Article",
summary:"See how delivery teams use planning, documentation, service workflow, and collaboration tools together to keep projects moving clearly and predictably.",
tools:["JIRA","Confluence","ServiceNow","Bugzilla","Rally","Slack"],
practical:["Map backlog, sprint, release, and incident workflows","Connect documentation and ticketing for better handoffs","Use collaboration tools to improve visibility across teams"],
projects:["Create a practical sprint board and release tracking workflow","Link documentation with engineering execution steps","Build a lightweight incident and change management process"],
outcomes:["Improve planning and communication across teams","Reduce handoff friction between delivery functions","Make project progress easier to track and manage"]
},
"testing-quality-engineering":{
title:"Testing and Quality Engineering Practical Guide",
eyebrow:"Trending Course Article",
summary:"Build a quality-first approach to delivery using automated testing, code analysis, and release gates that support reliability without slowing teams down.",
tools:["Selenium","SonarQube","Code Coverage","Static Analysis","Quality Gates"],
practical:["Add layered testing into build and release workflows","Use quality gates to catch regressions before deployment","Improve confidence through test automation and reporting"],
projects:["Set up test automation for UI and service layers","Track code coverage and code quality trends","Block unstable builds before they reach staging or production"],
outcomes:["Raise release confidence with measurable quality checks","Reduce defects escaping into later environments","Make quality visible inside delivery pipelines"]
},
"architecture-platforms":{
title:"Architecture and Platforms Practical Guide",
eyebrow:"Trending Course Article",
summary:"Explore how modern architecture and platform teams design scalable foundations for developers, services, and internal delivery systems.",
tools:["Microservices","GitOps","Cloud Native","Platform Engineering","Enterprise DevOps Platforms"],
practical:["Understand service boundaries, platform responsibilities, and developer workflows","Design internal platforms that reduce repetitive engineering work","Align architecture choices with delivery speed and reliability"],
projects:["Map a monolith-to-microservices modernization path","Design a developer platform with self-service deployment patterns","Create a GitOps-based operating model for shared environments"],
outcomes:["Think more clearly about platform strategy","Understand practical architecture tradeoffs","Design systems that support team scale and speed"]
},
"methodologies-practices":{
title:"Methodologies and Practices Practical Guide",
eyebrow:"Trending Course Article",
summary:"Learn how DevOps, SRE, Agile, and GitOps practices come together in real teams to improve collaboration, flow, reliability, and delivery outcomes.",
tools:["DevOps","DevSecOps","GitOps","SRE","Agile","Release Management"],
practical:["Connect planning, engineering, operations, and reliability work","Use practices that improve flow rather than adding ceremony","Build team habits around feedback, automation, and resilience"],
projects:["Map a current-state delivery process and improve bottlenecks","Define error budgets or release guardrails for a service","Build a lightweight GitOps or SRE operating routine for a team"],
outcomes:["Understand how practices work in day-to-day delivery","Adopt methods that improve team effectiveness","Bridge process, tools, and engineering execution more effectively"]
}
};

let guide=guides[topic]||{
title:"Learning Guide",
eyebrow:"Practical Article",
summary:"Explore a practical breakdown of this learning track, including tools, hands-on work, and real-world outcomes.",
tools:["Hands-on labs","Projects","Workflows"],
practical:["Understand the fundamentals","Apply the ideas in practical exercises","Connect the topic to real team workflows"],
projects:["Guided exercises","Scenario-based practice","Portfolio-ready work"],
outcomes:["Build confidence","Learn by doing","Improve job-ready skills"]
};

document.getElementById("app").innerHTML=`
<section class="learning-page">
<div class="learning-hero">
<div class="learning-copy">
<span class="section-eyebrow">${guide.eyebrow}</span>
<h1>${guide.title}</h1>
<p>${guide.summary}</p>
<div class="learning-cta-row">
<button class="enquiry" onclick="go('/courses')">Explore Courses</button>
<button class="nav-link-btn learning-secondary" onclick="go('/enquiry')">Talk To Training Advisor</button>
</div>
</div>
<div class="learning-sidebar">
<div class="learning-side-card">
<h3>Core Tools</h3>
<div class="learning-tag-row">
${guide.tools.map(tool=>`<span class="learning-tag">${tool}</span>`).join("")}
</div>
</div>
</div>
</div>

<div class="learning-grid">
<article class="learning-card">
<h2>What You Will Practice</h2>
<ul class="learning-list">
${guide.practical.map(item=>`<li>${item}</li>`).join("")}
</ul>
</article>
<article class="learning-card">
<h2>Hands-On Projects</h2>
<ul class="learning-list">
${guide.projects.map(item=>`<li>${item}</li>`).join("")}
</ul>
</article>
<article class="learning-card">
<h2>Practical Outcomes</h2>
<ul class="learning-list">
${guide.outcomes.map(item=>`<li>${item}</li>`).join("")}
</ul>
</article>
</div>

<section class="learning-article">
<div class="learning-article-main">
<h2>Why this track matters in real work</h2>
<p>This learning track is designed to move beyond theory. Instead of only introducing concepts, it focuses on how engineers, administrators, and delivery teams actually apply these tools in projects, releases, operations, and team collaboration.</p>
<p>You will see how the topic fits into practical workflows, where common mistakes happen, and what a strong real-world implementation usually looks like. That makes the learning more useful for interviews, project work, and day-to-day technical execution.</p>
<h2>How practical knowledge is built</h2>
<p>Practical knowledge comes from doing structured tasks repeatedly: setting things up, debugging issues, improving workflows, and understanding the reason behind each decision. This guide is meant to prepare you for that kind of hands-on learning journey.</p>
<p>Whether you are coming from development, support, QA, infrastructure, or operations, the goal is to help you connect tool knowledge with job-ready execution.</p>
<h2>What to do next</h2>
<p>Use this article as a starting point, then browse the relevant courses, compare tracks, and submit an enquiry for the course that matches your team or career goals. The best learning path is the one that gives you both conceptual clarity and enough practice to perform confidently.</p>
<div class="learning-actions">
<button class="enquiry" onclick="go('/courses')">Browse Matching Courses</button>
<button class="nav-link-btn learning-secondary" onclick="go('/enquiry')">Request Corporate Training</button>
</div>
</div>
<aside class="learning-article-aside">
<div class="learning-side-card">
<h3>Best for</h3>
<p>Engineers, administrators, release teams, cloud learners, and professionals who want hands-on, production-relevant skill building.</p>
</div>
<div class="learning-side-card">
<h3>Learning style</h3>
<p>Practical tasks, guided implementation, tool walkthroughs, and scenario-based project work.</p>
</div>
</aside>
</section>
</section>`;
}
