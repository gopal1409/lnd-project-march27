const API="http://localhost:8080/api";

function getAdminAuthHeader(){
return localStorage.getItem("adminBasicAuth")||"";
}

async function api(url){
return fetch(API+url,{headers:{
"Content-Type":"application/json",
"Authorization":getAdminAuthHeader()}});
}

async function apiPost(url,data){
return fetch(API+url,{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization":getAdminAuthHeader()},
body:JSON.stringify(data)
});
}

async function apiPut(url,data){
return fetch(API+url,{
method:"PUT",
headers:{
"Content-Type":"application/json",
"Authorization":getAdminAuthHeader()},
body:JSON.stringify(data)
});
}

async function apiDelete(url){
return fetch(API+url,{
method:"DELETE",
headers:{
"Content-Type":"application/json",
"Authorization":getAdminAuthHeader()}
});
}

async function getCourses(){
let r=await api("/courses");
return r.json();
}

async function getBlogs(){
let r=await api("/blogs");
return r.json();
}

async function getBlog(id){
let r=await api("/blogs/"+id);
let body=await r.json().catch(()=>({message:"Unexpected response from server"}));
if(!r.ok) throw body;
return body;
}

async function createSignupLead(payload){
let r=await apiPost("/leads/signup",payload);
let body=await r.json().catch(()=>({message:"Unexpected response from server"}));
if(!r.ok) throw body;
return body;
}

async function createCourseEnquiry(payload){
let r=await apiPost("/leads/course-enquiry",payload);
let body=await r.json().catch(()=>({message:"Unexpected response from server"}));
if(!r.ok) throw body;
return body;
}

let cachedPopupCourseId=null;

async function getPopupCourseId(){
if(cachedPopupCourseId!==null) return cachedPopupCourseId;
let courses=await getCourses();
if(!Array.isArray(courses)||!courses.length){
throw {message:"No courses are available right now. Please try again shortly."};
}
cachedPopupCourseId=Number(courses[0].id);
return cachedPopupCourseId;
}

async function adminLogin(payload){
let encoded=btoa(`${payload.username}:${payload.password}`);
let authHeader=`Basic ${encoded}`;
let r=await fetch(API+"/courses",{
headers:{
"Content-Type":"application/json",
"Authorization":authHeader}
});
if(r.status===401){
throw {message:"Invalid admin credentials"};
}
if(!r.ok){
throw {message:"Unable to verify admin login right now."};
}
return {authHeader:authHeader,username:payload.username};
}

async function createCourse(payload){
let r=await apiPost("/courses",payload);
let body=await r.json().catch(()=>({message:"Unexpected response from server"}));
if(!r.ok) throw body;
return body;
}

async function updateCourse(id,payload){
let r=await apiPut("/courses/"+id,payload);
let body=await r.json().catch(()=>({message:"Unexpected response from server"}));
if(!r.ok) throw body;
return body;
}

async function createBlog(payload){
let r=await apiPost("/blogs",payload);
let body=await r.json().catch(()=>({message:"Unexpected response from server"}));
if(!r.ok) throw body;
return body;
}

async function updateBlog(id,payload){
let r=await apiPut("/blogs/"+id,payload);
let body=await r.json().catch(()=>({message:"Unexpected response from server"}));
if(!r.ok) throw body;
return body;
}

async function deleteBlog(id){
let r=await apiDelete("/blogs/"+id);
if(!r.ok){
let body=await r.json().catch(()=>({message:"Unexpected response from server"}));
throw body;
}
return true;
}

function isAdminLoggedIn(){
return !!getAdminAuthHeader();
}

function logoutAdmin(){
localStorage.removeItem("adminBasicAuth");
localStorage.removeItem("adminUsername");
}
