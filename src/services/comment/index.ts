import { IComment, ICommentQuery } from "@interfaces";
import { Comment } from '../../db/models';
import { Model } from "mongoose";
import { Execption } from "../../shared/models";

export default class CommentService {
  private _comment: Model<IComment> = Comment;

  constructor() {}

  /**
   * To get comments of a Sepcific post
   * @param $query 
   * @returns 
   */
  async getAllComments($query: ICommentQuery): Promise<IComment[]> {
    try {
      const posts: IComment[] = await this._comment.find({ post: $query.postId })
        .limit($query.limit ? $query.limit: 10)
        .skip($query.skip ? $query.skip: 0)
        .populate({
          path: "user",
          select: "firstName lastName email"
        }).lean();

      return posts;
    } catch (error) {
      throw new Execption(error, "Could not fetch Commnents", 500);
    }
  }

  /**
   * To create / post a comment
   * @param $post 
   * @returns 
   */
  async createComment($comment: IComment): Promise<IComment>  {
    try { 
      const comment: IComment = await this._comment.create<IComment>($comment);
      console.log(comment) 
      return comment;
    } catch (error) {
      throw new Execption(error, "Could not create Commment", 500);
    }
  }
}