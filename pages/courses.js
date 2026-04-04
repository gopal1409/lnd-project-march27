const categoryCatalog=[
{slug:"devops",title:"DevOps Engineering",logo:"DO",description:"Learn DevOps foundations across automation, collaboration, release workflows, observability, and modern engineering operations.",query:"devops"},
{slug:"devsecops",title:"DevSecOps",logo:"DS",description:"Build secure delivery pipelines with security scanning, policy checks, code quality gates, and container security practices.",query:"devsecops"},
{slug:"iac",title:"Infrastructure as Code",logo:"IaC",description:"Master reusable infrastructure delivery using Terraform, CloudFormation, Ansible, and platform automation patterns.",query:"terraform infrastructure cloudformation ansible"},
{slug:"jenkins",title:"Jenkins",logo:"JK",description:"Create CI/CD pipelines, automate builds, manage agents, and design practical deployment workflows with Jenkins.",query:"jenkins"},
{slug:"github-actions",title:"GitHub Actions",logo:"GH",description:"Automate testing, builds, security checks, and deployment workflows directly from GitHub using reusable actions.",query:"github actions"},
{slug:"gitlab-cicd",title:"GitLab CI/CD",logo:"GL",description:"Build end-to-end GitLab pipelines for source control, testing, packaging, security scanning, and deployment automation.",query:"gitlab ci/cd"},
{slug:"azure-devops",title:"Azure DevOps",logo:"AZD",description:"Learn Azure Boards, Repos, Pipelines, and release automation for enterprise-grade delivery management.",query:"azure devops"},
{slug:"aws-architect",title:"AWS Solution Architecture",logo:"AWS",description:"Design scalable AWS architectures covering compute, storage, networking, security, resilience, and cloud best practices.",query:"aws architecture"},
{slug:"azure-architect",title:"Azure Solution Architecture",logo:"AZ",description:"Plan Azure solutions with identity, networking, governance, compute, storage, and hybrid cloud architecture patterns.",query:"azure architecture"},
{slug:"gcp-architect",title:"Google Cloud Solution Architecture",logo:"GCP",description:"Design production-ready GCP solutions using core cloud services, reliability patterns, security controls, and cost awareness.",query:"google cloud gcp architecture"}
];

function renderCategoryCatalog(){
let tiles=categoryCatalog.map(item=>`
<article class="category-tile">
<div class="category-logo">${item.logo}</div>
<div class="category-copy">
<span class="category-label">Category</span>
<h3>${item.title}</h3>
<p>${item.description}</p>
</div>
<div class="category-actions">
<button class="enquiry" type="button" onclick="go('/enquiry')">Enquire Now</button>
<button class="nav-link-btn category-link-btn" type="button" onclick="go('/blogs?category=${encodeURIComponent(item.title)}')">View Related Blogs</button>
<button class="nav-link-btn category-link-btn" type="button" onclick="go('/courses?q=${encodeURIComponent(item.query)}')">View Related Courses</button>
</div>
</article>`).join("");

return `
<section class="courses-page">
<div class="courses-header">
<span class="section-eyebrow">Categories</span>
<h2>Explore DevOps, CI/CD, cloud, and architecture tracks</h2>
<p>Browse category tiles for the most requested learning areas including DevOps, DevSecOps, Infrastructure as Code, Jenkins, GitHub Actions, GitLab CI/CD, Azure DevOps, and solution architecture tracks across AWS, Azure, and Google Cloud.</p>
</div>
<div class="category-catalog-grid">${tiles}</div>
</section>`;
}

function renderCourseTable(data){
if(!data.length){
return `<div class="empty-courses">
<h3>No matching courses found yet</h3>
<p>Try another search or return to the full course catalog.</p>
<button class="clear-filter" onclick="go('/courses')">View All Courses</button>
</div>`;
}

let rows=data.map(c=>{
let logo=(c.title||"Course").split(/\s+/).slice(0,2).map(word=>word[0]).join("").toUpperCase();
let price=typeof c.price==="number"&&c.price>0?`Rs ${c.price.toLocaleString("en-IN")}`:"Contact for pricing";
return `
<tr class="course-table-row" onclick="go('/course?id=${c.id}')">
<td data-label="Image">
<div class="course-table-media">
<div class="course-table-logo">${logo}</div>
<span class="course-card-chip">Live Course</span>
</div>
</td>
<td data-label="Course">
<div class="course-table-title">${c.title}</div>
</td>
<td data-label="Brief About Course">
<div class="course-table-brief">${c.description}</div>
</td>
<td data-label="Price">
<div class="course-table-price">${price}</div>
</td>
<td data-label="Actions">
<div class="course-table-actions">
<button class="nav-link-btn admin-page-link" type="button" onclick="event.stopPropagation(); go('/course?id=${c.id}')">Read Me</button>
<button class="enquiry" type="button" onclick="event.stopPropagation(); go('/enquiry?courseId=${c.id}')">Enquire</button>
</div>
</td>
</tr>`;
}).join("");

return `
<div class="course-table-wrap">
<table class="course-table">
<thead>
<tr>
<th>Image</th>
<th>Course</th>
<th>Brief About Course</th>
<th>Price</th>
<th>Actions</th>
</tr>
</thead>
<tbody>
${rows}
</tbody>
</table>
</div>`;
}

