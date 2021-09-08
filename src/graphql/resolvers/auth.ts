import AuthService from "../../services/auth";
import UserService from "../../services/user";
import { IAuthResponse, ILogin, IUser } from "@interfaces";
import { Execption } from "../../shared/models";
import { AuthValidator } from '../../shared/validators'

export default class AuthResolver {
  private _authService: AuthService;
  private _authValidator: AuthValidator;


  constructor() {
    this._authService = new AuthService(new UserService());
    this._authValidator = new AuthValidator();
  }

  register() {
    return { ...this.mutation(), ...this.query() }
  }

  query() {
    return {
      Query: {
        login: async (parent: any, args: ILogin, context: any) => {
          try {
            const { error } = this._authValidator.login(args);
            if (error) throw new Execption({}, error.details[0].message, 400);

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
            const { error } = this._authValidator.signup(args);
            if (error) throw new Execption({}, error.details[0].message, 400);

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


