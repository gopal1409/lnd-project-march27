async function loginAction(){
let email=document.getElementById("email").value;
let pass=document.getElementById("pass").value;
let feedback=document.getElementById("loginFeedback");
let submit=document.getElementById("loginSubmit");

if(feedback){
feedback.textContent="";
feedback.className="form-feedback";
}
if(submit){
submit.disabled=true;
submit.textContent="Signing in...";
}

try{
let response=await adminLogin({username:email,password:pass});
localStorage.setItem("adminBasicAuth",response.authHeader);
localStorage.setItem("adminUsername",response.username);
await renderNavbar();
go("/admin/courses");
}catch(err){
if(feedback){
feedback.textContent=err&&err.message?err.message:"Unable to login right now.";
feedback.className="form-feedback error";
}
}finally{
if(submit){
submit.disabled=false;
submit.textContent="Login";
}
}
}
