import { IPost } from "@interfaces";
import mongoose, { Model, Schema } from "mongoose";

/**
 * @description {Post} Schema [MongoDB]
 */
const postSchema: Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 15,
      minlength: 3
    },
    subtitle: {
      type: String,
      maxlength: 100,
      minlength: 3
    },
    body: {
      type: String,
      maxlength: 500,
      minlength: 15
    },
    banner: {
      type: String,
      default: null
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true
    },
    published: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

// Indexing for searching support
postSchema.index({
  title: 'text',
  subtitle: 'text'
})

const Post: Model<IPost> = mongoose.model("Post", postSchema);
export default Post;
