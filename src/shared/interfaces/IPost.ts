import IUser from "./IUser";

export default interface  IPost {
  _id?: String,
  title: String,
  subtitle?: String,
  body: String,
  banner?: String,
  user: IUser | String,
  published?: Boolean,
  publishedAt?: Date,
  createdAt?: Date,
  updatedAt?: Date
}