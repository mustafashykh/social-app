import { IComment, ILogin, IUser } from "@interfaces";
import Joi from "joi";


export default class AuthValidator {
  constructor() {}

  /**
   * Add Comment Validator
   * @param values 
   * @returns 
   */
  login = (values: ILogin) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(30).required()
    })
    return schema.validate(values)
  }

  signup = (values: IUser) => {
    const schema = Joi.object({
      firstName: Joi.string().min(5).max(15).required(),
      lastName: Joi.string().min(5).max(15).required(),
      password: Joi.string().min(8).max(30).required(),
      email: Joi.string().email().required()
    })

    return schema.validate(values);
  }

}

