function resetAdminCourseForm(){
window.adminEditingCourseId=null;
let title=document.getElementById("adminCourseTitle");
let description=document.getElementById("adminCourseDescription");
let price=document.getElementById("adminCoursePrice");
let whyLearn=document.getElementById("adminCourseWhyLearn");
let toolchainOverview=document.getElementById("adminCourseToolchainOverview");
let faqContent=document.getElementById("adminCourseFaqContent");
let submit=document.getElementById("adminCourseSubmit");
let cancel=document.getElementById("adminCourseCancel");
let heading=document.getElementById("adminCourseFormHeading");
let intro=document.getElementById("adminCourseFormIntro");
let feedback=document.getElementById("adminCourseFeedback");

if(title) title.value="";
if(description) description.value="";
if(price) price.value="";
if(whyLearn) whyLearn.value="";
if(toolchainOverview) toolchainOverview.value="";
if(faqContent) faqContent.value="";
if(submit) submit.textContent="Add Course";
if(cancel) cancel.hidden=true;
if(heading) heading.textContent="Add or update course content";
if(intro) intro.textContent="Create a course or edit an existing one. These fields control the public course detail page sections, including why learn, toolchain overview, and FAQs.";
if(feedback){
feedback.textContent="";
feedback.className="form-feedback";
}
}

function startEditCourse(course){
window.adminEditingCourseId=course.id;
let title=document.getElementById("adminCourseTitle");
let description=document.getElementById("adminCourseDescription");
let price=document.getElementById("adminCoursePrice");
let whyLearn=document.getElementById("adminCourseWhyLearn");
let toolchainOverview=document.getElementById("adminCourseToolchainOverview");
let faqContent=document.getElementById("adminCourseFaqContent");
let submit=document.getElementById("adminCourseSubmit");
let cancel=document.getElementById("adminCourseCancel");
let heading=document.getElementById("adminCourseFormHeading");
let intro=document.getElementById("adminCourseFormIntro");

if(title) title.value=course.title||"";
if(description) description.value=course.description||"";
if(price) price.value=course.price||0;
if(whyLearn) whyLearn.value=course.whyLearn||"";
if(toolchainOverview) toolchainOverview.value=course.toolchainOverview||"";
if(faqContent) faqContent.value=course.faqContent||"";
if(submit) submit.textContent="Save Changes";
if(cancel) cancel.hidden=false;
if(heading) heading.textContent="Edit course content";
if(intro) intro.textContent="Update this course and its public long-form sections. Use the FAQ field with one question, then one answer, separated by blank lines.";
window.scrollTo({top:0,behavior:"smooth"});
}

function startEditCourseById(id){
let course=(window.adminCourseCache||[]).find(item=>item.id===id);
if(course) startEditCourse(course);
}

async function adminCourses(){
if(!isAdminLoggedIn()){
go("/login");
return;
}

let app=document.getElementById("app");
app.innerHTML=`
<section class="form-page">
<div class="form-shell admin-shell admin-course-editor-shell">
<div class="form-intro">
<span class="section-eyebrow">Admin Panel</span>
<h2>Manage course content</h2>
<p>Edit the public course cards and the detailed course page sections from one place.</p>
<div class="admin-page-links">
<button class="nav-link-btn admin-page-link" type="button" onclick="go('/admin/blogs')">Manage Blogs</button>
<button class="nav-link-btn admin-page-link" type="button" onclick="go('/courses')">View Public Courses</button>
</div>
</div>
<form class="course-form" onsubmit="event.preventDefault(); submitAdminCourseForm();">
<h3 id="adminCourseFormHeading">Add or update course content</h3>
<p id="adminCourseFormIntro" class="form-copy">Create a course or edit an existing one. These fields control the public course detail page sections, including why learn, toolchain overview, and FAQs.</p>
<label for="adminCourseTitle">Course Title</label>
<input id="adminCourseTitle" placeholder="Enter the course name">
<label for="adminCourseDescription">Course Description</label>
<textarea id="adminCourseDescription" rows="5" placeholder="Short overview shown on cards and in the hero section"></textarea>
<label for="adminCoursePrice">Course Price</label>
<input id="adminCoursePrice" type="number" min="0" step="1" placeholder="Enter the price in INR">
<label for="adminCourseWhyLearn">Why Learn This Course</label>
<textarea id="adminCourseWhyLearn" rows="5" placeholder="Explain why this course matters and what value learners get"></textarea>
<label for="adminCourseToolchainOverview">About This Toolchain</label>
<textarea id="adminCourseToolchainOverview" rows="7" placeholder="Describe the tools, workflow, and practical context for this course"></textarea>
<label for="adminCourseFaqContent">FAQ Content</label>
<textarea id="adminCourseFaqContent" rows="8" placeholder="Example:\nWhat will I learn?\nYou will learn...\n\nWho is this for?\nThis course is for..."></textarea>
<div class="admin-form-actions">
<button id="adminCourseSubmit" type="submit" class="signup-btn">Add Course</button>
<button id="adminCourseCancel" type="button" class="nav-link-btn admin-page-link" onclick="resetAdminCourseForm()" hidden>Cancel Edit</button>
</div>
<p id="adminCourseFeedback" class="form-feedback"></p>
</form>
<div class="admin-course-list">
<div class="admin-course-list-head">
<h3>Available Courses</h3>
<button class="nav-link-btn" onclick="adminCourses()">Refresh</button>
</div>
<div id="adminCourseListBody" class="admin-course-items">Loading courses...</div>
</div>
</div>
</section>`;

resetAdminCourseForm();
await renderAdminCourseList();
}

