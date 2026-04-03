package com.learnsphere.leadservice.blog;

import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Comparator;
import java.util.List;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
public class BlogService {

    private final BlogRepository blogRepository;

    public BlogService(BlogRepository blogRepository) {
        this.blogRepository = blogRepository;
    }

    public List<Blog> getAllBlogs() {
        List<Blog> blogs = blogRepository.findAll();
        blogs.sort(Comparator.comparing(Blog::getCreatedAt).reversed());
        return blogs;
    }

    public Blog getBlogById(Long id) {
        return blogRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Blog not found"));
    }

    public Blog createBlog(BlogCreateRequest request) {
        Blog blog = new Blog(
                request.title().trim(),
                request.summary().trim(),
                request.content().trim(),
                request.category().trim(),
                request.authorName().trim(),
                request.coverImageUrl() == null ? "" : request.coverImageUrl().trim()
        );
        return blogRepository.save(blog);
    }

    public Blog updateBlog(Long id, BlogCreateRequest request) {
        Blog blog = getBlogById(id);
        blog.setTitle(request.title().trim());
        blog.setSummary(request.summary().trim());
        blog.setContent(request.content().trim());
        blog.setCategory(request.category().trim());
        blog.setAuthorName(request.authorName().trim());
        blog.setCoverImageUrl(request.coverImageUrl() == null ? "" : request.coverImageUrl().trim());
        return blogRepository.save(blog);
    }

    public void deleteBlog(Long id) {
        Blog blog = getBlogById(id);
        blogRepository.delete(blog);
    }

    public void seedBlogsIfEmpty() {
        if (blogRepository.count() > 0) {
            return;
        }

        blogRepository.saveAll(List.of(
                new Blog(
                        "How platform teams build faster internal developer experiences",
                        "A practical look at the service patterns, operating model, and content strategy that make platform engineering programs feel coherent instead of fragmented.",
                        """
                        Modern platform teams do more than centralize tooling. They create repeatable experiences that help delivery teams move from idea to release without rebuilding the same workflows over and over.

                        The strongest programs usually begin with a small set of shared golden paths. These can include repository templates, CI pipelines, container standards, environment promotion rules, and observability defaults. When these paths are easy to adopt, teams spend less time negotiating fundamentals and more time shipping.

                        Documentation also matters. A strong internal platform is only as useful as the clarity around how to consume it. That means writing guides, examples, and onboarding sequences that reduce hesitation for new teams.

                        Another pattern that works well is treating the platform like a product. Platform teams should listen to users, track friction, and prioritize experience improvements instead of focusing only on infrastructure output. This is where metrics such as lead time, deployment consistency, and adoption rates become valuable.

                        Teams that approach platform enablement with empathy and product thinking often create the kind of polished operational experience people usually associate with mature SaaS products.
                        """,
                        "Platform Engineering",
                        "LearnSphere Editorial",
                        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
                ),
                new Blog(
                        "Why GitOps content works best when it feels guided, not overwhelming",
                        "Learners respond better to GitOps material when the narrative is progressive, visual, and grounded in real delivery scenarios rather than long lists of tools.",
                        """
                        GitOps can feel intimidating when content jumps too quickly into controllers, reconciliation loops, and production deployment rules. A better way to teach it is to build a clear story.

                        Start by showing the business reason for GitOps. Teams want safer changes, clearer promotion paths, and better auditability. Once that motivation is visible, the workflow starts to make sense.

                        From there, good learning content introduces repositories, manifests, and automation in a sequence that mirrors how engineers actually work. Screens, architecture sketches, and short implementation milestones help readers maintain momentum.

                        A polished blog experience also helps. Wide cover imagery, compact summaries, readable typography, and card-based discovery can make technical content feel inviting instead of dense. That style is one reason many readers are comfortable browsing content-heavy platforms like Wix.

                        When the content structure and the visual experience reinforce each other, even operational topics become approachable for a broader audience.
                        """,
                        "GitOps",
                        "LearnSphere Editorial",
                        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80"
                )
        ));
    }
}
