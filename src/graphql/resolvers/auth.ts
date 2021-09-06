import AuthService from "../../services/auth";
import UserService from "../../services/user";
import { IAuthResponse, ILogin, IUser } from "@shared/interfaces";
import { Execption } from "../../shared/models";

export default class AuthResolver {
  private _authService: AuthService;


  constructor() {
    this._authService = new AuthService(new UserService());
  }

  register() {
    return { ...this.mutation(), ...this.query() }
  }

  query() {
    return {
      Query: {
        login: async (parent: any, args: ILogin, context: any) => {
          try {
            const res: IAuthResponse = await this._authService.login(args);
            if (!res) throw new Execption({}, "Invalid Email or Password", 400);
            return res;
          } catch (error: any) { 
            throw Execption.getError(error);
          } 
        }
      }
    }
  }

  mutation() {
    return {
      Mutation: {
        signup: async (parent: any, args: IUser, context: any) => {
          try {
            const res: IAuthResponse = await this._authService.signup(args);
            if (!res) throw new Execption({}, "Something went Wrong", 500);
          
            return res;
          } catch (error: any) {
            throw Execption.getError(error)
          }
        }
      }
    }
  }
}


