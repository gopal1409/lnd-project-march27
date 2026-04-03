function renderBlogContent(content){
return (content||"")
    .split(/\n\s*\n/)
    .map(block=>`<p>${block.trim()}</p>`)
    .join("");
}

async function blogDetails(){
let id=new URLSearchParams(location.search).get("id");
let app=document.getElementById("app");
if(!id){
app.innerHTML=`<section class="learning-page"><div class="learning-article-main"><h2>Blog not found</h2><p>Please choose an article from the blog page.</p><div class="learning-actions"><button class="enquiry" onclick="go('/blogs')">Back to Blogs</button></div></div></section>`;
return;
}

try{
let blog=null;
if(String(id).startsWith("static-")&&Array.isArray(window.generatedBlogs)){
blog=window.generatedBlogs.find(item=>item.id===id)||null;
if(blog&&!blog.createdAt) blog={...blog,createdAt:new Date().toISOString()};
}
if(!blog){
blog=await getBlog(id);
}
app.innerHTML=`
<section class="blog-detail-page">
<article class="blog-article">
<div class="blog-article-cover"${blog.coverImageUrl?` style="background-image:linear-gradient(180deg,rgba(16,32,72,.1),rgba(16,32,72,.6)),url('${blog.coverImageUrl}')"`:""}>
<span class="blog-chip">${blog.category}</span>
<h1>${blog.title}</h1>
<p>${blog.summary}</p>
<div class="blog-meta">${blog.authorName} · ${formatBlogDate(blog.createdAt)} · ${blogReadingTime(blog.content)}</div>
</div>
<div class="blog-article-body">
${renderBlogContent(blog.content)}
</div>
</article>
<aside class="blog-detail-aside">
<div class="blog-aside-card">
<span class="section-eyebrow">About This Article</span>
<h3>Editorial layout with a readable publishing rhythm</h3>
<p>This page gives each topic a wider hero, clearer metadata, and long-form spacing so readers can go from tile view into a fuller article without losing context.</p>
</div>
<div class="blog-aside-card">
<span class="section-eyebrow">Next Step</span>
<h3>Browse more topic blocks</h3>
<p>Return to the blogs page to explore more DevOps, cloud, architecture, and automation articles.</p>
<button class="enquiry" type="button" onclick="go('/blogs')">Browse More Blogs</button>
</div>
</aside>
</section>`;
}catch(e){
app.innerHTML=`<section class="learning-page"><div class="learning-article-main"><h2>Unable to load this blog</h2><p>Please try again in a moment or return to the blog page.</p><div class="learning-actions"><button class="enquiry" onclick="go('/blogs')">Back to Blogs</button></div></div></section>`;
}
}
