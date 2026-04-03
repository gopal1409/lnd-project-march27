window.adminEditingBlogId=null;
window.adminBlogCache=[];

function resetAdminBlogForm(){
let title=document.getElementById("adminBlogTitle");
let category=document.getElementById("adminBlogCategory");
let author=document.getElementById("adminBlogAuthor");
let coverImage=document.getElementById("adminBlogCoverImage");
let summary=document.getElementById("adminBlogSummary");
let content=document.getElementById("adminBlogContent");
let submit=document.getElementById("adminBlogSubmit");
let cancel=document.getElementById("adminBlogCancel");
let feedback=document.getElementById("adminBlogFeedback");
window.adminEditingBlogId=null;
if(title) title.value="";
if(category) category.value="";
if(author) author.value="";
if(coverImage) coverImage.value="";
if(summary) summary.value="";
if(content) content.value="";
if(submit) submit.textContent="Publish Blog";
if(cancel) cancel.hidden=true;
if(feedback){
feedback.textContent="";
feedback.className="form-feedback";
}
}

function startEditBlog(blog){
let title=document.getElementById("adminBlogTitle");
let category=document.getElementById("adminBlogCategory");
let author=document.getElementById("adminBlogAuthor");
let coverImage=document.getElementById("adminBlogCoverImage");
let summary=document.getElementById("adminBlogSummary");
let content=document.getElementById("adminBlogContent");
let submit=document.getElementById("adminBlogSubmit");
let cancel=document.getElementById("adminBlogCancel");
if(!title||!category||!author||!coverImage||!summary||!content||!submit||!cancel) return;
window.adminEditingBlogId=blog.id;
title.value=blog.title||"";
category.value=blog.category||"";
author.value=blog.authorName||"";
coverImage.value=blog.coverImageUrl||"";
summary.value=blog.summary||"";
content.value=blog.content||"";
submit.textContent="Save Changes";
cancel.hidden=false;
window.scrollTo({top:0,behavior:"smooth"});
}

function startEditBlogById(id){
let blog=window.adminBlogCache.find(item=>item.id===id);
if(blog) startEditBlog(blog);
}

async function removeBlog(id){
if(!confirm("Delete this blog?")) return;
let feedback=document.getElementById("adminBlogFeedback");
try{
await deleteBlog(id);
if(window.adminEditingBlogId===id) resetAdminBlogForm();
if(feedback){
feedback.textContent="Blog deleted successfully.";
feedback.className="form-feedback success";
}
await renderAdminBlogList();
}catch(err){
let text=err&&err.message?err.message:"Unable to delete the blog right now.";
if(feedback){
feedback.textContent=text;
feedback.className="form-feedback error";
}
}
}

async function adminBlogs(){
if(!isAdminLoggedIn()){
go("/login");
return;
}

let app=document.getElementById("app");
app.innerHTML=`
<section class="form-page">
<div class="form-shell admin-shell blog-admin-shell">
<div class="form-intro">
<span class="section-eyebrow">Admin Blog Studio</span>
<h2>Write and manage blog posts</h2>
<p>Create backend-powered articles with a cover image, category, summary, and long-form content. You can also edit or delete published blogs from the list.</p>
<div class="admin-page-links">
<button class="nav-link-btn admin-page-link" type="button" onclick="go('/admin/courses')">Manage Courses</button>
<button class="nav-link-btn admin-page-link" type="button" onclick="go('/blogs')">View Public Blogs</button>
</div>
</div>
<form class="course-form blog-form" onsubmit="event.preventDefault(); submitAdminBlogForm();">
<label for="adminBlogTitle">Blog Title</label>
<input id="adminBlogTitle" placeholder="Enter a compelling blog title">
<label for="adminBlogCategory">Category</label>
<input id="adminBlogCategory" placeholder="Example: Platform Engineering">
<label for="adminBlogAuthor">Author Name</label>
<input id="adminBlogAuthor" placeholder="Example: LearnSphere Editorial">
<label for="adminBlogCoverImage">Cover Image URL</label>
<input id="adminBlogCoverImage" placeholder="https://example.com/cover-image.jpg">
<label for="adminBlogSummary">Summary</label>
<textarea id="adminBlogSummary" rows="3" placeholder="Write a short summary for the card and hero section"></textarea>
<label for="adminBlogContent">Article Content</label>
<textarea id="adminBlogContent" rows="12" placeholder="Write the article body. Use blank lines to separate paragraphs."></textarea>
<div class="admin-form-actions">
<button id="adminBlogSubmit" type="submit" class="signup-btn">Publish Blog</button>
<button id="adminBlogCancel" type="button" class="nav-link-btn admin-page-link" onclick="resetAdminBlogForm()" hidden>Cancel Edit</button>
</div>
<p id="adminBlogFeedback" class="form-feedback"></p>
</form>
<div class="admin-course-list">
<div class="admin-course-list-head">
<h3>Published Blogs</h3>
<button class="nav-link-btn" onclick="adminBlogs()">Refresh</button>
</div>
<div id="adminBlogListBody" class="admin-course-items">Loading blogs...</div>
</div>
</div>
</section>`;

await renderAdminBlogList();
}

