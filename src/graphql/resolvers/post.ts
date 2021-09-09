import PostService from "../../services/post";
import { IComment, ICommentQuery, IPost, IPostQuery, IUser } from "@interfaces";
import { Execption } from "../../shared/models";
import UserService from "../../services/user";
import mongoose from "mongoose";
import CommentService from "../../services/comment";
import { PostValidator } from "../../shared/validators";

const ObjectId = mongoose.Types.ObjectId;

export default class PostResolver {
  private _postService: PostService;
  private _userService: UserService;
  private _commentService: CommentService;
  private _postValidator: PostValidator;

  constructor() {
    this._postService = new PostService();
    this._userService = new UserService();
    this._commentService = new CommentService();
    this._postValidator = new PostValidator();
  }

  register() {
    return { ...this.query(), ...this.mutation() };
  }

  query() {
    return {
      Query: {
        post: async (parent: any, args: IPostQuery) => {
          try {
            if (!ObjectId.isValid(`${args.id}`)) {
              throw Execption.getError(new Execption(null, "Invalid Document Id", 400));
            }

            const post: IPost = await this._postService.getPostById(`${args.id}`);
            return post;
          } catch (error: any) {
            throw Execption.getError(error);
          }
        },
        
        posts: async (parent: any, args: IPostQuery) => {
          try {
            const posts: IPost[] = await this._postService.getAllPosts(args);

            return posts;
          } catch (error: any) {
            throw Execption.getError(error);
          }
        },
      },

      Post: {
        user: async (parent: any) => {
          try {
            if (parent?.user?.firstName) {
              return parent.user;
            } else {
              const user: IUser = await this._userService.getUserById(parent.user);
              return user;
            }
          } catch (error: any) {
            throw Execption.getError(error);
          }
        },
        comments: async (parent: IPost) => {
          try {
            const comments: IComment[]  = await this._commentService.getAllComments({ postId: `${parent._id}` } as ICommentQuery);
            return comments;
          } catch (error: any) {
            throw Execption.getError(error);
          }
        }
      }
    };
  }

  mutation() {
    return {
      Mutation: {
        createPost: async (parent: any, args: IPost, context: any) => {
          try {
            if (!context.user) {
              throw new Execption({}, "UnAutherized", 401);
            }

            const { error } = this._postValidator.addPost({...args, user: `${context.user._id}`});
            if (error) throw new Execption({}, error.details[0].message, 400);

            const post: IPost = await this._postService.createPost({
              ...args,
              user: `${context.user._id}`,
            });
            if (!post) throw new Execption({}, "Something went Wrong", 500);

            return post;
          } catch (error: any) {
            throw Execption.getError(error);
          }
        },
      }
    };
  }
}
