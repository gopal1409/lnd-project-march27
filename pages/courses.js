async function courses(){
let data=await getCourses();
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
<p>Explore the complete learning catalog across DevOps, cloud, automation, and platform engineering.</p>
</div>`;
let content=html||`<div class="empty-courses">
<h3>No matching courses found yet</h3>
<p>Try another search or return to the full course catalog.</p>
<button class="clear-filter" onclick="go('/courses')">View All Courses</button>
</div>`;
document.getElementById("app").innerHTML=`
<section class="courses-page">
${heading}
<div class="grid">${content}</div>
</section>`;
}
