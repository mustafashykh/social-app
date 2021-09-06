import { JwtPayload } from 'jsonwebtoken';

export default class DecodedToken implements JwtPayload {
  _id: String;
  email: String;

  constructor(_id: String, email: String){ 
    this.email = email;
    this._id = _id;
  }
}