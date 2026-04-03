async function enquiry(){
let app=document.getElementById("app");
app.innerHTML=`
<section class="form-page">
<div class="corporate-page">
<section class="corporate-hero">
<div class="corporate-copy">
<span class="section-eyebrow">Corporate Training</span>
<h1>Build stronger teams with structured corporate training</h1>
<p>Support onboarding, upskilling, compliance, leadership development, and role-based capability building with a program designed around your organization.</p>
<div class="corporate-metrics">
<div class="metric-pill"><strong>500+</strong><span>Learners trained</span></div>
<div class="metric-pill"><strong>40+</strong><span>Team workshops</span></div>
<div class="metric-pill"><strong>Custom</strong><span>Role-based paths</span></div>
</div>
<div class="corporate-actions">
<button class="enquiry" type="button" onclick="document.getElementById('corporateTrainingForm').scrollIntoView({behavior:'smooth'})">Request Demo</button>
<button class="nav-link-btn corporate-secondary" type="button" onclick="go('/courses')">Browse Courses</button>
</div>
</div>
<div class="corporate-highlight">
<h3>What corporate training helps with</h3>
<ul>
<li>Role-based skill development for technical and non-technical teams</li>
<li>Onboarding and orientation for faster ramp-up</li>
<li>Compliance and policy training across distributed teams</li>
<li>Leadership and workplace skill development for future managers</li>
</ul>
</div>
</section>

<section class="trust-strip">
<span class="trust-label">Trusted Learning Partners</span>
<div class="logo-row">
<div class="logo-chip">CloudOps</div>
<div class="logo-chip">FinEdge</div>
<div class="logo-chip">HealthStack</div>
<div class="logo-chip">RetailGrid</div>
<div class="logo-chip">DataForge</div>
</div>
</section>

<section class="corporate-grid">
<article class="corporate-card">
<h3>What Is Corporate Training?</h3>
<p>Corporate training is a structured way to improve employee knowledge, job readiness, and workplace performance. It usually combines practical learning, guided instruction, and measurable outcomes tied to business goals.</p>
</article>
<article class="corporate-card">
<h3>Who Uses It?</h3>
<p>Organizations in technology, health care, finance, retail, manufacturing, and services use corporate training to keep teams current with changing tools, regulations, and customer expectations.</p>
</article>
<article class="corporate-card">
<h3>Common Training Types</h3>
<p>Programs often include skills-based training, workplace skills, compliance training, onboarding, and leadership development based on department needs and growth plans.</p>
</article>
</section>

<section class="corporate-outcomes">
<article class="outcome-card">
<span>Faster onboarding</span>
<strong>30-day ramp plans</strong>
<p>Give new hires a clear technical and process path from day one.</p>
</article>
<article class="outcome-card">
<span>Skill consistency</span>
<strong>Shared team standards</strong>
<p>Align engineering, operations, and support teams on one delivery model.</p>
</article>
<article class="outcome-card">
<span>Leadership growth</span>
<strong>Manager readiness</strong>
<p>Build communication, ownership, and execution habits in future leads.</p>
</article>
</section>

<section class="corporate-columns">
<article class="corporate-panel">
<h3>Why organizations invest in it</h3>
<ul>
<li>Improve employee performance and confidence in day-to-day work</li>
<li>Increase engagement, growth opportunities, and retention</li>
<li>Help teams adapt to new tools, platforms, and regulations</li>
<li>Create more consistent standards across locations and roles</li>
</ul>
</article>
<article class="corporate-panel">
<h3>What to plan for</h3>
<ul>
<li>Time and budget needed for rollout and follow-through</li>
<li>Making sure training matches real job requirements</li>
<li>Keeping delivery consistent across all teams</li>
<li>Tracking learning impact with clear business metrics</li>
</ul>
</article>
</section>

<section class="corporate-steps">
<div class="form-intro">
<span class="section-eyebrow">Getting Started</span>
<h2>How to build a strong corporate training program</h2>
<p>Start with the business outcome, identify skill gaps, choose the right learning format, and measure improvement after delivery.</p>
</div>
<div class="steps-grid">
<article class="step-card"><strong>1</strong><h3>Identify needs</h3><p>Map skills gaps, role expectations, and team priorities.</p></article>
<article class="step-card"><strong>2</strong><h3>Set objectives</h3><p>Define the outcomes employees and managers should achieve.</p></article>
<article class="step-card"><strong>3</strong><h3>Choose formats</h3><p>Mix live sessions, guided practice, and online learning where useful.</p></article>
<article class="step-card"><strong>4</strong><h3>Measure results</h3><p>Track adoption, performance gains, and learner feedback.</p></article>
</div>
</section>

<section class="testimonial-section">
<div class="form-intro">
<span class="section-eyebrow">What Teams Say</span>
<h2>Training that feels practical, not generic</h2>
<p>Programs work best when teams can directly apply the learning to projects, delivery, and internal process improvements.</p>
</div>
<div class="testimonial-grid">
<article class="testimonial-card">
<p>"The sessions helped our platform team standardize Kubernetes deployment practices across projects in just a few weeks."</p>
<strong>Priya S.</strong>
<span>Engineering Manager</span>
</article>
<article class="testimonial-card">
<p>"We used the workshops to onboard new cloud engineers faster and reduce the amount of repeated team mentoring."</p>
<strong>Rahul M.</strong>
<span>Head of Infrastructure</span>
</article>
<article class="testimonial-card">
<p>"The mix of live guidance and hands-on practice made the program useful for both junior and experienced team members."</p>
<strong>Ananya K.</strong>
<span>Learning & Development Lead</span>
</article>
</div>
</section>

<section class="demo-banner">
<div>
<span class="section-eyebrow">Request A Demo</span>
<h2>See how a corporate training plan could look for your team</h2>
<p>Tell us your team size, skill goals, and preferred course areas. We will recommend the right path, format, and rollout approach.</p>
</div>
<button class="enquiry" type="button" onclick="document.getElementById('corporateTrainingForm').scrollIntoView({behavior:'smooth'})">Book A Consultation</button>
</section>

<div class="form-shell">
<div class="form-intro">
<span class="section-eyebrow">Talk To Us</span>
<h2>Plan training for your team</h2>
<p>Choose a course, share your team's needs, and we'll help you shape the right learning path.</p>
</div>
<form id="corporateTrainingForm" class="course-form" onsubmit="event.preventDefault(); submitCourseEnquiryForm();">
<label for="enquiryName">Full Name</label>
<input id="enquiryName" placeholder="Enter your full name">
<label for="enquiryEmail">Email Address</label>
<input id="enquiryEmail" type="email" placeholder="Enter your email address">
<label for="enquiryCompany">Company Name</label>
<input id="enquiryCompany" placeholder="Enter your company name">
<label for="enquiryTeamSize">Team Size</label>
<select id="enquiryTeamSize">
<option value="">Select team size</option>
<option value="1-10">1-10</option>
<option value="11-25">11-25</option>
<option value="26-50">26-50</option>
<option value="51-100">51-100</option>
<option value="100+">100+</option>
</select>
<label for="enquiryTrainingMode">Preferred Training Mode</label>
<select id="enquiryTrainingMode">
<option value="">Select training mode</option>
<option value="Online">Online</option>
<option value="Onsite">Onsite</option>
<option value="Hybrid">Hybrid</option>
</select>
<label for="enquiryCourse">Select Course</label>
<select id="enquiryCourse">
<option value="">Loading courses...</option>
</select>
<label for="enquiryPhone">Phone Number</label>
<div class="phone-row">
<select id="enquiryCountryCode" aria-label="Country code">
<option value="+91">India (+91)</option>
<option value="+1">USA (+1)</option>
<option value="+44">UK (+44)</option>
<option value="+61">Australia (+61)</option>
<option value="+971">UAE (+971)</option>
</select>
<input id="enquiryPhone" type="tel" placeholder="Enter your phone number">
</div>
<label for="enquiryMessage">Message</label>
<textarea id="enquiryMessage" rows="4" placeholder="Tell us what you want to learn"></textarea>
<button id="enquirySubmit" class="enquiry" type="submit">Submit Enquiry</button>
<p id="enquiryFeedback" class="form-feedback"></p>
</form>
</div>
</div>
</section>`;

let select=document.getElementById("enquiryCourse");
let selectedCourseId=new URLSearchParams(location.search).get("courseId")||"";
try{
let courses=await getCourses();
select.innerHTML=`<option value="">Choose a course</option>`+
courses.map(c=>`<option value="${c.id}" ${String(c.id)===selectedCourseId?"selected":""}>${c.title}</option>`).join("");
}catch(e){
select.innerHTML=`<option value="">Unable to load courses</option>`;
}
}

