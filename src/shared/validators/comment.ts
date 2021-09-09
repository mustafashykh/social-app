import { IComment } from "@interfaces";
import { MONGOID_REGEX } from "../constants";
import Joi from "joi";


export default class CommentValidator {
  constructor() {}

  /**
   * Add Comment Validator
   * @param values 
   * @returns 
   */
  addCommnet = (values: IComment) => {
    const schema = Joi.object({
      post: Joi.string().regex(MONGOID_REGEX).required(),
      user: Joi.string().regex(MONGOID_REGEX).required(),
      body: Joi.string().min(1).max(100).required()
    })
    return schema.validate(values)
  }

}

