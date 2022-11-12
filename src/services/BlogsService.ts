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
      return BlogsModel.findOne(payload);
    } catch (error) {
      throw error;
    }
  }

  static async delete(payload) {
    try {
      await BlogsModel.deleteOne(payload);
    } catch (error) {
      throw error;
    }
  }

  static async update(findOptions, payload) {
    try {
      await BlogsModel.updateOne(findOptions, payload);
    } catch (error) {
      throw error;
    }
  }

  static async findAll(filter, limit, skip) {
    try {
      return {
        rows: await BlogsModel.find(filter).skip(skip).limit(limit),
        total: await BlogsModel.countDocuments(filter),
      };
    } catch (error) {
      throw error;
    }
  }
}