async function renderAdminCourseList(){
let container=document.getElementById("adminCourseListBody");
if(!container) return;
try{
let courses=await getCourses();
courses=Array.isArray(courses)?courses:[];
courses.sort((a,b)=>(a.title||"").localeCompare(b.title||""));
window.adminCourseCache=courses;
container.innerHTML=courses.length
?courses.map(c=>`<article class="admin-course-item"><strong>${c.title}</strong><span>${typeof c.price==="number"&&c.price>0?`Rs ${c.price.toLocaleString("en-IN")}`:"Contact for pricing"}</span><p>${c.description}</p><div class="admin-item-actions"><button class="nav-link-btn admin-page-link" type="button" onclick="go('/course?id=${c.id}')">Preview</button><button class="nav-link-btn admin-page-link" type="button" onclick="startEditCourseById(${c.id})">Edit</button></div></article>`).join("")
:`<p class="empty-admin-note">No courses available yet.</p>`;
}catch(e){
container.innerHTML=`<p class="empty-admin-note">Unable to load courses right now.</p>`;
}
}

async function submitAdminCourseForm(){
let title=document.getElementById("adminCourseTitle");
let description=document.getElementById("adminCourseDescription");
let price=document.getElementById("adminCoursePrice");
let whyLearn=document.getElementById("adminCourseWhyLearn");
let toolchainOverview=document.getElementById("adminCourseToolchainOverview");
let faqContent=document.getElementById("adminCourseFaqContent");
let feedback=document.getElementById("adminCourseFeedback");
let submit=document.getElementById("adminCourseSubmit");
if(!title||!description||!price||!whyLearn||!toolchainOverview||!faqContent||!feedback||!submit) return;

if(!title.value.trim()||!description.value.trim()||!whyLearn.value.trim()||!toolchainOverview.value.trim()||!faqContent.value.trim()){
feedback.textContent="Title, description, why learn, toolchain overview, and FAQ content are required.";
feedback.className="form-feedback error";
return;
}

if(price.value&&Number(price.value)<0){
feedback.textContent="Price cannot be negative.";
feedback.className="form-feedback error";
return;
}

submit.disabled=true;
submit.textContent="Saving...";
feedback.textContent="";
feedback.className="form-feedback";

let payload={
title:title.value.trim(),
description:description.value.trim(),
price:price.value?Number(price.value):0,
whyLearn:whyLearn.value.trim(),
toolchainOverview:toolchainOverview.value.trim(),
faqContent:faqContent.value.trim()
};

try{
let result=window.adminEditingCourseId
?await updateCourse(window.adminEditingCourseId,payload)
:await createCourse(payload);
let successText=window.adminEditingCourseId?`${result.title} updated successfully.`:`${result.title} added successfully.`;
resetAdminCourseForm();
feedback=document.getElementById("adminCourseFeedback");
if(feedback){
feedback.textContent=successText;
feedback.className="form-feedback success";
}
await renderAdminCourseList();
await renderNavbar();
}catch(err){
let text=err&&err.message?err.message:"Unable to save the course right now.";
if(err&&err.errors){
let firstKey=Object.keys(err.errors)[0];
if(firstKey) text=err.errors[firstKey];
}
feedback.textContent=text;
feedback.className="form-feedback error";
if(err&&((err.message==="Invalid admin session")||(err.message==="Admin login required"))){
logoutAdmin();
await renderNavbar();
go("/login");
}
}finally{
submit.disabled=false;
submit.textContent=window.adminEditingCourseId?"Save Changes":"Add Course";
}
}
