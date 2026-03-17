async function loginAction(){
let email=document.getElementById("email").value;
let pass=document.getElementById("pass").value;
let r=await fetch(API+"/auth/login",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({email:email,password:pass})
});
let d=await r.json();
localStorage.setItem("token",d.token);
go("/");
}