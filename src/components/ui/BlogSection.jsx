import { useEffect, useState } from 'react';

const DEV_TO_API = 'https://dev.to/api/articles?username=sagarmaurya&per_page=10';
const DEV_TO_PROFILE = 'https://dev.to/sagarmaurya';

const formatDate = (iso) => {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const ArrowSvg = () => (
  <svg
    className="project-link-arrow"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 8h10" />
    <path d="M9 4l4 4-4 4" />
  </svg>
);

export default function BlogSection() {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'error'

  useEffect(() => {
    let cancelled = false;

    fetch(DEV_TO_API)
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        setPosts(Array.isArray(data) ? data.slice(0, 3) : []);
        setStatus('success');
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="blog" className="section reveal" style={{ animationDelay: '0.30s' }}>
      <header className="section-header">
        <h2>Blog</h2>
        <p>Writing through what I&apos;m building, breaking, and figuring out.</p>
      </header>

      {status === 'loading' && (
        <div className="projects-grid blog-loading-grid">
          {[0, 1, 2].map((i) => (
            <article key={i} className="project-card blog-skeleton" aria-hidden="true">
              <div className="blog-skeleton-date" />
              <div className="blog-skeleton-title" />
              <div className="blog-skeleton-line" />
              <div className="blog-skeleton-line blog-skeleton-line--short" />
              <div className="blog-skeleton-tags">
                <div className="blog-skeleton-tag" />
                <div className="blog-skeleton-tag" />
              </div>
            </article>
          ))}
        </div>
      )}

      {status === 'error' && (
        <p className="blog-error">
          Unable to load posts —{' '}
          <a href={DEV_TO_PROFILE} className="project-link" target="_blank" rel="noreferrer">
            view them on Dev.to
            <ArrowSvg />
          </a>
        </p>
      )}

      {status === 'success' && (
        <div className="projects-grid">
          {posts.map((post, index) => {
            const tags = Array.isArray(post.tag_list) ? post.tag_list.slice(0, 3) : [];
            const date = formatDate(post.published_at);

            return (
              <div
                key={post.id}
                className="reveal"
                style={{ animationDelay: `${0.36 + index * 0.08}s` }}
              >
                <a
                  className="project-card"
                  href={post.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Read post: ${post.title}`}
                >
                  {/* Title + date group */}
                  <div className="blog-title-group">
                    <h3 className="project-title">{post.title}</h3>
                    {date && <p className="blog-post-date">{date}</p>}
                  </div>

                  {/* Description */}
                  <p className="project-description">{post.description}</p>

                  {/* Tags */}
                  {tags.length > 0 && (
                    <div className="project-tech" aria-label="Post tags">
                      {tags.map((tag) => (
                        <span key={tag} className="skill-badge">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Read link — visual only; the whole card is the link */}
                  <span className="project-link" aria-hidden="true">
                    Read post
                    <ArrowSvg />
                  </span>
                </a>
              </div>
            );

          })}
        </div>
      )}
    </section>
  );
}
