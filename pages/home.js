async function home(){
let data=[];
try{
data=await getCourses();
}catch(e){
data=[];
}
let trendingTopics=[
{slug:"devsecops-cicd",title:"DevSecOps & CI/CD",items:["Jenkins","GitLab CI/CD","Azure DevOps","GitHub Actions","Bamboo","TeamCity","CircleCI","Travis CI","Spinnaker","ArgoCD","Codefresh","Octopus Deploy","UrbanCode Deploy"]},
{slug:"containerization-orchestration",title:"Containerization & Orchestration",items:["Docker","Kubernetes","OpenShift","Docker Swarm","Helm","EKS","AKS","GKE","Rancher","Service Mesh (Istio)"]},
{slug:"cloud-platforms",title:"Cloud Platforms",items:["AWS","Microsoft Azure","Google Cloud Platform (GCP)","AliCloud","Hybrid Cloud","Multi-Cloud Architecture"]},
{slug:"infrastructure-as-code",title:"Infrastructure as Code (IaC)",items:["Terraform","CloudFormation","Ansible","Puppet","Chef","SaltStack","Ansible Tower","Rundeck","HashiCorp Vault","Consul"]},
{slug:"configuration-automation",title:"Configuration & Automation",items:["Ansible","Shell Scripting","PowerShell","Perl","Python (automation exposure)","CI automation frameworks"]},
{slug:"version-control-scm",title:"Version Control & SCM",items:["Git","GitHub","GitLab","Bitbucket","SVN","TFS","Perforce","Helix TeamHub","Git Fusion","Git Swarm"]},
{slug:"build-package-management",title:"Build & Package Management",items:["Maven","Gradle","MSBuild","Ant","Nexus","JFrog Artifactory","CloudRepo"]},
{slug:"monitoring-logging-observability",title:"Monitoring, Logging & Observability",items:["Prometheus","Grafana","ELK Stack","Splunk","Zabbix","CloudWatch","Beats","EFK Stack"]},
{slug:"security-devsecops-tools",title:"Security & DevSecOps Tools",items:["Snyk","Aqua Security","Twistlock","Trivy","OWASP Dependency Check","SonarQube","Coverity","NCover","Container Security Platforms"]},
{slug:"alm-collaboration-tools",title:"ALM & Collaboration Tools",items:["JIRA","Confluence","ServiceNow","Bugzilla","Polarion","Rally","Codebeamer","Slack","Atlassian Suite"]},
{slug:"testing-quality-engineering",title:"Testing & Quality Engineering",items:["SonarQube","Selenium","Generic Code Coverage tools","Static Code Analysis","Quality Gates implementation"]},
{slug:"architecture-platforms",title:"Architecture & Platforms",items:["Microservices Architecture","GitOps","Cloud Native Architecture","Platform Engineering","Air-gapped Infrastructure","Enterprise DevOps Platforms"]},
{slug:"methodologies-practices",title:"Methodologies & Practices",items:["DevOps","DevSecOps","GitOps","SRE","Agile","CI/CD","Infrastructure Automation","Release Management","Observability Engineering"]}
];
let featuredCourses=data.slice(0,4);
let courseBanner=data.length
?data.map(c=>`<button class="course-pill" onclick="go('/course?id=${c.id}')">${c.title}</button>`).join("")
:`<span class="course-pill muted">Courses will appear here soon</span>`;
let spotlight=featuredCourses.length
?featuredCourses.map(c=>`
<div class="spotlight-card" onclick="go('/course?id=${c.id}')">
<div class="spotlight-tag">Live Course</div>
<h3>${c.title}</h3>
<p>${c.description}</p>
<span>Explore Course</span>
</div>`).join("")
:`<div class="spotlight-card empty">
<div class="spotlight-tag">Coming Soon</div>
<h3>New learning paths are on the way</h3>
<p>Connect your course API and featured programs will appear here automatically.</p>
<span>Stay Tuned</span>
</div>`;
let trendingHtml=trendingTopics.map(section=>`
<article class="trending-card" onclick="go('/learn?topic=${section.slug}')">
<h3>${section.title}</h3>
<p>${section.items.join(", ")}</p>
</article>`).join("");
document.getElementById("app").innerHTML=`
<section class="hero-banner">
<div class="hero-main">
<div class="hero-copy">
<span class="eyebrow">Live instructor-led learning</span>
<h1>Learn trending tech skills with career-focused courses</h1>
<p>Browse the latest programs, compare courses at a glance, and start learning from the path that fits your goals best.</p>
<div class="hero-search" onclick="go('/courses')">
<span class="search-icon">Search</span>
<span class="search-text">Discover DevOps, Cloud, GitOps, IaC and more</span>
<button>Browse Courses</button>
</div>
<div class="hero-stats">
<div class="stat-box">
<strong>${data.length || "0"}+</strong>
<span>Courses available</span>
</div>
<div class="stat-box">
<strong>24x7</strong>
<span>Learner support</span>
</div>
<div class="stat-box">
<strong>100%</strong>
<span>Career-focused tracks</span>
</div>
</div>
</div>
<div class="hero-spotlight">
<div class="spotlight-header">
<span>Trending now</span>
<button onclick="go('/courses')">View all</button>
</div>
<div class="spotlight-grid">
${spotlight}
</div>
</div>
</div>
<div class="course-banner">
<div class="course-banner-label">All Courses</div>
<div class="course-pill-row">${courseBanner}</div>
</div>
</section>
<section class="trending-section">
<div class="section-copy">
<span class="section-eyebrow">Trending Courses</span>
<h2>Explore our most in-demand DevOps and cloud learning tracks</h2>
<p>These are the high-interest areas learners usually explore right after the main banner, covering tools, platforms, and engineering practices used across modern delivery teams.</p>
</div>
<div class="trending-grid">
${trendingHtml}
</div>
</section>`;
}
