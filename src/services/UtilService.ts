import jwt from "jsonwebtoken";
import * as crypto from "crypto-js";
import { SECRET_KEY } from "../constants";

export class UtilServices {
  static encryptPassword = (password: string) => {
    return crypto.AES.encrypt(password, SECRET_KEY).toString();
  };

  static descryptPassword = (password: string, hashedPassword: string) => {
    const bytes = crypto.AES.decrypt(hashedPassword, SECRET_KEY);
    const originalPassword = bytes.toString(crypto.enc.Utf8);
    return originalPassword === password;
  };

  static createToken = (payload: any) => {
    return jwt.sign(payload, SECRET_KEY);
  };

  static verifyToken = (token: string) => {
    return jwt.verify(token, SECRET_KEY);
  };
}
