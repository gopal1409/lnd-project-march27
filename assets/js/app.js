function renderFooter(){
let footer=document.getElementById("footer");
if(!footer) return;
footer.innerHTML=`
<footer class="site-footer">
<div class="footer-shell">
<section class="footer-cta">
<div>
<span class="section-eyebrow">LearnSphere</span>
<h2>Build skills with structured learning, practical delivery paths, and expert-led support.</h2>
<p>Explore courses, blogs, architecture tracks, and team training designed for modern DevOps and cloud careers.</p>
</div>
<div class="footer-cta-actions">
<button class="enquiry" type="button" onclick="go('/courses')">Browse Courses</button>
<button class="nav-link-btn footer-secondary" type="button" onclick="go('/enquiry')">Talk to Our Team</button>
</div>
</section>

<section class="footer-links">
<div class="footer-brand">
<div class="footer-logo">LS</div>
<p>LearnSphere helps learners and teams grow across DevOps, cloud platforms, Infrastructure as Code, automation, architecture, and delivery operations.</p>
</div>
<div class="footer-columns">
<div>
<h3>Learning</h3>
<a href="#" onclick="go('/courses');return false;">All Courses</a>
<a href="#" onclick="go('/courses?catalog=categories');return false;">Categories</a>
<a href="#" onclick="go('/blogs');return false;">Blogs</a>
<a href="#" onclick="go('/learn?topic=devsecops-cicd');return false;">Trending Tracks</a>
</div>
<div>
<h3>Solutions</h3>
<a href="#" onclick="go('/enquiry');return false;">Corporate Training</a>
<a href="#" onclick="go('/courses?q=azure devops');return false;">Azure DevOps</a>
<a href="#" onclick="go('/courses?q=terraform');return false;">Terraform</a>
<a href="#" onclick="go('/courses?q=aws');return false;">Cloud Architecture</a>
</div>
<div>
<h3>Company</h3>
<a href="#" onclick="go('/');return false;">About LearnSphere</a>
<a href="#" onclick="go('/blogs');return false;">Resources</a>
<a href="#" onclick="go('/login');return false;">Admin Access</a>
<a href="#" onclick="go('/enquiry');return false;">Contact Us</a>
</div>
<div>
<h3>Popular Topics</h3>
<a href="#" onclick="go('/courses?q=devops');return false;">DevOps</a>
<a href="#" onclick="go('/courses?q=devsecops');return false;">DevSecOps</a>
<a href="#" onclick="go('/courses?q=ansible');return false;">Ansible</a>
<a href="#" onclick="go('/courses?q=google cloud');return false;">Google Cloud</a>
</div>
</div>
</section>

<section class="footer-bottom">
<div class="footer-brand-row">
<span class="footer-mini-logo">LS</span>
<span>LearnSphere</span>
<span>Practical learning for modern engineering teams</span>
</div>
<div class="footer-legal">
<span>Copyright 2026 LearnSphere. All rights reserved.</span>
<a href="#" onclick="go('/blogs');return false;">Privacy</a>
<a href="#" onclick="go('/blogs');return false;">Terms</a>
<a href="#" onclick="go('/blogs');return false;">Support</a>
</div>
</section>
</div>
</footer>`;
}

window.queryPopupTimer=null;
window.queryPopupManuallyMinimized=false;