function renderCourseBlogsSection(blogs){
if(!blogs.length) return "";
let blogCards=blogs.slice(0,3).map(blog=>`
<article class="blog-mini-card" onclick="go('/blog?id=${blog.id}')">
<span>${blog.category||"Blog"}</span>
<strong>${blog.title}</strong>
<small>${blog.summary||""}</small>
</article>`).join("");

return `
<section class="blog-grid-section courses-blog-section">
<div class="courses-header">
<span class="section-eyebrow">Course Blogs</span>
<h2>Read related blogs from the frontend catalog</h2>
<p>Explore practical reading material alongside the full course listing.</p>
</div>
<div class="blog-mini-grid course-blog-mini-grid">
${blogCards}
</div>
</section>`;
}

async function courses(){
let data=await getCourses();
data=Array.isArray(data)?data:[];
data=data.sort((a,b)=>(a.title||"").localeCompare(b.title||""));
let blogs=[];
try{
blogs=await getBlogs();
}catch(e){
blogs=Array.isArray(window.generatedBlogs)?window.generatedBlogs:[];
}
blogs=Array.isArray(blogs)?blogs:[];
let topicMap={
"devsecops-cicd":{title:"DevSecOps & CI/CD",keywords:["jenkins","gitlab ci/cd","azure devops","github actions","bamboo","teamcity","circleci","travis ci","spinnaker","argocd","codefresh","octopus deploy","urbancode deploy","ci/cd","devsecops"]},
"containerization-orchestration":{title:"Containerization & Orchestration",keywords:["docker","kubernetes","openshift","docker swarm","helm","eks","aks","gke","rancher","istio","service mesh","container"]},
"cloud-platforms":{title:"Cloud Platforms",keywords:["aws","azure","google cloud","gcp","alicloud","hybrid cloud","multi-cloud","cloud"]},
"infrastructure-as-code":{title:"Infrastructure as Code (IaC)",keywords:["terraform","cloudformation","ansible","puppet","chef","saltstack","ansible tower","rundeck","vault","consul","iac"]},
"configuration-automation":{title:"Configuration & Automation",keywords:["ansible","shell","powershell","perl","python","automation","ci automation"]},
"version-control-scm":{title:"Version Control & SCM",keywords:["git","github","gitlab","bitbucket","svn","tfs","perforce","helix","git fusion","git swarm","scm"]},
"build-package-management":{title:"Build & Package Management",keywords:["maven","gradle","msbuild","ant","nexus","artifactory","cloudrepo","build"]},
"monitoring-logging-observability":{title:"Monitoring, Logging & Observability",keywords:["prometheus","grafana","elk","splunk","zabbix","cloudwatch","beats","efk","observability","monitoring","logging"]},
"security-devsecops-tools":{title:"Security & DevSecOps Tools",keywords:["snyk","aqua","twistlock","trivy","owasp dependency check","sonarqube","coverity","ncover","container security","security"]},
"alm-collaboration-tools":{title:"ALM & Collaboration Tools",keywords:["jira","confluence","servicenow","bugzilla","polarion","rally","codebeamer","slack","atlassian"]},
"testing-quality-engineering":{title:"Testing & Quality Engineering",keywords:["sonarqube","selenium","code coverage","static code analysis","quality gates","testing","quality"]},
"architecture-platforms":{title:"Architecture & Platforms",keywords:["microservices","gitops","cloud native","platform engineering","air-gapped","enterprise devops","architecture"]},
"methodologies-practices":{title:"Methodologies & Practices",keywords:["devops","devsecops","gitops","sre","agile","ci/cd","infrastructure automation","release management","observability engineering"]}
};
let params=new URLSearchParams(location.search);
let topic=params.get("topic");
let query=(params.get("q")||"").trim().toLowerCase();
let catalog=params.get("catalog");
if(catalog==="categories"){
document.getElementById("app").innerHTML=renderCategoryCatalog();
return;
}
let activeTopic=topicMap[topic];
if(activeTopic){
data=data.filter(c=>{
let text=`${c.title||""} ${c.description||""}`.toLowerCase();
return activeTopic.keywords.some(k=>text.includes(k));
});
}
if(query){
data=data.filter(c=>{
let text=`${c.title||""} ${c.description||""}`.toLowerCase();
return text.includes(query);
});
}
let html="";
data.forEach(c=>{html+=courseCard(c)});
let heading=query
?`<div class="courses-header">
<span class="section-eyebrow">Search Results</span>
<h2>Results for "${params.get("q")}"</h2>
<p>Showing courses that match your search from the top navigation.</p>
<button class="clear-filter" onclick="go('/courses')">View All Courses</button>
</div>`
:activeTopic
?`<div class="courses-header">
<span class="section-eyebrow">Filtered Courses</span>
<h2>${activeTopic.title}</h2>
<p>Showing courses that match this trending learning track.</p>
<button class="clear-filter" onclick="go('/courses')">View All Courses</button>
</div>`
:`<div class="courses-header">
<span class="section-eyebrow">Course Catalog</span>
<h2>Browse all available courses</h2>
<p>Explore all ${data.length} courses currently offered from the backend catalog across DevOps, cloud, automation, and platform engineering.</p>
</div>`;
let content=(query||activeTopic)
?(html||`<div class="empty-courses">
<h3>No matching courses found yet</h3>
<p>Try another search or return to the full course catalog.</p>
<button class="clear-filter" onclick="go('/courses')">View All Courses</button>
</div>`)
:renderCourseTable(data);
document.getElementById("app").innerHTML=`
<section class="courses-page">
${heading}
${(query||activeTopic)?`<div class="grid">${content}</div>`:`${content}${renderCourseBlogsSection(blogs)}`}
</section>`;
}
