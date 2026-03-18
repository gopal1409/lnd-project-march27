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
let outcomes=[
"Build practical job-ready skills through guided hands-on exercises.",
"Understand how the tools are used in real delivery teams and projects.",
"Work through workflows, use cases, and implementation patterns step by step."
];
let curriculum=[
"Program overview and business context",
"Core concepts explained in simple practical terms",
"Tooling, workflows, and implementation walkthroughs",
"Hands-on exercises and portfolio-style practice",
"Career support, use cases, and next-step guidance"
];
let projects=[
"Mini implementation labs that simulate real project scenarios",
"Case-study style exercises to apply concepts with confidence",
"Structured assignments that help you convert theory into execution"
];

app.innerHTML=`
<section class="learning-page">
<section class="learning-hero course-program-hero">
<div class="learning-copy">
<span class="section-eyebrow">Executive Program</span>
<h1 id="courseEnrollTitle">${c.title}</h1>
<p>${c.description}</p>
<div class="learning-cta-row">
<button class="enquiry" type="button" onclick="openCourseEnrollModal()">Enroll for the Program</button>
<button class="nav-link-btn learning-secondary" type="button" onclick="go('/enquiry?courseId=${c.id}')">Talk to an Advisor</button>
</div>
</div>
<aside class="learning-sidebar">
<div class="learning-side-card">
<h3>What you will get</h3>
<p>An article-style learning overview with practical depth, implementation context, and a guided path toward enrolling in the full program.</p>
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
<h2>Why this program stands out</h2>
<ul class="learning-list">${outcomes.map(item=>`<li>${item}</li>`).join("")}</ul>
</article>
<article class="learning-card">
<h2>How the journey is structured</h2>
<ul class="learning-list">${curriculum.map(item=>`<li>${item}</li>`).join("")}</ul>
</article>
<article class="learning-card">
<h2>What you will practice</h2>
<ul class="learning-list">${projects.map(item=>`<li>${item}</li>`).join("")}</ul>
</article>
</section>

<section class="learning-article course-program-article">
<article class="learning-article-main">
<h2>Strong article with practical knowledge</h2>
<p>This course page is designed more like a program article than a short catalog card. Instead of only showing a title and a description, it gives learners a clearer picture of how the knowledge translates into practical work, project execution, and career-ready capability.</p>
<p>You should expect a guided experience that starts with fundamentals, connects them to business or technical use cases, and then moves into real workflows. That means learning not just what something is, but how teams actually use it, where mistakes usually happen, and what good execution looks like in practice.</p>
<p>The goal is to help learners make a better decision before enrolling. After a short delay, the page invites them to take the next step with a lightweight enrollment popup so interest turns into an actual enquiry without interrupting the initial reading experience too early.</p>
<div class="learning-actions">
<button class="enquiry" type="button" onclick="openCourseEnrollModal()">Request Enrollment</button>
<button class="nav-link-btn learning-secondary" type="button" onclick="go('/courses')">Explore More Courses</button>
</div>
</article>
<aside class="learning-article-aside">
<div class="learning-side-card">
<h3>Best for</h3>
<p>Learners who want a structured path, practical examples, and direct support while evaluating the right program.</p>
</div>
<div class="learning-side-card">
<h3>Popup timing</h3>
<p>The enrollment screen appears automatically after 5 seconds, and you can also open it any time using the enroll buttons on this page.</p>
</div>
</aside>
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