function ensureQueryPopup(){
if(document.getElementById("queryPopupWidget")) return;
document.body.insertAdjacentHTML("beforeend",`
<aside id="queryPopupWidget" class="query-popup" aria-live="polite">
<button id="queryPopupLauncher" class="query-popup-launcher" type="button" onclick="toggleQueryPopup(true)">
<span>Drop us a query</span>
</button>
<div id="queryPopupPanel" class="query-popup-panel">
<div class="query-popup-header">
<div>
<span class="query-popup-label">Need help?</span>
<h3>Drop us a query below</h3>
</div>
<div class="query-popup-actions">
<button class="query-popup-icon" type="button" onclick="toggleQueryPopup(false)" aria-label="Minimize popup">_</button>
</div>
</div>
<div class="query-popup-body">
<p class="query-popup-phone">+91 9537126262</p>
<p class="query-popup-availability">Available all the time 24x7</p>
<form id="queryPopupForm" class="query-popup-form" onsubmit="event.preventDefault(); submitQueryPopupForm();">
<textarea id="queryPopupMessage" rows="4" placeholder="Type your query here"></textarea>
<div class="query-popup-phone-row">
<select id="queryPopupCountryCode" aria-label="Country code">
<option value="+91">India (+91)</option>
<option value="+1">USA (+1)</option>
<option value="+44">UK (+44)</option>
<option value="+61">Australia (+61)</option>
<option value="+971">UAE (+971)</option>
</select>
<input id="queryPopupPhone" type="tel" placeholder="Phone number">
</div>
<input id="queryPopupEmail" type="email" placeholder="Email ID">
<button id="queryPopupSubmit" class="query-popup-submit" type="submit">Submit</button>
<p id="queryPopupFeedback" class="query-popup-feedback"></p>
</form>
</div>
</div>
</aside>`);
}

function clearQueryPopupFeedback(){
let feedback=document.getElementById("queryPopupFeedback");
if(feedback){
feedback.textContent="";
feedback.className="query-popup-feedback";
}
}

function resetQueryPopupForm(){
let form=document.getElementById("queryPopupForm");
if(form) form.reset();
let countryCode=document.getElementById("queryPopupCountryCode");
if(countryCode) countryCode.value="+91";
clearQueryPopupFeedback();
}

function toggleQueryPopup(openPanel){
let widget=document.getElementById("queryPopupWidget");
if(!widget) return;
widget.classList.toggle("open",!!openPanel);
widget.classList.toggle("minimized",!openPanel);
window.queryPopupManuallyMinimized=!openPanel;
if(openPanel){
clearQueryPopupFeedback();
}
}

function scheduleQueryPopup(){
ensureQueryPopup();
if(window.queryPopupTimer){
clearTimeout(window.queryPopupTimer);
}
window.queryPopupTimer=setTimeout(function(){
if(window.queryPopupManuallyMinimized) return;
toggleQueryPopup(true);
},10000);
}

async function submitQueryPopupForm(){
let message=document.getElementById("queryPopupMessage");
let countryCode=document.getElementById("queryPopupCountryCode");
let phone=document.getElementById("queryPopupPhone");
let email=document.getElementById("queryPopupEmail");
let feedback=document.getElementById("queryPopupFeedback");
let submit=document.getElementById("queryPopupSubmit");
if(!message||!countryCode||!phone||!email||!feedback||!submit) return;

if(!message.value.trim()||!phone.value.trim()||!email.value.trim()){
feedback.textContent="Query, phone number, and email ID are required.";
feedback.className="query-popup-feedback error";
return;
}

submit.disabled=true;
submit.textContent="Submitting...";
clearQueryPopupFeedback();

try{
let popupCourseId=await getPopupCourseId();
let result=await createCourseEnquiry({
name:"Popup Website Query",
email:email.value.trim(),
phoneCountryCode:countryCode.value,
phoneNumber:phone.value.trim(),
companyName:"Website Visitor",
teamSize:"1-10",
preferredTrainingMode:"Online",
courseId:popupCourseId,
message:message.value.trim()
});
feedback.textContent=result.message||"Query submitted successfully.";
feedback.className="query-popup-feedback success";
setTimeout(function(){
resetQueryPopupForm();
toggleQueryPopup(false);
},1500);
}catch(err){
let text=err&&err.message?err.message:"Unable to submit your query right now.";
if(err&&err.errors){
let firstKey=Object.keys(err.errors)[0];
if(firstKey) text=err.errors[firstKey];
}
feedback.textContent=text;
feedback.className="query-popup-feedback error";
}finally{
submit.disabled=false;
submit.textContent="Submit";
}
}

renderFooter();
ensureQueryPopup();
scheduleQueryPopup();
route();