async function submitCourseEnquiryForm(){
let name=document.getElementById("enquiryName");
let email=document.getElementById("enquiryEmail");
let company=document.getElementById("enquiryCompany");
let teamSize=document.getElementById("enquiryTeamSize");
let trainingMode=document.getElementById("enquiryTrainingMode");
let course=document.getElementById("enquiryCourse");
let countryCode=document.getElementById("enquiryCountryCode");
let phone=document.getElementById("enquiryPhone");
let message=document.getElementById("enquiryMessage");
let feedback=document.getElementById("enquiryFeedback");
let submit=document.getElementById("enquirySubmit");
if(!name||!email||!company||!teamSize||!trainingMode||!course||!countryCode||!phone||!message||!feedback||!submit) return;

if(!course.value){
feedback.textContent="Please choose a course.";
feedback.className="form-feedback error";
return;
}

if(!company.value.trim()||!teamSize.value||!trainingMode.value){
feedback.textContent="Company name, team size, and training mode are required.";
feedback.className="form-feedback error";
return;
}

submit.disabled=true;
submit.textContent="Submitting...";
feedback.textContent="";
feedback.className="form-feedback";

try{
let result=await createCourseEnquiry({
name:name.value.trim(),
email:email.value.trim(),
companyName:company.value.trim(),
teamSize:teamSize.value,
preferredTrainingMode:trainingMode.value,
courseId:Number(course.value),
phoneCountryCode:countryCode.value,
phoneNumber:phone.value.trim(),
message:message.value.trim()
});
feedback.textContent=result.message||"Course enquiry submitted successfully.";
feedback.className="form-feedback success";
name.value="";
email.value="";
company.value="";
teamSize.value="";
trainingMode.value="";
phone.value="";
message.value="";
course.value="";
countryCode.value="+91";
}catch(err){
let text=err&&err.message?err.message:"Unable to submit your enquiry right now.";
if(err&&err.errors){
let firstKey=Object.keys(err.errors)[0];
if(firstKey) text=err.errors[firstKey];
}
feedback.textContent=text;
feedback.className="form-feedback error";
}finally{
submit.disabled=false;
submit.textContent="Submit Enquiry";
}
}
