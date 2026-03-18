function courseCard(c){
return `<div class="card">
<h3>${c.title}</h3>
<p>${c.description}</p>
<button class="course-card-btn" onclick="go('/course?id=${c.id}')">Know More</button>
</div>`;
}
