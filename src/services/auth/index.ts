import { ILogin, IUser, IAuthResponse } from "@interfaces";
import { DecodedToken, Execption } from "../../shared/models";
import { compareSync } from "bcrypt";
import UserService from "@services/user";
import { sign } from 'jsonwebtoken';
import { hashSync } from 'bcrypt';

export default class AuthService {
  constructor(private _userService: UserService) {}

  /**
   * @description Login Function
   * @param { ILogin } $credentails 
   */
  async login($credentails: ILogin) {
    try {
      const user: IUser = await this._userService.getUserByEmail($credentails.email);
      if (!user) throw new Execption({}, "Invalid Email or Password", 400);

      if (compareSync($credentails.password as string, user.password as string)) {
        const token:String = sign(
          { 
            email: user.email, 
            _id: user._id 
          } as DecodedToken, 
          `${process.env.SECRET}`
        );

        return { user, token } as IAuthResponse;
      } else {
        throw new Execption({}, "Invalid Email or Password", 400);
      }
    } catch (error) {
      throw new Execption(error, "Internal Server Error", 500);
    }
  }

  /**
   * @description To Sigin up a user
   * @param { IUser } $user 
   */
  async signup($user: IUser) {
    try {
      let user: IUser = await this._userService.getUserByEmail($user.email);
      if (user) throw new Execption({}, "Email Already Exsists", 409);

      const hashedPassword = hashSync($user.password as string, 10);
      user = await this._userService.createUser({...$user, password: hashedPassword});

      const token:String = sign(
        { 
          email: user.email, 
          _id: user._id 
        } as DecodedToken, 
        `${process.env.SECRET}`
      );

      return { user, token } as IAuthResponse;
    } catch (error) {
      throw new Execption(error, "Internal Server Error", 500);
    }
  }
}