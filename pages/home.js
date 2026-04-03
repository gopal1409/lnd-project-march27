async function home(){
let data=[];
try{
data=await getCourses();
}catch(e){
data=[];
}
data=Array.isArray(data)?data:[];
if(!data.length){
data=[
{id:"fallback-devsecops",title:"DevSecOps and CI/CD Master Program",description:"Master Jenkins, GitLab CI/CD, GitHub Actions, Azure DevOps, ArgoCD, Spinnaker, Codefresh, and secure delivery practices."},
{id:"fallback-k8s",title:"Docker Kubernetes and OpenShift Bootcamp",description:"Build practical containerization and orchestration skills with Docker, Kubernetes, Helm, OpenShift, Rancher, AKS, EKS, and GKE."},
{id:"fallback-cloud",title:"AWS Azure and GCP Cloud Engineering",description:"Learn multi-cloud architecture and delivery patterns across AWS, Microsoft Azure, and Google Cloud Platform."},
{id:"fallback-iac",title:"Terraform and Infrastructure as Code",description:"Design repeatable infrastructure using Terraform, CloudFormation, Ansible, Vault, Consul, Puppet, and Chef."},
{id:"fallback-gitops",title:"GitOps with ArgoCD and Flux",description:"Learn GitOps delivery using ArgoCD, Flux, Kubernetes, Helm, declarative deployment workflows, and rollback strategies."},
{id:"fallback-platform",title:"GitOps SRE and Platform Engineering",description:"Advance with GitOps, SRE practices, observability engineering, cloud native architecture, and platform engineering workflows."}
];
}

function normalizeTopic(value){
return (value||"")
    .toLowerCase()
    .replace(/engineering/g,"")
    .replace(/solution/g,"")
    .replace(/architecture/g,"architect")
    .replace(/program/g,"")
    .replace(/bootcamp/g,"")
    .replace(/master/g,"")
    .replace(/and/g," ")
    .replace(/[^a-z0-9]+/g," ")
    .trim();
}

let blogs=[];
try{
blogs=await getBlogs();
}catch(e){
blogs=Array.isArray(window.generatedBlogs)?window.generatedBlogs:[];
}
blogs=Array.isArray(blogs)?blogs:[];

data=data.sort((a,b)=>(a.title||"").localeCompare(b.title||""));
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
let allCoursesHtml=data.length
?data.map(c=>`
<article class="course-marquee-card" onclick="go('/course?id=${c.id}')">
<span class="course-marquee-label">Live Course</span>
<h3>${c.title}</h3>
<p>${c.description}</p>
<button class="course-card-btn" type="button">Know More</button>
</article>`).join("")
:`<div class="empty-courses">
<h3>No courses available yet</h3>
<p>Courses from the backend catalog will appear here automatically.</p>
</div>`;
let spotlight=data.length
?data.map(c=>`
<div class="spotlight-card" onclick="go('${(()=>{
let topic=normalizeTopic(c.title);
let relatedBlog=blogs.find(blog=>{
let blogCategory=normalizeTopic(blog.category);
let blogText=normalizeTopic(`${blog.title||""} ${blog.summary||""}`);
return (blogCategory&& (topic.includes(blogCategory)||blogCategory.includes(topic))) || (topic&&blogText.includes(topic));
});
return relatedBlog?`/blog?id=${relatedBlog.id}`:`/blogs?category=${encodeURIComponent(c.title)}`;
})()}')">
<div class="spotlight-logo">${(c.title||"Course").split(/\s+/).slice(0,2).map(word=>word[0]).join("").toUpperCase()}</div>
<div class="spotlight-tag">Live Course</div>
<h3>${c.title}</h3>
<p>${c.description}</p>
<span>Read Related Blog</span>
</div>`).join("")
:"";
let trendingHtml=trendingTopics.map(section=>`
<article class="trending-card" onclick="go('/learn?topic=${section.slug}')">
<h3>${section.title}</h3>
<p>${section.items.join(", ")}</p>
</article>`).join("");
let heroIcons=[
{label:"DevOps",mark:"DO",path:"/blogs?category=DevOps"},
{label:"DevSecOps",mark:"DS",path:"/blogs?category=DevSecOps"},
{label:"Azure",mark:"AZ",path:"/courses?q=azure"},
{label:"AWS",mark:"AWS",path:"/courses?q=aws"},
{label:"GCP",mark:"GCP",path:"/courses?q=gcp"},
{label:"Terraform",mark:"TF",path:"/courses?q=terraform"},
{label:"HashiCorp",mark:"HC",path:"/courses?q=hashicorp"},
{label:"Kubernetes",mark:"K8",path:"/courses?q=kubernetes"},
{label:"Containers",mark:"CT",path:"/courses?q=container"}
];
let heroIconItems=heroIcons.map(item=>`
<button class="hero-tech-item" type="button" onclick="go('${item.path}')">
<span class="hero-tech-icon">${item.mark}</span>
<span class="hero-tech-label">${item.label}</span>
</button>`).join("");
document.getElementById("app").innerHTML=`
<section class="hero-banner">
<div class="hero-main">
<div class="hero-copy">
<span class="eyebrow">Live instructor-led learning</span>
<h1>Learn trending tech skills with career-focused courses</h1>
<p>Browse the latest programs, compare courses at a glance, and start learning from the path that fits your goals best.</p>
<div class="hero-tech-marquee">
<div class="hero-tech-track">
${heroIconItems}
${heroIconItems}
</div>
</div>
<div class="hero-stats">
<div class="stat-box">
<strong>20+</strong>
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
