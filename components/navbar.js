function toggleCategories(){
let menu=document.getElementById("categoriesMenu");
if(menu) menu.classList.toggle("open");
}

function toggleResources(){
let menu=document.getElementById("resourcesMenu");
if(menu) menu.classList.toggle("open");
}

function openSignupModal(){
let modal=document.getElementById("signupModal");
if(modal) modal.classList.add("open");
closeCategories();
closeResources();
}

function closeSignupModal(){
let modal=document.getElementById("signupModal");
if(modal) modal.classList.remove("open");
let form=document.getElementById("signupForm");
if(form) form.reset();
let feedback=document.getElementById("signupFeedback");
if(feedback){
feedback.textContent="";
feedback.className="signup-feedback";
}
}

function closeCategories(){
let menu=document.getElementById("categoriesMenu");
if(menu) menu.classList.remove("open");
}

function closeResources(){
let menu=document.getElementById("resourcesMenu");
if(menu) menu.classList.remove("open");
}

function submitCourseSearch(){
let input=document.getElementById("navCourseSearch");
let query=input?input.value.trim():"";
go(query?`/courses?q=${encodeURIComponent(query)}`:"/courses");
closeCategories();
closeResources();
}

async function submitSignupLead(){
let email=document.getElementById("signupEmail");
let phone=document.getElementById("signupPhone");
let feedback=document.getElementById("signupFeedback");
let submit=document.getElementById("signupSubmit");
if(!email||!phone||!feedback||!submit) return;

let emailValue=email.value.trim();
let phoneValue=phone.value.trim();
if(!emailValue||!phoneValue){
feedback.textContent="Email ID and phone number are required.";
feedback.className="signup-feedback error";
return;
}

submit.disabled=true;
submit.textContent="Submitting...";
feedback.textContent="";
feedback.className="signup-feedback";

try{
let result=await createSignupLead({email:emailValue,phoneNumber:phoneValue});
feedback.textContent=result.message||"Signup completed successfully.";
feedback.className="signup-feedback success";
setTimeout(closeSignupModal,1200);
}catch(err){
let message=err&&err.message?err.message:"Unable to submit your details right now.";
if(err&&err.errors){
let firstKey=Object.keys(err.errors)[0];
if(firstKey) message=err.errors[firstKey];
}
feedback.textContent=message;
feedback.className="signup-feedback error";
}finally{
submit.disabled=false;
submit.textContent="Continue";
}
}

async function renderNavbar(){
document.getElementById("navbar").innerHTML=`
<nav class="nav">
<div class="logo" onclick="go('/')">LearnSphere</div>
<div class="nav-tools">
<div class="nav-search">
<input id="navCourseSearch" type="text" placeholder="Search courses, tools, cloud platforms..." onkeydown="if(event.key==='Enter') submitCourseSearch()">
<button class="nav-search-btn" onclick="submitCourseSearch()">Search</button>
</div>
<div class="categories-wrap">
<button class="categories-btn" onclick="toggleCategories()">Categories</button>
<div id="categoriesMenu" class="categories-menu">
<div class="categories-title">All Courses</div>
<div id="categoriesList" class="categories-list">
<button class="category-item" onclick="go('/courses')">Browse all courses</button>
</div>
</div>
</div>
<button class="nav-link-btn" onclick="go('/courses')">All Courses</button>
<button class="nav-link-btn" onclick="go('/enquiry')">Corporate Training</button>
<div class="resources-wrap">
<button class="nav-link-btn" onclick="toggleResources()">Resources</button>
<div id="resourcesMenu" class="resources-menu">
<button class="resource-item" onclick="go('/courses?q=webinar')">Webinar</button>
<button class="resource-item" onclick="go('/courses?q=blogs')">Blogs</button>
<button class="resource-item" onclick="go('/courses?q=community')">Community</button>
</div>
</div>
<button onclick="go('/login')">Login</button>
<button class="enquiry" onclick="go('/enquiry')">ENQUIRE</button>
<button class="signup-btn" onclick="openSignupModal()">Sign Up</button>
</div>
</nav>`;

let list=document.getElementById("categoriesList");
if(!list) return;
try{
let courses=await getCourses();
if(courses.length){
list.innerHTML=`<button class="category-item" onclick="go('/courses')">Browse all courses</button>`+
courses.map(c=>`<button class="category-item" onclick="go('/course?id=${c.id}')">${c.title}</button>`).join("");
}
}catch(e){
list.innerHTML=`<button class="category-item" onclick="go('/courses')">Browse all courses</button>
<div class="category-empty">Unable to load courses right now</div>`;
}
}

document.addEventListener("click",function(e){
let wrap=document.querySelector(".categories-wrap");
if(wrap&&!wrap.contains(e.target)) closeCategories();
let resourceWrap=document.querySelector(".resources-wrap");
if(resourceWrap&&!resourceWrap.contains(e.target)) closeResources();
let modal=document.getElementById("signupModal");
if(modal&&e.target===modal) closeSignupModal();
});

renderNavbar();

if(!document.getElementById("signupModal")){
document.body.insertAdjacentHTML("beforeend",`
<div id="signupModal" class="signup-modal">
<div class="signup-dialog">
<button class="signup-close" onclick="closeSignupModal()">Close</button>
<h2>Sign In</h2>
<p class="signup-subcopy">Enter your details to continue learning with LearnSphere.</p>
<form id="signupForm" class="signup-form" onsubmit="event.preventDefault(); submitSignupLead();">
<label>Email ID</label>
<input id="signupEmail" type="email" placeholder="Enter your email address">
<label>Phone Number</label>
<input id="signupPhone" type="tel" placeholder="Enter your phone number">
<button id="signupSubmit" type="submit" class="signup-submit">Continue</button>
</form>
<p id="signupFeedback" class="signup-feedback"></p>
<p class="signup-disclaimer">This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</p>
<p class="signup-note">Please Note : By continuing and signing in, you agree to dxbterm Terms & Conditions and Privacy Policy.</p>
</div>
</div>`);
}
