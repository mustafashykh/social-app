import { IPost, IPostQuery } from "@shared/interfaces";
import { Post } from '../../db/models';
import { Model } from "mongoose";
import { Execption } from "../../shared/models";

export default class PostService {
  private _post: Model<IPost> = Post;

  constructor() {}

  async getAllPosts($query: IPostQuery): Promise<IPost[]> {
    try {
      const posts: IPost[] = await this._post.find()
        .limit($query.limit ? $query.limit: 10)
        .skip($query.skip ? $query.skip: 0)
        .populate({
          path: "user",
          select: "firstName lastName email"
        }).lean();

      return posts;
    } catch (error) {
      throw new Execption(error, "Could not fetch Post", 500);
    }
  }

  async createPost($post: IPost): Promise<IPost>  {
    try {
      const post: IPost = await this._post.create<IPost>($post); 
      return post;
    } catch (error) {
      throw new Execption(error, "Could not create Post", 500);
    }
  }

  async updatePost($post: IPost): Promise<IPost> {
    try {
      const post: IPost = this._post.findByIdAndUpdate($post._id, { ...$post, _id: undefined }, { new: true }).lean(); 
      return post;
    } catch (error) {
      throw new Execption(error, "Could not update Post", 500);
    }
  }

  async getPostById($id: String): Promise<IPost> {
    try {
      const post: IPost | any = this._post.findById($id).lean<IPost | null>(); 
      if (!post) throw new Execption({}, "User not found", 404);

      return post;
    } catch (error) {
      throw new Execption(error, "Could not update Post", 500);
    }
  }
}