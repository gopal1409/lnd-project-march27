function closeCourseEnrollModal(){
let modal=document.getElementById("courseEnrollModal");
if(!modal) return;
modal.classList.remove("open");
}

function openCourseEnrollModal(){
let modal=document.getElementById("courseEnrollModal");
if(!modal) return;
modal.classList.add("open");
}

function normalizeCourseTopic(value){
return (value||"")
    .toLowerCase()
    .replace(/engineering/g,"")
    .replace(/solution/g,"")
    .replace(/architecture/g,"architect")
    .replace(/program/g,"")
    .replace(/bootcamp/g,"")
    .replace(/master/g,"")
    .replace(/[^a-z0-9]+/g," ")
    .trim();
}

function parseCourseFaqs(text){
return (text||"")
    .split(/\n\s*\n/)
    .map(block=>block.trim())
    .filter(Boolean)
    .map(block=>{
        let lines=block.split("\n").map(line=>line.trim()).filter(Boolean);
        return {
            question:lines[0]||"",
            answer:lines.slice(1).join(" ")||"More details will be shared by our team."
        };
    })
    .filter(item=>item.question);
}

function formatCourseParagraphs(text){
return (text||"")
    .split(/\n\s*\n/)
    .map(block=>block.trim())
    .filter(Boolean)
    .map(block=>`<p>${block}</p>`)
    .join("");
}

function formatReadmeContent(text){
return (text||"")
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/\n/g,"<br>");
}

function scrollToCourseReadme(){
let section=document.getElementById("courseReadmeSection");
if(section) section.scrollIntoView({behavior:"smooth",block:"start"});
}

async function submitCourseEnrollForm(courseId){
let name=document.getElementById("courseEnrollName");
let email=document.getElementById("courseEnrollEmail");
let countryCode=document.getElementById("courseEnrollCountryCode");
let phone=document.getElementById("courseEnrollPhone");
let feedback=document.getElementById("courseEnrollFeedback");
let submit=document.getElementById("courseEnrollSubmit");
let title=document.getElementById("courseEnrollTitle");
if(!name||!email||!countryCode||!phone||!feedback||!submit||!title) return;

submit.disabled=true;
submit.textContent="Submitting...";
feedback.textContent="";
feedback.className="form-feedback";

try{
let result=await createCourseEnquiry({
name:name.value.trim(),
email:email.value.trim(),
companyName:"Individual Learner",
teamSize:"1-10",
preferredTrainingMode:"Online",
courseId:Number(courseId),
phoneCountryCode:countryCode.value,
phoneNumber:phone.value.trim(),
message:`Enroll for the program: ${title.textContent.trim()}`
});
feedback.textContent=result.message||"Enrollment request submitted successfully.";
feedback.className="form-feedback success";
name.value="";
email.value="";
countryCode.value="+91";
phone.value="";
setTimeout(closeCourseEnrollModal,1200);
}catch(err){
let text=err&&err.message?err.message:"Unable to submit your enrollment request right now.";
if(err&&err.errors){
let firstKey=Object.keys(err.errors)[0];
if(firstKey) text=err.errors[firstKey];
}
feedback.textContent=text;
feedback.className="form-feedback error";
}finally{
submit.disabled=false;
submit.textContent="Enroll Now";
}
}

