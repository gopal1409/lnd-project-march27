function go(path){history.pushState({},'',path);route();}
window.onpopstate=route;
function route(){
let p=location.pathname;
if(p==="/") home();
else if(p==="/login") login();
else if(p==="/courses") courses();
else if(p==="/blogs") blogs();
else if(p.startsWith("/blog")) blogDetails();
else if(p.startsWith("/course")) courseDetails();
else if(p.startsWith("/learn")) learning();
else if(p==="/enquiry") enquiry();
else if(p==="/admin/courses") adminCourses();
else if(p==="/admin/blogs") adminBlogs();
if(typeof scheduleQueryPopup==="function") scheduleQueryPopup();
}
