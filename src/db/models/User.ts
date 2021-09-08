import { IUser } from "@interfaces";
import mongoose, { Model, Schema } from "mongoose";

/**
 * @description {User} Schema [MongoDB]
 */
const userSchema: Schema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxlength: 15,
      minlength: 3
    },
    lastName: {
      type: String,
      required: true,
      maxlength: 15,
      minlength: 3
    },
    email: {
      type: String,
      required: true,
      maxlength: 50,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

// Indexing for searching support
userSchema.index({ 
  firstName: 'text',
  lastName: 'text'
});

const User: Model<IUser> = mongoose.model("User", userSchema);
export default User;