async function courseDetails(){
let id=new URLSearchParams(location.search).get("id");
let app=document.getElementById("app");
if(window.courseEnrollTimer){
clearTimeout(window.courseEnrollTimer);
window.courseEnrollTimer=null;
}

if(!id){
app.innerHTML=`<section class="learning-page"><div class="learning-article-main"><h2>Course not found</h2><p>Please choose a course from the catalog.</p><div class="learning-actions"><button class="enquiry" onclick="go('/courses')">Back to Catalog</button></div></div></section>`;
return;
}

try{
let r=await api("/courses/"+id);
if(!r.ok) throw new Error("Unable to load course details.");
let c=await r.json();

let faqs=parseCourseFaqs(c.faqContent);
let blogs=[];
try{
blogs=await getBlogs();
}catch(e){
blogs=[];
}
blogs=Array.isArray(blogs)?blogs:[];

let normalizedCourseTopic=normalizeCourseTopic(c.title);
let latestBlog=blogs
    .filter(blog=>{
        let categoryTopic=normalizeCourseTopic(blog.category);
        let blogTopic=normalizeCourseTopic(`${blog.title} ${blog.summary}`);
        return categoryTopic&&(
            categoryTopic.includes(normalizedCourseTopic)||
            normalizedCourseTopic.includes(categoryTopic)||
            blogTopic.includes(normalizedCourseTopic)
        );
    })
    .sort((a,b)=>new Date(b.createdAt||0)-new Date(a.createdAt||0))[0];

app.innerHTML=`
<section class="learning-page">
<section class="learning-hero course-program-hero">
<div class="learning-copy">
<span class="section-eyebrow">Executive Program</span>
<h1 id="courseEnrollTitle">${c.title}</h1>
<p>${c.description}</p>
<div class="learning-cta-row">
<button class="nav-link-btn learning-secondary" type="button" onclick="scrollToCourseReadme()">Read Me</button>
<button class="enquiry" type="button" onclick="openCourseEnrollModal()">Enroll for the Program</button>
<button class="nav-link-btn learning-secondary" type="button" onclick="go('/enquiry?courseId=${c.id}')">Talk to an Advisor</button>
</div>
</div>
<aside class="learning-sidebar">
<div class="learning-side-card">
<h3>Course summary</h3>
<p>${c.description}</p>
</div>
<div class="learning-side-card">
<h3>Program focus</h3>
<div class="learning-tag-row">
<span class="learning-tag">Practical knowledge</span>
<span class="learning-tag">Hands-on approach</span>
<span class="learning-tag">Career aligned</span>
<span class="learning-tag">Mentor guided</span>
</div>
</div>
</aside>
</section>

<section class="learning-grid course-program-grid">
<article class="learning-card">
<h2>Why this toolchain matters</h2>
<div class="course-rich-copy">${formatCourseParagraphs(c.whyLearn)}</div>
</article>
<article class="learning-card">
<h2>About this toolchain</h2>
<div class="course-rich-copy">${formatCourseParagraphs(c.toolchainOverview)}</div>
</article>
<article class="learning-card">
<h2>Course snapshot</h2>
<ul class="learning-list">
<li>Detailed admin-managed course content for this specific program.</li>
<li>Practical context around tools, workflows, and delivery patterns.</li>
<li>Guided next steps through FAQs, related blogs, and enrollment support.</li>
</ul>
</article>
</section>

<section id="courseReadmeSection" class="learning-article course-program-article">
<article class="learning-article-main">
<h2>Read Me</h2>
<div class="course-readme-block">${formatReadmeContent(c.readmeContent||c.toolchainOverview)}</div>
</article>
<aside class="learning-article-aside">
<div class="learning-side-card">
<h3>Full curriculum</h3>
<p>This section shows the complete trainer-managed curriculum, including daily modules, labs, assignments, architecture flow, and enterprise practices.</p>
</div>
</aside>
</section>

<section class="learning-article course-program-article">
<article class="learning-article-main">
<h2>About this course</h2>
<div class="course-rich-copy">${formatCourseParagraphs(c.toolchainOverview)}</div>
<div class="learning-actions">
<button class="enquiry" type="button" onclick="openCourseEnrollModal()">Request Enrollment</button>
<button class="nav-link-btn learning-secondary" type="button" onclick="go('/courses')">Explore More Courses</button>
</div>
</article>
<aside class="learning-article-aside">
<div class="learning-side-card">
<h3>Latest related blog post</h3>
${latestBlog?`<p><strong>${latestBlog.title}</strong></p><p>${latestBlog.summary}</p><button class="enquiry" type="button" onclick="go('/blog?id=${latestBlog.id}')">Read Latest Blog</button>`:`<p>No related blog post is available yet. Publish a blog in the matching topic from the admin panel and it will appear here.</p>`}
</div>
<div class="learning-side-card">
<h3>Popup timing</h3>
<p>The enrollment screen appears automatically after 5 seconds, and you can also open it any time using the enroll buttons on this page.</p>
</div>
</aside>
</section>

<section class="learning-grid course-faq-grid">
<article class="learning-card course-faq-card">
<h2>FAQ</h2>
<div class="course-faq-list">
${faqs.length?faqs.map(item=>`<div class="course-faq-item"><h3>${item.question}</h3><p>${item.answer}</p></div>`).join(""):`<p>No FAQs added for this course yet.</p>`}
</div>
</article>
</section>

<div id="courseEnrollModal" class="course-enroll-modal" onclick="if(event.target===this) closeCourseEnrollModal()">
<div class="course-enroll-dialog">
<button class="signup-close" type="button" onclick="closeCourseEnrollModal()">Close</button>
<span class="section-eyebrow">Enroll for the Program</span>
<h2>Start your enrollment request</h2>
<p class="signup-subcopy">Share your details and our team will help you with the next steps for <strong>${c.title}</strong>.</p>
<form class="course-form course-enroll-form" onsubmit="event.preventDefault(); submitCourseEnrollForm(${c.id});">
<label for="courseEnrollName">Full Name</label>
<input id="courseEnrollName" placeholder="Enter your full name">
<label for="courseEnrollEmail">Email Address</label>
<input id="courseEnrollEmail" type="email" placeholder="Enter your email address">
<label for="courseEnrollPhone">Phone Number</label>
<div class="phone-row">
<select id="courseEnrollCountryCode" aria-label="Country code">
<option value="+91">India (+91)</option>
<option value="+1">USA (+1)</option>
<option value="+44">UK (+44)</option>
<option value="+61">Australia (+61)</option>
<option value="+971">UAE (+971)</option>
</select>
<input id="courseEnrollPhone" type="tel" placeholder="Enter your phone number">
</div>
<button id="courseEnrollSubmit" class="enquiry" type="submit">Enroll Now</button>
<p id="courseEnrollFeedback" class="form-feedback"></p>
</form>
</div>
</div>
</section>`;

window.courseEnrollTimer=setTimeout(openCourseEnrollModal,5000);
}catch(e){
app.innerHTML=`<section class="learning-page"><div class="learning-article-main"><h2>Unable to load this course</h2><p>Please try again in a moment or return to the catalog.</p><div class="learning-actions"><button class="enquiry" onclick="go('/courses')">Back to Catalog</button></div></div></section>`;
}
}
