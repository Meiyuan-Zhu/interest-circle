import { Provide } from '@midwayjs/decorator';
import { Post, PostModel } from '../model/post.model';

@Provide()
export class PostService {

  async createPost(data: any): Promise<Post> {
    const post = new PostModel(data);
    return post.save();
  }

  async getPosts(circleId: string): Promise<Post[]> {
    return PostModel.find({ circleId });
  }

  async addComment(postId: string, comment: { username: string; content: string }) {
    try {
      const post = await PostModel.findById(postId);
      if (post) {
        console.log(`Post found: ${postId}`);
        post.comments.push({ ...comment, createdAt: new Date() });
        await post.save();
        console.log(`Comment successfully added: ${comment}`);
        return post;
      }
      console.log(`Post not found: ${postId}`);
      throw new Error('Post not found');
    } catch (error) {
      console.error(`Error adding comment: ${error}`);
      throw error;
    }
  }

  async getComments(postId: string) {
    try {
      console.log(`Fetching comments for post with ID: ${postId}`);
      const post = await PostModel.findById(postId).select('comments');
      if (post) {
        console.log(`Comments retrieved successfully for post: ${postId}`);
        return post.comments;
      }
      console.log(`Post not found: ${postId}`);
      throw new Error('Post not found');
    } catch (error) {
      console.error(`Error fetching comments for post ${postId}: ${error.message}`);
      throw error;
    }
  }

  async getUserActivityStats(circleId: string) {
    try {
      const posts = await PostModel.find({ circleId }).lean();
      const userStats: Record<string, { posts: number, comments: number }> = {};

      posts.forEach(post => {
        if (!userStats[post.username]) {
          userStats[post.username] = { posts: 0, comments: 0 };
        }
        userStats[post.username].posts += 1;

        if (post.comments && Array.isArray(post.comments)) {
          post.comments.forEach(comment => {
            if (!userStats[comment.username]) {
              userStats[comment.username] = { posts: 0, comments: 0 };
            }
            userStats[comment.username].comments += 1;
          });
        }
      });

      return userStats;
    } catch (error) {
      console.error(`Error fetching user activity stats: ${error}`);
      throw error;
    }
  }
}

export default PostService;
