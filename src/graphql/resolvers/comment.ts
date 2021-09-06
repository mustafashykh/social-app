import CommentService from "../../services/comment";
import { IComment, ICommentQuery, IUser } from "@shared/interfaces";
import { Execption } from "../../shared/models";
import UserService from "../../services/user";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

export default class CommentResolver {
  private _commentService: CommentService;
  private _userService: UserService;

  constructor() {
    this._commentService = new CommentService();
    this._userService = new UserService();
  }

  register() {
    return { ...this.query(), ...this.mutation() }
  }

  query() {
    return {
      Query: {
        getComments: async (parent: any, args: ICommentQuery) => {
          try {
            if (!ObjectId.isValid(`${args.postId}`)) {
              throw Execption.getError(new Execption(null, "Invalid Post Id", 400));
            }

            const comments: IComment[]  = await this._commentService.getAllComments(args);
            return comments;
          } catch (error: any) {
            throw Execption.getError(error);
          }
        } 
      },
      Comment: {
        user: async (parent: any) => {
          if (parent?.user?.firstName) {
            return parent.user;
          } else {
            const user: IUser = await this._userService.getUserById(parent.user);
            return user;
          }
        }
      }
    } 
  }

  mutation() {
    return {
      Mutation: {
        postCommnet: async (parent: any, args: IComment, context: any) => {
          try {
            if (!context.user) {
              throw new Execption({}, "UnAutherized", 401);
            }
            
            const comment: IComment = await this._commentService.createComment({
              ...args,
              user: context.user._id,
            });
            if (!comment) throw new Execption(null, "Interal Server Error", 500);

            return comment;
          } catch (error) {
            throw Execption.getError(error);
          }
        }
      }
    }
  }
}