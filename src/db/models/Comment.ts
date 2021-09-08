import { IComment } from "@interfaces";
import mongoose, { Model, Schema } from "mongoose";

/**
 * @description {Post} Schema [MongoDB]
 */
const commentSchema: Schema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Types.ObjectId,
      ref: "Post",
      required: true
    },
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User"
    },
    body: {
      type: String,
      maxlength: 100,
      minlength: 1
    }
  },
  { timestamps: true }
);

const Comment: Model<IComment> = mongoose.model("Comment", commentSchema);
export default Comment;
