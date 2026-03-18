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

async function getCourses(){
let r=await api("/courses");
return r.json();
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

function isAdminLoggedIn(){
return !!getAdminAuthHeader();
}

function logoutAdmin(){
localStorage.removeItem("adminBasicAuth");
localStorage.removeItem("adminUsername");
}
