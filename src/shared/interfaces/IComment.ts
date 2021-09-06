import IPost from './IPost';
import IUser from './IUser';

export default interface IComment {
  _id?: String,
  post: IPost | String,
  user: IUser | String,
  body: String,
  createdAt?: Date,
  updateAt?: Date 
}