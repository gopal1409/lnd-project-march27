function courseCard(c){
let price=typeof c.price==="number"&&c.price>0?`<div class="price">Rs ${c.price.toLocaleString("en-IN")}</div>`:"<div class=\"price\">Contact for pricing</div>";
let logo=(c.title||"Course").split(/\s+/).slice(0,2).map(word=>word[0]).join("").toUpperCase();
return `<div class="card">
<div class="course-card-top">
<div class="course-logo">${logo}</div>
<span class="course-card-chip">Live Course</span>
</div>
<h3>${c.title}</h3>
<p>${c.description}</p>
${price}
<div class="course-card-actions">
<button class="course-card-btn" onclick="go('/course?id=${c.id}')">Know More</button>
<button class="enquiry course-enquiry-btn" onclick="go('/enquiry?courseId=${c.id}')">Enquire Now</button>
</div>
</div>`;
}
