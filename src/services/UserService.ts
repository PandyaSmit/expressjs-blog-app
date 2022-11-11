import UsersModel from "../models/UsersModel";
("../models/UsersModel");

export class UserService {
  static async create(payload) {
    try {
      await UsersModel.create(payload);
    } catch (error) {
      throw error;
    }
  }

  static async findOne(payload) {
    try {
      return UsersModel.findOne(payload);
    } catch (error) {
      throw error;
    }
  }
}
