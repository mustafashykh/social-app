import { IComment } from "@interfaces";
import Joi from "joi";
const objectId = require("joi-objectid")(Joi);



export default class CommentValidator {
  constructor() {}

  /**
   * Add Comment Validator
   * @param values 
   * @returns 
   */
  addCommnet = (values: IComment) => {
    const schema = Joi.object({
      post: objectId.required(),
      user: objectId.required(),
      body: Joi.string().min(1).max(100).required()
    })
    return schema.validate(values)
  }

}

