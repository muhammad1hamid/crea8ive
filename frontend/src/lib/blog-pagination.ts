export const BLOG_POSTS_PER_PAGE = 24;

export function getBlogPageCount(totalPosts: number) {
  return Math.max(1, Math.ceil(totalPosts / BLOG_POSTS_PER_PAGE));
}

export function getBlogPageSlice<T>(posts: T[], page: number) {
  const start = (page - 1) * BLOG_POSTS_PER_PAGE;
  return posts.slice(start, start + BLOG_POSTS_PER_PAGE);
}
