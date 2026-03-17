const API="http://localhost:8080/api";
async function api(url){
let token=localStorage.getItem("token");
return fetch(API+url,{headers:{
"Content-Type":"application/json",
"Authorization":"Bearer "+token}});
}
async function apiPost(url,data){
let token=localStorage.getItem("token");
return fetch(API+url,{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization":"Bearer "+token},
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
