import BlogsModel from "../models/BlogsModel";

export class BlogsService {
  static async create(payload) {
    try {
      await BlogsModel.create(payload);
    } catch (error) {
      throw error;
    }
  }

  static async findOne(payload) {
    try {
      await BlogsModel.findOne(payload);
    } catch (error) {
      throw error;
    }
  }

  static async delete(payload) {
    try {
      await BlogsModel.findOne(payload);
    } catch (error) {
      throw error;
    }
  }

  static async update(payload) {
    try {
      await BlogsModel.findOne(payload);
    } catch (error) {
      throw error;
    }
  }

  static async findAll(payload) {
    try {
      await BlogsModel.find(payload);
    } catch (error) {
      throw error;
    }
  }
}
