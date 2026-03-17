function courseCard(c){
return `<div class="card">
<h3>${c.title}</h3>
<p>${c.description}</p>
<div class="price">₹${c.price}</div>
<button onclick="go('/course?id=${c.id}')">View</button>
</div>`;
}