import { IPost } from "@interfaces";
import Joi from "joi";
const objectId = require("joi-objectid")(Joi);


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
      user: objectId.required(),
    })
    return schema.validate(values)
  }

}

