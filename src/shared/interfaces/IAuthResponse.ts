import { IUser } from ".";

export default interface IAuthResponse {
  user: IUser,
  token: String,
  message?: String,
  code?: Number
}