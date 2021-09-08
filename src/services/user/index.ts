import { IUser } from "@interfaces";
import { User } from '../../db/models';
import { Model } from "mongoose";
import { Execption } from "../../shared/models";

export default class UserService {
  private _user: Model<IUser> = User;

  constructor() {}

  async createUser($user: IUser): Promise<IUser>  {
    try {
      const user: IUser = await this._user.create<IUser>($user); 
      return user;
    } catch (error) {
      throw new Execption(error, "Could not create User");
    }
  }

  async updateUser($user: IUser): Promise<IUser> {
    try {
      const user: IUser = this._user.findByIdAndUpdate($user._id, { ...$user, _id: undefined }, { new: true }).lean(); 
      return user;
    } catch (error) {
      throw new Execption(error, "Could not update User", 500);
    }
  }

  async getUserById($id: String): Promise<IUser> {
    try {
      const user: IUser | any = this._user.findById($id).lean<IUser | null>(); 
      if (!user) throw new Execption({}, "User not found", 404);

      return user;
    } catch (error) {
      throw new Execption(error, "Could not update User", 500);
    }
  }

  async getUserByEmail($email: String): Promise<IUser> {
    try {
      const user: IUser | any = this._user.findOne({ email: $email }).lean<IUser | null>();
      if (!user) throw new Execption({}, "User not found", 404);

      return user;
    } catch(error) {
      throw new Execption(error, "Could not get User", 500);
    }
  }
}