async function renderAdminBlogList(){
let container=document.getElementById("adminBlogListBody");
if(!container) return;
try{
let blogs=await getBlogs();
blogs=Array.isArray(blogs)?blogs:[];
window.adminBlogCache=blogs;
container.innerHTML=blogs.length
?blogs.map(blog=>`<article class="admin-course-item"><strong>${blog.title}</strong><span>${blog.category} · ${formatBlogDate(blog.createdAt)}</span><p>${blog.summary}</p><div class="admin-item-actions"><button class="nav-link-btn admin-page-link" type="button" onclick="startEditBlogById(${blog.id})">Edit</button><button class="nav-link-btn admin-delete-link" type="button" onclick="removeBlog(${blog.id})">Delete</button></div></article>`).join("")
:`<p class="empty-admin-note">No blogs published yet.</p>`;
}catch(e){
window.adminBlogCache=[];
container.innerHTML=`<p class="empty-admin-note">Unable to load blogs right now.</p>`;
}
}

async function submitAdminBlogForm(){
let title=document.getElementById("adminBlogTitle");
let category=document.getElementById("adminBlogCategory");
let author=document.getElementById("adminBlogAuthor");
let coverImage=document.getElementById("adminBlogCoverImage");
let summary=document.getElementById("adminBlogSummary");
let content=document.getElementById("adminBlogContent");
let feedback=document.getElementById("adminBlogFeedback");
let submit=document.getElementById("adminBlogSubmit");
if(!title||!category||!author||!coverImage||!summary||!content||!feedback||!submit) return;

if(!title.value.trim()||!category.value.trim()||!author.value.trim()||!summary.value.trim()||!content.value.trim()){
feedback.textContent="Title, category, author, summary, and content are required.";
feedback.className="form-feedback error";
return;
}

let payload={
title:title.value.trim(),
summary:summary.value.trim(),
content:content.value.trim(),
category:category.value.trim(),
authorName:author.value.trim(),
coverImageUrl:coverImage.value.trim()
};

submit.disabled=true;
submit.textContent=window.adminEditingBlogId?"Saving...":"Publishing...";
feedback.textContent="";
feedback.className="form-feedback";

try{
let wasEditing=!!window.adminEditingBlogId;
let result=window.adminEditingBlogId
?await updateBlog(window.adminEditingBlogId,payload)
:await createBlog(payload);
resetAdminBlogForm();
feedback.textContent=wasEditing?`${result.title} updated successfully.`:`${result.title} published successfully.`;
feedback.className="form-feedback success";
await renderAdminBlogList();
}catch(err){
let text=err&&err.message?err.message:"Unable to save the blog right now.";
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
submit.textContent=window.adminEditingBlogId?"Save Changes":"Publish Blog";
}
}
