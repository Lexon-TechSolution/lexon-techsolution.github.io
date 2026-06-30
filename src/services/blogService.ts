export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  date: string;
  coverImage?: string;
  excerpt?: string;
}

export const blogService = {
  async getAllPosts(): Promise<BlogPost[]> {
    try {
      const response = await fetch('/api/blog_posts');
      if (!response.ok) {
        throw new Error(`Failed to fetch blog posts: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching blog posts from API:', error);
      return [];
    }
  },

  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const response = await fetch(`/api/blog_posts/${slug}`);
      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error(`Failed to fetch blog post by slug: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching blog post with slug ${slug} from API:`, error);
      return null;
    }
  },

  // Seed is handled by the backend server automatically on fetch
  async seedInitialPosts() {
    // No-op on frontend as backend handles it securely and transparently
  }
};
