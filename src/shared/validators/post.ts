import { IPost } from "@interfaces";
import { MONGOID_REGEX } from "../constants";
import Joi from "joi";


export default class PostValidator {
  constructor() {}

  /**
   * Add Post Validator
   * @param values 
   * @returns 
   */
  addPost = (values: IPost) => {
    const schema = Joi.object({
      title: Joi.string().min(3).max(15).required(),
      subtitle: Joi.string().min(3).max(100).optional(),
      body: Joi.string().min(15).max(500).required(),
      banner: Joi.string().uri().optional(),
      user: Joi.string().regex(MONGOID_REGEX).required()
    })
    return schema.validate(values)
  }

}

