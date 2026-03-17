async function courseDetails(){
let id=new URLSearchParams(location.search).get("id");
let r=await api("/courses/"+id);
let c=await r.json();
document.getElementById("app").innerHTML=`
<div style="padding:60px">
<h1>${c.title}</h1>
<p>${c.description}</p>
<h3>₹${c.price}</h3>
<button onclick="go('/enquiry')">Enquire</button>
</div>`;
}