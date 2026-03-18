async function adminCourses(){
if(!isAdminLoggedIn()){
go("/login");
return;
}

let app=document.getElementById("app");
app.innerHTML=`
<section class="form-page">
<div class="form-shell admin-shell">
<div class="form-intro">
<span class="section-eyebrow">Admin Panel</span>
<h2>Add a new course</h2>
<p>Create a course with title and description. Newly added courses will immediately appear in the course enquiry form and catalog.</p>
</div>
<form class="course-form" onsubmit="event.preventDefault(); submitAdminCourseForm();">
<label for="adminCourseTitle">Course Title</label>
<input id="adminCourseTitle" placeholder="Enter the course name">
<label for="adminCourseDescription">Course Description</label>
<textarea id="adminCourseDescription" rows="6" placeholder="Add details about the course"></textarea>
<button id="adminCourseSubmit" type="submit" class="signup-btn">Add Course</button>
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

await renderAdminCourseList();
}

async function renderAdminCourseList(){
let container=document.getElementById("adminCourseListBody");
if(!container) return;
try{
let courses=await getCourses();
container.innerHTML=courses.length
?courses.map(c=>`<article class="admin-course-item"><strong>${c.title}</strong><p>${c.description}</p></article>`).join("")
:`<p class="empty-admin-note">No courses available yet.</p>`;
}catch(e){
container.innerHTML=`<p class="empty-admin-note">Unable to load courses right now.</p>`;
}
}

async function submitAdminCourseForm(){
let title=document.getElementById("adminCourseTitle");
let description=document.getElementById("adminCourseDescription");
let feedback=document.getElementById("adminCourseFeedback");
let submit=document.getElementById("adminCourseSubmit");
if(!title||!description||!feedback||!submit) return;

if(!title.value.trim()||!description.value.trim()){
feedback.textContent="Title and description are required.";
feedback.className="form-feedback error";
return;
}

submit.disabled=true;
submit.textContent="Saving...";
feedback.textContent="";
feedback.className="form-feedback";

try{
let result=await createCourse({
title:title.value.trim(),
description:description.value.trim()
});
feedback.textContent=`${result.title} added successfully.`;
feedback.className="form-feedback success";
title.value="";
description.value="";
await renderAdminCourseList();
await renderNavbar();
}catch(err){
let text=err&&err.message?err.message:"Unable to add the course right now.";
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
submit.textContent="Add Course";
}
}
