function go(path){history.pushState({},'',path);route();}
window.onpopstate=route;
function route(){
let p=location.pathname;
if(p==="/") home();
else if(p==="/login") login();
else if(p==="/courses") courses();
else if(p.startsWith("/course")) courseDetails();
else if(p.startsWith("/learn")) learning();
else if(p==="/enquiry") enquiry();
}
