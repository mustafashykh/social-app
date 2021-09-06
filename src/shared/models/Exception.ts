import { ApolloError } from "apollo-server-errors";

export default class Execption {
  message: String;
  error: any;
  code: Number = 0;
  
  constructor(error: any, message: String, code?: Number) {
    this.error = error;
    this.message = message;
    
    // Get code if provided
    code ? this.code = code: undefined;
  }

  static getError(error: any): any {
    if (!error?.error?.code) {
      let body = { 
        code: error?.code ? error.code: 500, 
        message: error?.message ? error.message: "Internal Server Error" 
      }
      return new ApolloError(body.message as string, `${body.code}`);
    } else {
      return this.getError(error.error)
    }
  }
}